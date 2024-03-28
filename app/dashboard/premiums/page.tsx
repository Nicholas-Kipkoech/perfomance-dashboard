"use client";
import { useContextApi } from "@/app/context/Context";
import CustomCard from "@/app/UI/reusableComponents/CustomCard";
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
  }: any = useContextApi();

  interface IPremiumCard {
    name: string;
    cummulativeTotal: number;
    total: number;
    color?: string;
  }

  const CustomPremiumCard = ({
    name,
    cummulativeTotal,
    total,
    color,
  }: IPremiumCard) => {
    return (
      <div
        style={{ backgroundColor: color }}
        className={`h-[130px] w-[330px] border cursor-pointer  rounded-md p-[20px]`}
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
      </div>
    );
  };

  return (
    <div>
      <div className="flex flex-wrap gap-3 h-auto   border-b-slate-800 p-2">
        <CustomCard
          name={"Total  Premium"}
          total={totalPremium}
          currency
          color={"#6ea4bf"}
        />
        <CustomCard
          name={"Direct Premium"}
          total={directPremium}
          currency
          color={"#6ea4bf"}
        />
        <CustomCard
          name={"Intermediary Premium"}
          total={intermediaryPremium}
          currency
          color={"#6ea4bf"}
        />
        <CustomCard
          name={"Reinsurance"}
          total={reinsurance}
          currency
          color={"#6ea4bf"}
        />

        <CustomPremiumCard
          name={"New Business"}
          total={totalNewBusiness}
          cummulativeTotal={totalPremium}
          color={"#FC9e4f"}
        />
        <CustomPremiumCard
          name={"Renewals"}
          total={totalRenewals}
          cummulativeTotal={totalPremium}
          color={"#FC9e4f"}
        />
        <CustomPremiumCard
          name={"Motor Premium"}
          total={motorPremium}
          cummulativeTotal={totalPremium}
          color={"#FC9e4f"}
        />
        <CustomPremiumCard
          name={"Non Motor Premium"}
          total={nonMotorPremium}
          cummulativeTotal={totalPremium}
          color={"#FC9e4f"}
        />
        <CustomCard
          name={"Commision"}
          total={commision}
          color={"#FFDD95"}
          currency
        />
        <CustomCard
          name={"Number of direct clients"}
          total={directClients}
          color={"#FFDD95"}
        />
        <CustomCard
          name={"Number of brokers"}
          total={broker}
          color={"#FFDD95"}
        />
        <CustomCard
          name={"Number of agents"}
          total={agents}
          color={"#FFDD95"}
        />

        <div
          style={{ backgroundColor: "#17A2B8" }}
          className={`h-[130px] w-[330px] border cursor-pointer  rounded-md p-[20px]`}
          onClick={() => {}}
        >
          <div className="flex flex-col gap-1">
            <p className="text-[18px] font-bold flex justify-start items-start">
              {(motorRenewed + nonMotorUnrenewed).toLocaleString()}
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
        </div>
        <div
          style={{ backgroundColor: "#17A2B8" }}
          className={`h-[130px] w-[330px] border cursor-pointer  rounded-md p-[20px]`}
          onClick={() => {}}
        >
          <div className="flex flex-col gap-1">
            <p className="text-[18px] font-bold flex justify-start items-start">
              {(motorUndebited + nonMotorUndebited).toLocaleString()}
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
        </div>
      </div>
    </div>
  );
};

export default Underwriting;
