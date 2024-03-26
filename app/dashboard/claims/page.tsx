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
  }: any = useContextApi();
  return (
    <div>
      <div className="flex flex-wrap gap-3 h-auto  overflow-auto  border-b-slate-800 p-2">
        <CustomCard
          name={"Registered  Claims"}
          totalNumber={totalRegisteredClaims}
          currency
          total={0}
          color={"#FF8080"}
        />
        <CustomCard
          name={"Paid  Claims"}
          totalNumber={totalClaims}
          total={totalClaimPaid}
          currency
          color={"#FF8080"}
        />
        <CustomCard
          name={"Outstanding Claims"}
          totalNumber={totalOutstandingCount}
          total={totalOutstanding}
          currency
          color={"#FF8080"}
        />
      </div>
    </div>
  );
};

export default Claims;
