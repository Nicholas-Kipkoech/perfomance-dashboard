"use client";
import { useContextApi } from "@/app/context/Context";
import CustomCard from "@/app/UI/reusableComponents/CustomCard";
import React from "react";

const Claims = () => {
  const {
    totalClaimPaid,
    totalClaims,
    totalRegisteredClaims,
    totalOutstanding,
    totalCount: totalOutstandingCount,
    totalSalvages,
    totalRecovery,
  }: any = useContextApi();
  return (
    <div>
      <div className="flex flex-wrap gap-3 h-auto  overflow-auto  border-b-slate-800 p-2">
        <CustomCard
          name={"Registered  Claims"}
          total={totalRegisteredClaims}
          currency
          color={"#E178C5"}
        />
        <CustomCard
          name={"Paid  Claims"}
          totalNumber={totalClaims}
          total={totalClaimPaid}
          currency
          color={"#E178C5"}
        />
        <CustomCard
          name={"Outstanding Claims"}
          totalNumber={totalOutstandingCount}
          total={totalOutstanding}
          currency
          color={"#E178C5"}
        />
        <CustomCard
          name={"Salvages"}
          totalNumber={0}
          total={totalSalvages}
          currency
          color={"#FF8080"}
        />
        <CustomCard
          name={"RI Recovery"}
          totalNumber={0}
          total={totalRecovery}
          currency
          color={"#FF8080"}
        />
      </div>
    </div>
  );
};

export default Claims;
