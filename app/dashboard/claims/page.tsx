"use client";
import { useContextApi } from "@/app/context/Context";
import CustomCard from "@/app/UI/reusableComponents/CustomCard";
import React from "react";

const Claims = () => {
  const { totalClaimPaid, totalClaims, totalRegisteredClaims }: any =
    useContextApi();
  return (
    <div>
      <div className="flex flex-wrap gap-3 h-auto  overflow-auto  border-b-slate-800 p-2">
        <CustomCard
          name={"Registered  Claims"}
          totalNumber={totalRegisteredClaims}
          currency
          total={0}
        />
        <CustomCard
          name={"Paid  Claims"}
          totalNumber={totalClaims}
          total={totalClaimPaid}
          currency
        />
        <CustomCard
          name={"Outstanding Claims"}
          totalNumber={0}
          total={0}
          currency
        />
      </div>
    </div>
  );
};

export default Claims;
