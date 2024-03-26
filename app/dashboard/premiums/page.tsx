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
  }: any = useContextApi();
  return (
    <div>
      <div className="flex flex-wrap gap-3 h-auto  overflow-auto  border-b-slate-800 p-2">
        <CustomCard
          name={"Total  Premium"}
          total={totalPremium}
          currency
          color={"#41C9E2"}
        />
        <CustomCard
          name={"Direct Premium"}
          total={directPremium}
          currency
          color={"#41C9E2"}
        />
        <CustomCard
          name={"Intermediary Premium"}
          total={intermediaryPremium}
          currency
          color={"#41C9E2"}
        />
        <CustomCard
          name={"Reinsurance"}
          total={reinsurance}
          currency
          color={"#41C9E2"}
        />
        <CustomCard
          name={"New Business"}
          total={totalNewBusiness}
          currency
          color={"#D9EDBF"}
        />
        <CustomCard
          name={"Renewals"}
          total={totalRenewals}
          currency
          color={"#D9EDBF"}
        />
        <CustomCard
          name={"Motor Premium"}
          total={motorPremium}
          currency
          color={"#D9EDBF"}
        />
        <CustomCard
          name={"Non Motor Premium"}
          total={nonMotorPremium}
          currency
          color={"#D9EDBF"}
        />
        <CustomCard
          name={"Total Number of clients"}
          total={allClients}
          color={"#FFDD95"}
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
        <CustomCard
          name={"Unrenewed Policies"}
          total2={motorRenewed}
          title1="Non motor"
          title2="Motor"
          total={nonMotorUnrenewed}
          currency
          color={"#61A3BA"}
        />
        <CustomCard
          name={"Undebited Policies"}
          total2={motorUndebited}
          title1="Motor"
          title2="Non motor"
          total={nonMotorUndebited}
          currency
          color={"#61A3BA"}
        />
      </div>
    </div>
  );
};

export default Underwriting;
