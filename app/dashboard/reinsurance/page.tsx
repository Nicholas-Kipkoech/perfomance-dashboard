"use client";
import { IBranches } from "@/app/assets/interfaces";
import { useContextApi } from "@/app/context/Context";
import { ReinsuranceContext } from "@/app/context/ReinsuranceContext";
import CustomButton from "@/app/UI/reusableComponents/CustomButton";
import CustomSelect from "@/app/UI/reusableComponents/CustomSelect";
import { LoadingOutlined } from "@ant-design/icons";
import { DatePicker, Spin } from "antd";
import Link from "next/link";
import * as XLSX from "xlsx";

import React, { useContext, useState } from "react";
import {
  RI_PREMIUM_COLUMNS,
  RIOUTSTANDING_COLUMNS,
} from "./ri-outstanding-columns";

const CustomCard = ({
  total1,
  total2,
  total3,
  name1,
  name2,
  name3,
  link,
}: {
  total1: number;
  total2?: number;
  total3?: number;
  name1: string;
  name2?: string;
  name3?: string;
  link: string;
  cumulativeTotal?: number;
  perc?: boolean;
}) => {
  return (
    <Link
      href={link}
      className={`md:h-[130px]  sm:h-[130px] w-[450px] border cursor-pointer  rounded-md p-[20px]`}
    >
      <div className="flex flex-col gap-2 justify-center">
        <div className="flex gap-2 items-center justify-between">
          <p className="text-[14px] flex justify-center ">
            {name1.toUpperCase()}
          </p>
          <p className="text-[13px] font-bold flex justify-start items-start">
            {total1.toLocaleString()}
          </p>
        </div>
        {name2 && (
          <div className="flex gap-2 items-center justify-between">
            <p className="text-[14px] flex justify-center  ">
              {name2?.toUpperCase()}
            </p>
            <p className="text-[13px] font-bold flex justify-start items-start">
              {total2?.toLocaleString()}
            </p>
          </div>
        )}
        {name3 && (
          <div className="flex gap-2 items-center justify-between">
            <p className="text-[14px] flex justify-center ">
              {name3?.toUpperCase()}
            </p>
            <p className="text-[13px] font-bold flex justify-start items-start">
              {total3?.toLocaleString()}
            </p>
          </div>
        )}
      </div>
    </Link>
  );
};

const Reinsurance = () => {
  const {
    fromDate,
    toDate,
    setFromDate,
    setToDate,
    setBranchCode,
    riCession,
    riPaidCession,
    riOutstandingCessionReport,
    riCessionRegister,
    companys,
    loadingRiCession,
    loadingRiOutstandingCessionReport,
    loadingRiPaidCession,
  }: any = useContext(ReinsuranceContext);

  const treatyPremium = riCessionRegister.reduce(
    (acc: any, ri: any) =>
      Number(acc + ri.QS_PREM + ri.CQS_PREM + ri.SURP1_PREM + ri.SURP2_PREM),
    0
  );
  const treatyCommission = riCession.reduce(
    (acc: any, ri: any) => Number(acc + ri.treatyCommission),
    0
  );
  const facPremium = riCession.reduce(
    (acc: any, ri: any) => Number(acc + ri.facPremium),
    0
  );
  const facCommission = riCession.reduce(
    (acc: any, ri: any) => Number(acc + ri.facCommission),
    0
  );
  const treatyAmt = riPaidCession.reduce(
    (acc: any, ri: any) => Number(acc + ri.treatyAmt),
    0
  );
  const facAmt = riPaidCession.reduce(
    (acc: any, ri: any) => Number(acc + ri.facAmt),
    0
  );
  const xolAmt = riPaidCession.reduce(
    (acc: any, ri: any) => Number(acc + ri.xolAmt),
    0
  );

  const totalOutstandingReinsurance = riOutstandingCessionReport.reduce(
    (acc: any, ri: any) =>
      Number(
        acc +
          ri.CQS_AMNT +
          ri.SURP1_AMNT +
          ri.SURP2_AMNT +
          ri.QS_AMNT +
          ri.FACOUT_AMNT +
          ri.XOL_AMNT
      ),
    0
  );

  const treatyOutstandingAmt = riOutstandingCessionReport.reduce(
    (acc: any, ri: any) =>
      Number(acc + ri.CQS_AMNT + ri.SURP1_AMNT + ri.SURP2_AMNT + ri.QS_AMNT),
    0
  );
  const facOutstandingAmt = riOutstandingCessionReport.reduce(
    (acc: any, ri: any) => Number(acc + ri.FACOUT_AMNT),
    0
  );
  const xolOutstandingAmt = riOutstandingCessionReport.reduce(
    (acc: any, ri: any) => Number(acc + ri.XOL_AMNT),
    0
  );

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const [fmDate24, setFmDate24] = useState("");
  const [toDate24, setTdDate24] = useState("");

  const formattedCompanys: [] = companys.map((company: IBranches) => {
    return {
      label: company.organization_name,
      value: company.organization_code,
    };
  });

  const handleToDate = (date: any, dateString: any) => {
    const [day, month, year] = dateString.split("-");
    let formattedMonth: any = "";
    if (month < 10) {
      formattedMonth = months[month.toString().slice(1) - 1];
    } else {
      formattedMonth = months[Number(month - 1)];
    }
    const formattedToDate = day + "-" + formattedMonth + "-" + year;

    setTdDate24(formattedToDate);
  };

  const handleFromDate = (date: any, dateString: any) => {
    const [day, month, year] = dateString.split("-");
    let formattedMonth: any = "";
    if (month < 10) {
      formattedMonth = months[month.toString().slice(1) - 1];
    } else {
      formattedMonth = months[Number(month - 1)];
    }
    const formattedToDate = day + "-" + formattedMonth + "-" + year;

    setFmDate24(formattedToDate);
  };

  const handleRunReports = async () => {
    if (fmDate24.length !== 11 || toDate24.length !== 11) {
      alert("Please select from date and to date");
    } else {
      setFromDate(fmDate24), setToDate(toDate24);
    }
  };

  const handleDownloadOuts = () => {
    const data = riOutstandingCessionReport.map((item: any) => {
      const row: Record<string, any> = {};

      RIOUTSTANDING_COLUMNS.forEach(({ name, dataIndex }) => {
        // Map each column's name to its respective value in the data
        row[name] = item[dataIndex] ?? ""; // Use fallback for undefined values
      });

      return row;
    });

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Ri share of claim outstanding"
    );
    XLSX.writeFile(
      workbook,
      `RI share of claim outstanding ${Date.now()}.xlsx`
    );
  };

  const handleDownloadRIPrem = () => {
    const data = riCessionRegister.map((item: any) => {
      const row: Record<string, any> = {};

      RI_PREMIUM_COLUMNS.forEach(({ name, dataIndex }) => {
        // Map each column's name to its respective value in the data
        row[name] = item[dataIndex] ?? ""; // Use fallback for undefined values
      });
      row["Variant SI"] =
        item.PERC_100_SI -
        item.RETENTION_SI -
        item.QS_SI -
        item.CQS_SI -
        item.SURP1_SI -
        item.SURP2_SI -
        item.FACOUT_SI;
      row["Variant Prem"] =
        item.PERC_100_PREM -
        item.RETENTION_PREM -
        item.QS_PREM -
        item.CQS_PREM -
        item.SURP1_PREM -
        item.SURP2_PREM -
        item.FACOUT_PREM;

      return row;
    });

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Ri Premium (CEEDED)");
    XLSX.writeFile(workbook, `Total Reinsurance Premium ${Date.now()}.xlsx`);
  };

  const RI_CLAIM_PAID_RECOVERY=`http://192.168.1.112:8001/icon/reports?p_module_name=RI_PAID_CESSIONS_SUM&destype=cache&desformat=PDF&rep_param1=&rep_param2=&rep_param3=&rep_param4=&rep_param5=&rep_param6=&rep_param7=&rep_param8=&rep_param9=&rep_doc_index=&rep_doc_org=50&rep_doc_no=&p_role_code=RI.MGR&p_org_code=50&p_menu_code=RI000013&p_grp_code=RI.MGR&p_os_code=&p_user_code=1000000&p_user_name=ICON,%20Admin%20&p_report_title=PAID%20CESSION%20SUMMARY%20CLASSWISE&P_ORG_CODE=50&P_FM_DT=${fromDate}&P_TO_DT=${toDate}`

  return (
    <div>
      <p className="flex justify-center font-bold">
        Running Period [{fromDate}] - [{toDate}]
      </p>
      <div className="top-0  z-0 flex sm:flex-col md:flex-row gap-2 items-center">
        <CustomSelect
          defaultValue={{ label: "Entire Company", value: "" }}
          options={formattedCompanys}
          onChange={(value: { value: string; label: string }) => {
            setBranchCode(value.value);
          }}
          className="w-[330px] ml-3"
          name="Company"
        />
        <div className="flex flex-col mt-2">
          <label>From date</label>
          <DatePicker
            format={"DD-MM-YYYY"}
            placeholder={"DD-MM-YYYY"}
            className={
              "md:w-[250px] sm:w-[20rem] h-[40px] border p-2 rounded-md"
            }
            onChange={handleFromDate}
          />
        </div>
        <div className="flex flex-col mt-2">
          <label>To date</label>
          <DatePicker
            format={"DD-MM-YYYY"}
            placeholder={"DD-MM-YYYY"}
            className={
              "md:w-[250px] sm:w-[20rem] h-[40px] border p-2 rounded-md"
            }
            onChange={handleToDate}
          />
        </div>
        <CustomButton
          name={"Run"}
          className={
            "bg-[#cb7229] text-white h-[40px] md:w-[152px] sm:w-[20rem] flex justify-center items-center mt-8 rounded-md"
          }
          onClick={handleRunReports}
        />
      </div>

      <div className="flex flex-wrap gap-2 mt-2 ml-3">
        <div
          onClick={handleDownloadRIPrem}
          className={`md:h-[130px]  sm:h-[130px] w-[450px] border cursor-pointer  rounded-md p-[20px]`}
        >
          {loadingRiCession ? (
            <p className="flex flex-col justify-center items-center">
              <Spin
                indicator={
                  <LoadingOutlined
                    style={{
                      fontSize: 20,
                      color: "#cb7229",
                    }}
                    spin
                  />
                }
              />
              {"Total reinsurance premium (ceeded)".toUpperCase()}
            </p>
          ) : (
            <div className="flex gap-2 items-center flex-col">
              <p className="text-[14px] flex justify-center ">
                {"Total reinsurance premium (ceeded)".toUpperCase()}
              </p>
              <p className="text-[18px] font-bold flex justify-start items-start">
                {(treatyPremium + facPremium).toLocaleString()}
              </p>
            </div>
          )}
        </div>
        <CustomCard
          name1="Treaty premium"
          total1={treatyPremium}
          name2={"Fac premium"}
          total2={facPremium}
          link={"ri-cessions"}
          cumulativeTotal={treatyPremium + treatyCommission}
          perc
        />
        <Link
          href={"/dashboard/reinsurance/ri-cessions"}
          className={`md:h-[130px]  sm:h-[130px] w-[450px] border cursor-pointer  rounded-md p-[20px]`}
        >
          {loadingRiCession ? (
            <p className="flex flex-col justify-center items-center">
              <Spin
                indicator={
                  <LoadingOutlined
                    style={{
                      fontSize: 20,
                      color: "#cb7229",
                    }}
                    spin
                  />
                }
              />
              {"Total Reinsurance Commission (Earned)".toUpperCase()}
            </p>
          ) : (
            <div className="flex gap-2 items-center flex-col">
              <p className="text-[14px] flex justify-center ">
                {"Total Reinsurance Commission (Earned)".toUpperCase()}
              </p>
              <p className="text-[18px] font-bold flex justify-start items-start">
                {(treatyCommission + facCommission).toLocaleString()}
              </p>
            </div>
          )}
        </Link>
        <CustomCard
          name1="Treaty Commission"
          total1={treatyCommission}
          name2={"Fac Commission"}
          total2={facCommission}
          link={"ri-cessions"}
          cumulativeTotal={facPremium + facCommission}
          perc
        />
        <Link
          href={"/dashboard/reinsurance/ri-paid-cession"}
          className={`md:h-[130px]  sm:h-[130px] w-[450px] border cursor-pointer  rounded-md p-[20px]`}
        >
          {loadingRiPaidCession ? (
            <p className="flex flex-col justify-center items-center">
              <Spin
                indicator={
                  <LoadingOutlined
                    style={{
                      fontSize: 20,
                      color: "#cb7229",
                    }}
                    spin
                  />
                }
              />
              {"Reinsurance Claim paid Recovery".toUpperCase()}
            </p>
          ) : (
            <div className="flex gap-2 items-center flex-col">
              <p className="text-[14px] flex justify-center ">
                {"Reinsurance Claim paid Recovery".toUpperCase()}
              </p>
              <p className="text-[18px] font-bold flex justify-start items-start">
                {(treatyAmt + facAmt + xolAmt).toLocaleString()}
              </p>
            </div>
          )}
        </Link>

        <CustomCard
          name1="Treaty claim recovery "
          total1={treatyAmt}
          name2={"fac claim recovery"}
          total2={facAmt}
          name3={"xol claim recovery"}
          total3={xolAmt}
          link={RI_CLAIM_PAID_RECOVERY}
        />

        <div
          onClick={handleDownloadOuts}
          className={`md:h-[130px]  sm:h-[130px] w-[450px] border cursor-pointer  rounded-md p-[20px]`}
        >
          {loadingRiOutstandingCessionReport ? (
            <p className="flex flex-col justify-center items-center">
              <Spin
                indicator={
                  <LoadingOutlined
                    style={{
                      fontSize: 20,
                      color: "#cb7229",
                    }}
                    spin
                  />
                }
              />
              {"reinsurance share of claim Outstanding ".toUpperCase()}
            </p>
          ) : (
            <div className="flex gap-2 items-center flex-col">
              <p className="text-[14px] flex justify-center ">
                {"reinsurance share of claim Outstanding ".toUpperCase()}
              </p>
              <p className="text-[18px] font-bold flex justify-start items-start">
                {totalOutstandingReinsurance.toLocaleString()}
              </p>
            </div>
          )}
        </div>
        <CustomCard
          name1="Treaty share of claim Outstanding "
          total1={treatyOutstandingAmt}
          name2={"fac share of claim Outstanding"}
          total2={facOutstandingAmt}
          name3={"xol share of claim Outstanding"}
          total3={Math.floor(xolOutstandingAmt)}
          link={"ri-outstanding-cession"}
        />
      </div>
    </div>
  );
};

export default Reinsurance;
