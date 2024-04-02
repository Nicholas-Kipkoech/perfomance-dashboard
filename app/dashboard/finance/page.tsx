"use client";
import { useContextApi } from "@/app/context/Context";
import CustomCard from "@/app/UI/reusableComponents/CustomCard";
import Link from "next/link";
import React from "react";

const Finance = () => {
  const { receiptResults, toDate, fromDate, branchCode }: any = useContextApi();
  interface IFinanceCard {
    name: string;
    color?: string;
    link?: string;
  }
  const CustomFinanceCard = ({ name, color, link }: IFinanceCard) => {
    return (
      <Link
        href={`${link}`}
        target="_blank"
        style={{ backgroundColor: color }}
        className={`h-[130px] w-[330px] border cursor-pointer  rounded-md p-[10px]`}
        onClick={() => {}}
      >
        <div className="flex gap-1 flex-col text-[14px] ">
          <div className="justify-between flex font-bold">
            <p>Amount</p>
            <p>Count</p>
          </div>
          {Object.entries(receiptResults).map(
            ([currencyCode, { total, count }]: any, key) => (
              <div className="justify-between flex" key={key}>
                <p className="text-[20px] font-bold flex justify-start items-start">
                  {currencyCode} {total.toLocaleString()}
                </p>
                <p className="text-[20px] font-bold flex justify-start items-start">
                  {count.toLocaleString()}
                </p>
              </div>
            )
          )}
          <p className="text-[16px] flex justify-center ">
            {name.toUpperCase()}
          </p>
        </div>
      </Link>
    );
  };
  const receiptListingLink = `http://192.168.1.112:8001/icon/reports?p_module_name=AR_RECEIPT_LISTING&destype=cache&desformat=PDF&rep_param1=&rep_param2=&rep_param3=&rep_param4=&rep_param5=&rep_param6=&rep_param7=&rep_param8=&rep_param9=&rep_doc_index=&rep_doc_org=50&rep_doc_no=&p_role_code=AR.MGR&p_org_code=50&p_menu_code=AR000032&p_grp_code=AR.MGR&p_os_code=01&p_user_code=1000000&p_user_name=ICON,%20Admin%20&p_report_title=RECEIPT%20LISTING%20REPORT&P_ORG_CODE=50&P_CURRENCY=&P_BRANCH=${branchCode}&P_CATEGORY=&P_AGENT=&P_FM_DT=${fromDate}&P_TO_DT=${toDate}&P_CREATED_BY=&P_PAYING_FOR=&P_MODE=&P_STATUS=`;
  return (
    <div>
      <div className="flex flex-wrap gap-3 h-auto  overflow-auto  border-b-slate-800 p-2">
        <CustomFinanceCard
          name={"Receipts Listing"}
          color={"#B4B4B3"}
          link={receiptListingLink}
        />
        <CustomCard
          name={"Bank Balances"}
          totalNumber={0}
          link=""
          currency
          total={0}
          color={"#B4B4B3"}
        />
      </div>
    </div>
  );
};

export default Finance;
