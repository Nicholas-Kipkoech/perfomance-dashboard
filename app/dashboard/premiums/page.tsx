"use client";
import { useContextApi } from "@/app/context/Context";
import CustomCard from "@/app/UI/reusableComponents/CustomCard";
import Link from "next/link";
import React from "react";

const Underwriting = () => {
  const {
    totalPremium,
    totalNewBusiness,
    totalRenewals,
    nonMotorUnrenewed,
    reinsurance,
    directClients,
    allClients,
    nonMotorPremium,
    motorPremium,
    intermediaryPremium,
    directPremium,
    broker,
    agents,
    motorRenewed,
    nonMotorUndebited,
    motorUndebited,
    commision,
    fromDate,
    toDate,
    branchCode,
  }: any = useContextApi();

  interface IPremiumCard {
    name: string;
    cummulativeTotal: number;
    total: number;
    color?: string;
    link?: string;
  }

  const CustomPremiumCard = ({
    name,
    cummulativeTotal,
    total,
    color,
    link,
  }: IPremiumCard) => {
    return (
      <Link
        href={`${link}`}
        style={{ backgroundColor: color }}
        className={`md:h-[130px] sm:h-[130px] w-[330px] border cursor-pointer shadow-2xl  rounded-md p-[20px]`}
      >
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <p className="text-[20px] font-bold flex justify-start items-start">
              {Number(total.toFixed(2)).toLocaleString()}
            </p>
            <p className="text-[20px] font-bold flex justify-start items-start">
              {Math.round((total / cummulativeTotal) * 100).toFixed(1)} %
            </p>
          </div>
          <p className="text-[16px] flex justify-center ">
            {name.toUpperCase()}
          </p>
        </div>
      </Link>
    );
  };

  const undebitedLink = `http://192.168.1.112:8001/icon/reports?p_module_name=UW_UNDEBITED_DOCS&destype=cache&desformat=PDF&rep_param1=&rep_param2=&rep_param3=&rep_param4=&rep_param5=&rep_param6=&rep_param7=&rep_param8=&rep_param9=&rep_doc_index=&rep_doc_org=50&rep_doc_no=&p_role_code=UW.ADF&p_org_code=50&p_menu_code=UW000203&p_grp_code=UW.ADF&p_os_code=01&p_user_code=1000000&p_user_name=ICON,%20Admin%20&p_report_title=UN%20DEBITED%20DOCS&P_ORG_CODE=50&P_BRANCH=${branchCode}&P_CURRENCY=&P_USER=&P_CATEGORY=&P_INTERMEDIARY=&P_CLASS=&P_FM_DT=${fromDate}&P_TO_DT=${toDate}&P_FILTER_BY=2`;
  const unrenewedLink = `http://192.168.1.112:8001/icon/reports?p_module_name=UW_UNRENEWED_POLICIES&destype=cache&desformat=PDF&rep_param1=&rep_param2=&rep_param3=&rep_param4=&rep_param5=&rep_param6=&rep_param7=&rep_param8=&rep_param9=&rep_doc_index=&rep_doc_org=50&rep_doc_no=&p_role_code=UW.ADF&p_org_code=50&p_menu_code=UW000056&p_grp_code=UW.ADF&p_os_code=01&p_user_code=1000000&p_user_name=ICON,%20Admin%20&p_report_title=UNRENEWED%20POLICIES%20REPORT&P_ORG_CODE=50&P_BRANCH=${branchCode}&P_BRANCH_GROUP=&P_CLASS=&P_SUBCLASS=&P_CATEGORY=&P_AGENT=&P_CLIENT=&P_CATEGORY_FILTER=&P_FM_DT=${fromDate}&P_TO_DT=${toDate}`;

  return (
    <div>
      <div className="flex flex-wrap gap-3 h-auto   border-b-slate-800 p-2">
        <CustomCard
          name={"Total  Premium"}
          total={totalPremium}
          currency
          link={"/dashboard/premiums/totalPremiums"}
        />
        <CustomCard
          link={"/dashboard/premiums/directPremiums"}
          name={"Direct Premium"}
          total={directPremium}
          currency
        />
        <CustomCard
          link={"/dashboard/premiums/intermediaryPremiums"}
          name={"Intermediary Premium"}
          total={intermediaryPremium}
          currency
        />
        <CustomCard
          name={"Reinsurance"}
          total={reinsurance}
          currency
          link={"/dashboard/premiums/reinsurance"}
        />

        <CustomPremiumCard
          link={"/dashboard/premiums/newBusiness"}
          name={"New Business"}
          total={totalNewBusiness}
          cummulativeTotal={totalPremium}
        />
        <CustomPremiumCard
          name={"Renewals"}
          link={"/dashboard/premiums/renewals"}
          total={totalRenewals}
          cummulativeTotal={totalPremium}
        />
        <CustomPremiumCard
          name={"Motor Premium"}
          link={"/dashboard/premiums/motorPremiums"}
          total={motorPremium}
          cummulativeTotal={totalPremium}
        />
        <CustomPremiumCard
          name={"Non Motor Premium"}
          link={"/dashboard/premiums/nonMotorPremiums"}
          total={nonMotorPremium}
          cummulativeTotal={totalPremium}
        />
        <CustomCard name={"Commision"} link="" total={commision} currency />
        <CustomCard
          name={"Total number of all clients"}
          total={allClients}
          link=""
        />
        <CustomCard
          name={"Total number of direct clients"}
          total={directClients}
          link=""
        />
        <CustomCard name={"Total number of brokers"} total={broker} link="" />
        <CustomCard name={"Total number of agents"} total={agents} link="" />

        <Link
          href={unrenewedLink}
          target="_blank"
          className={`md:h-[130px] sm:h-[130px] w-[330px] border cursor-pointer shadow-2xl rounded-md p-[20px]`}
          onClick={() => {}}
        >
          <div className="flex flex-col gap-1">
            <p className="text-[18px] font-bold flex justify-start items-start">
              TOTAL {(motorRenewed + nonMotorUnrenewed).toLocaleString()}
            </p>
            <div className="flex justify-between">
              <p>{"Motor".toUpperCase()}</p>
              <p>{"Non Motor".toUpperCase()}</p>
            </div>
            <div className="flex justify-between">
              <p className="font-bold">{motorRenewed.toLocaleString()}</p>
              <p className="font-bold">{nonMotorUnrenewed.toLocaleString()}</p>
            </div>
            <p className="text-[14px] flex justify-center ">
              {"Unrenewed Policies".toUpperCase()}
            </p>
          </div>
        </Link>
        <Link
          href={undebitedLink}
          target="_blank"
          className={`md:h-[130px] sm:h-[130px] w-[330px] border cursor-pointer shadow-2xl  rounded-md p-[20px]`}
          onClick={() => {}}
        >
          <div className="flex flex-col gap-1">
            <p className="text-[18px] font-bold flex justify-start items-start">
              TOTAL {(motorUndebited + nonMotorUndebited).toLocaleString()}
            </p>
            <div className="flex justify-between">
              <p>{"Motor".toUpperCase()}</p>
              <p>{"Non Motor".toUpperCase()}</p>
            </div>
            <div className="flex justify-between">
              <p className="font-bold"> {motorUndebited.toLocaleString()}</p>
              <p className="font-bold">{nonMotorUndebited.toLocaleString()}</p>
            </div>
            <p className="text-[14px] flex justify-center ">
              {"Undebited Policies".toUpperCase()}
            </p>
          </div>
        </Link>
        <Link
          href={""}
          target="_blank"
          className={`md:h-[130px] sm:h-[130px] w-[330px] border cursor-pointer  rounded-md p-[20px] shadow-2xl bg-wh`}
          onClick={() => {}}
        >
          <div className="flex flex-col gap-1">
            <div className="flex justify-between">
              <p>{"Budget".toUpperCase()}</p>
              <p>{"Actual".toUpperCase()}</p>
            </div>
            <div className="flex justify-between">
              <p className="font-bold"> {(1282600).toLocaleString()}</p>
              <p className="font-bold">{totalPremium.toLocaleString()}</p>
            </div>
            <div className="flex justify-between">
              <p className="font-bold">10%</p>
              <p className="font-bold">90%</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Underwriting;
