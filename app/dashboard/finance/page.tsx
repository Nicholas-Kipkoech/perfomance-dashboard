"use client";
import { useContextApi } from "@/app/context/Context";
import CustomCard from "@/app/UI/reusableComponents/CustomCard";
import React from "react";

const Finance = () => {
  const { receiptResults }: any = useContextApi();
  interface IFinanceCard {
    name: string;
    color?: string;
  }
  const CustomFinanceCard = ({ name, color }: IFinanceCard) => {
    return (
      <div
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
      </div>
    );
  };

  return (
    <div>
      <div className="flex flex-wrap gap-3 h-auto  overflow-auto  border-b-slate-800 p-2">
        <CustomFinanceCard name={"Receipts Listing"} color={"#B4B4B3"} />
        <CustomCard
          name={"Bank Balances"}
          totalNumber={0}
          currency
          total={0}
          color={"#B4B4B3"}
        />
      </div>
    </div>
  );
};

export default Finance;
