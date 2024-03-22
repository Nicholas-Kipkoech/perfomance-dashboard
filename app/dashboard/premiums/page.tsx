"use client";
import { useContextApi } from "@/app/context/Context";
import CustomCard from "@/app/UI/reusableComponents/CustomCard";
import React from "react";

const Premiums = () => {
  const {
    totalPremium,
    totalNewBusiness,
    totalRenewals,

    reinsurance,
    directClients,
    allClients,
    nonMotorPremium,
    motorPremium,
    intermediaryPremium,
    directPremium,
    broker,
    agents,
  }: any = useContextApi();
  return (
    <div>
      <div className="flex flex-wrap gap-3 h-auto  overflow-auto  border-b-slate-800 p-2">
        <CustomCard name={"Total  Premium"} total={totalPremium} currency />
        <CustomCard name={"Direct Premium"} total={directPremium} currency />
        <CustomCard
          name={"Intermediary Premium"}
          total={intermediaryPremium}
          currency
        />
        <CustomCard
          name={"Reinsurance This Year"}
          total={reinsurance}
          currency
        />
        <CustomCard name={"New Business"} total={totalNewBusiness} currency />
        <CustomCard name={"Renewals"} total={totalRenewals} currency />
        <CustomCard name={"Motor Premium"} total={motorPremium} currency />
        <CustomCard
          name={"Non Motor Premium"}
          total={nonMotorPremium}
          currency
        />
        <CustomCard name={"Total Number of clients"} total={allClients} />
        <CustomCard name={"Number of direct clients"} total={directClients} />
        <CustomCard name={"Number of brokers"} total={broker} />
        <CustomCard name={"Number of agents"} total={agents} />
      </div>
    </div>
  );
};

export default Premiums;
