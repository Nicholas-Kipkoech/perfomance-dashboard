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
        <CustomCard
          name={"New Business"}
          total={totalNewBusiness}
          currency
          color={"#FC9e4f"}
        />
        <CustomCard
          name={"Renewals"}
          total={totalRenewals}
          currency
          color={"#FC9e4f"}
        />
        <CustomCard
          name={"Motor Premium"}
          total={motorPremium}
          currency
          color={"#FC9e4f"}
        />
        <CustomCard
          name={"Non Motor Premium"}
          total={nonMotorPremium}
          currency
          color={"#FC9e4f"}
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
          color={"#17A2B8"}
        />
        <CustomCard
          name={"Undebited Policies"}
          total2={motorUndebited}
          title1="Motor"
          title2="Non motor"
          total={nonMotorUndebited}
          currency
          color={"#17A2B8"}
        />
      </div>
    </div>
  );
};

export default Underwriting;
