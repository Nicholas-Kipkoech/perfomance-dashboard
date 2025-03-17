"use client";
import { IBranches } from "@/app/assets/interfaces";
import { ClaimsContext } from "@/app/context/ClaimsContext";
import CustomButton from "@/app/UI/reusableComponents/CustomButton";
import CustomCard from "@/app/UI/reusableComponents/CustomCard";
import CustomSelect from "@/app/UI/reusableComponents/CustomSelect";
import { LoadingOutlined } from "@ant-design/icons";
import { DatePicker, Spin } from "antd";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";

const Claims = () => {
  const {
    fromDate,
    toDate,
    totalClaimPaid,
    loadingClaimsData,
    totalRegisteredClaims,
    loadingRegisteredClaims,
    totalOutstanding,
    totalSalvages,
    loadingSalvages,
    nonMotorRegisteredClaims,
    motorRegisteredClaims,
    filteredLossRation,
    loadingCmLossRatio,
    motorOutstanding,
    loadingOutstandingClaims,
    motorPaidClaims,
    nonMotorPaidClaims,
    nonMotorOutstanding,
    year: _year,

    companys,
    setFromDate,
    setToDate,

    setCompany,
    fetchClaimsData,
  }: any = useContext(ClaimsContext);

  const [branchCode, setBranchCode] = useState("");
  const [fmDate24, setFmDate24] = useState("");
  const [toDate24, setTdDate24] = useState("");

  const router = useRouter();
  const totalLossRatio = filteredLossRation.reduce(
    (acc: number, ratio: any) => {
      return ratio.total !== null ? acc + Number(ratio.total) : acc;
    },
    0
  );
  const nonMotorAmountPercantage = Math.round(
    (nonMotorPaidClaims / totalClaimPaid) * 100
  );
  const motorAmountPercantage = Math.round(
    (motorPaidClaims / totalClaimPaid) * 100
  );
  const motorOutstandingPerc = Math.round(
    (motorOutstanding / totalOutstanding) * 100
  );
  const nonMotorOutstandingPerc = Math.round(
    (nonMotorOutstanding / totalOutstanding) * 100
  );

  const nonMotorRegisteredPerc = Math.round(
    (nonMotorRegisteredClaims / totalRegisteredClaims) * 100
  );
  const motorRegisteredPerc = Math.round(
    (motorRegisteredClaims / totalRegisteredClaims) * 100
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
      setToDate(toDate24), setFromDate(fmDate24);
    }
  };

  const registeredClaimsUrl = `http://192.168.1.112:5000/bima-excel/?p_module_name=CM_CLMS_REGISTERED_NEW&destype=cache&desformat=SPREADSHEET&rep_param1=&rep_param2=&rep_param3=&rep_param4=&rep_param5=&rep_param6=&rep_param7=&rep_param8=&rep_param9=&rep_doc_index=&rep_doc_org=50&rep_doc_no=&p_role_code=CM.MGR&p_org_code=50&p_menu_code=CM000031&p_grp_code=CM.MGR&p_os_code=01&p_user_code=1000000&p_user_name=ICON,%20Admin%20&p_report_title=REGISTERED%20CLAIMS%20REPORT%20EXCEL&P_ORG_CODE=50&P_BRANCH=&P_CURRENCY=&P_CLASS=&P_SUBCLASS=&P_CATEGORY=&P_AGENT=&P_CLIENT=&P_LOSS_CAUSE=&P_RESERVE_TYPE=&P_FM_DT=${fromDate}&P_TO_DT=${toDate}`;

  const paidClaimsUrl = `http://192.168.1.112:5000/bima-excel/?p_module_name=CM_PAID_CLMS&destype=cache&desformat=SPREADSHEET&rep_param1=&rep_param2=&rep_param3=&rep_param4=&rep_param5=&rep_param6=&rep_param7=&rep_param8=&rep_param9=&rep_doc_index=&rep_doc_org=50&rep_doc_no=&p_role_code=CM.MGR&p_org_code=50&p_menu_code=CM000032&p_grp_code=CM.MGR&p_os_code=01&p_user_code=1000000&p_user_name=ICON,%20Admin%20&p_report_title=CLAIMS%20PAID%20REPORT&P_ORG_CODE=50&P_CLASS=&P_BRANCH=&P_SUBCLASS=&P_CATEGORY=&P_INTERMEDIARY=&P_SCATEGORY=&P_SENTITY=&P_LOSS_CAUSE=&P_CLIENT=&P_PAYMENT_MODE=&P_SOURCE=&P_FM_DT=${fromDate}&P_TO_DT=${toDate}&P_RESERVE_TYPE=`;

  const oustandingClaimsUrl = `http://192.168.1.112:5000/bima-excel/?p_module_name=CM_OUTS_CLMS_COMBINED&destype=cache&desformat=SPREADSHEET&rep_param1=&rep_param2=&rep_param3=&rep_param4=&rep_param5=&rep_param6=&rep_param7=&rep_param8=&rep_param9=&rep_doc_index=&rep_doc_org=50&rep_doc_no=&p_role_code=CM.MGR&p_org_code=50&p_menu_code=CM000030&p_grp_code=CM.MGR&p_os_code=01&p_user_code=1000000&p_user_name=ICON,%20Admin%20&p_report_title=CLAIMS%20OUTSTANDING%20COMBINED%20RESERVES%20REPORT&P_ORG_CODE=50&P_BRANCH_GROUP=&P_BRANCH=&P_CLASS=&P_SUBCLASS=&P_CATEGORY=&P_AGENT=&P_CLIENT=&P_LOSS_CAUSE=&P_RESERVE_TYPE=&P_ASATDATE=${toDate}&P_AMOUNT=0&P_SHOW_TOTS=N`;

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
            setCompany(value.label);
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
      <div className="flex flex-wrap gap-3 h-auto  overflow-auto  border-b-slate-800 p-2">
        <a
          className={`md:h-[130px] sm:h-[130px] w-[450px] border cursor-pointer rounded-md p-[20px]`}
          href={registeredClaimsUrl}
          target="_blank"
        >
          {loadingRegisteredClaims ? (
            <p className="flex justify-center flex-col items-center">
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
              {"Registered Claims".toUpperCase()}
            </p>
          ) : (
            <div className="flex flex-col gap-1">
              <p className="text-[18px] font-bold flex justify-center">
                TOTAL {totalRegisteredClaims.toLocaleString()}
              </p>
              <div className="flex justify-between text-[15px]">
                <p>{"Motor".toUpperCase()}</p>
                <p>{"Non Motor".toUpperCase()}</p>
              </div>
              <div className="flex justify-between text-[14px]">
                <p className="font-bold ">
                  {motorRegisteredClaims.toLocaleString()}
                </p>
                <p className="font-bold text-[14px]">{motorRegisteredPerc}%</p>
                <p className="font-bold text-[14px]">
                  {nonMotorRegisteredClaims.toLocaleString()}
                </p>
                <p className="font-bold text-[14px]">
                  {nonMotorRegisteredPerc}%
                </p>
              </div>
              <p className="text-[14px] flex justify-center font-bold">
                {"Registered Claims".toUpperCase()}
              </p>
            </div>
          )}
        </a>
        <a
          className={`md:h-[130px] sm:h-[130px] w-[450px] border cursor-pointer rounded-md p-[20px]`}
          href={paidClaimsUrl}
          target="_blank"
        >
          {loadingClaimsData ? (
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
              {"Paid Claims".toUpperCase()}
            </p>
          ) : (
            <div className="flex flex-col gap-1">
              <p className="text-[18px] font-bold flex justify-center items-center">
                TOTAL {totalClaimPaid.toLocaleString()}
              </p>
              <div className="flex justify-between text-[15px]">
                <p>{"Non Motor".toUpperCase()}</p>
                <p>{" Motor".toUpperCase()}</p>
              </div>
              <div className="flex justify-between text-[14px]">
                <p className="font-bold ">
                  {Math.floor(nonMotorPaidClaims).toLocaleString()}
                </p>
                <p className="font-bold text-[14px]">
                  {nonMotorAmountPercantage}%
                </p>
                <p className="font-bold text-[14px]">
                  {Math.floor(motorPaidClaims).toLocaleString()}
                </p>
                <p className="font-bold text-[14px]">
                  {motorAmountPercantage}%
                </p>
              </div>
              <p className="text-[14px] flex justify-center font-bold ">
                {"Paid Claims".toUpperCase()}
              </p>
            </div>
          )}
        </a>

        <a
          className={`md:h-[130px] sm:h-[130px] w-[450px] border cursor-pointer  rounded-md p-[20px]`}
          href={oustandingClaimsUrl}
          target="_blank"
        >
          {loadingOutstandingClaims ? (
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
              {"Outstanding Claims".toUpperCase()}
            </p>
          ) : (
            <div className="flex flex-col gap-1">
              <p className="text-[18px] font-bold flex justify-center">
                TOTAL {totalOutstanding.toLocaleString()}
              </p>
              <div className="flex justify-between text-[15px]">
                <p>{"Motor".toUpperCase()}</p>
                <p>{"Non Motor".toUpperCase()}</p>
              </div>
              <div className="flex justify-between text-[14px]">
                <p className="font-bold ">
                  {motorOutstanding.toLocaleString()}
                </p>
                <p className="font-bold text-[14px]">{motorOutstandingPerc}%</p>
                <p className="font-bold text-[14px]">
                  {nonMotorOutstanding.toLocaleString()}
                </p>
                <p className="font-bold text-[14px]">
                  {nonMotorOutstandingPerc}%
                </p>
              </div>
              <p className="text-[14px] flex justify-center font-bold">
                {"Outstanding Claims".toUpperCase()}
              </p>
            </div>
          )}
        </a>
        <CustomCard
          link={"/dashboard/claims/salvages"}
          name={"Salvages"}
          loadingData={loadingSalvages}
          totalNumber={0}
          total={totalSalvages}
          currency
        />
        <CustomCard
          name={"Loss Ratio"}
          totalNumber={0}
          total={totalLossRatio}
          loadingData={loadingCmLossRatio}
          perc
          link={""}
        />
      </div>
    </div>
  );
};

export default Claims;
