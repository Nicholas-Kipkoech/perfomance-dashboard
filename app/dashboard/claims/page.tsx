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
    filteredLossRation,
  }: any = useContextApi();

  const totalLossRatio = filteredLossRation.reduce(
    (acc: number, ratio: any) => {
      return ratio.total !== null ? acc + Number(ratio.total) : acc;
    },
    0
  );

  return (
    <div>
      <div className="flex flex-wrap gap-3 h-auto  overflow-auto  border-b-slate-800 p-2">
        <CustomCard
          name={"Registered  Claims"}
          total={totalRegisteredClaims}
          currency
          link={"/dashboard/claims/registeredClaims"}
          color={"#E178C5"}
        />
        <CustomCard
          link={"/dashboard/claims/paidClaims"}
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
          link={"/dashboard/claims/outstandingClaims"}
        />
        <CustomCard
          link={"/dashboard/claims/salvages"}
          name={"Salvages"}
          totalNumber={0}
          total={totalSalvages}
          currency
          color={"#FF8080"}
        />
        <CustomCard
          name={"Loss Ratio"}
          totalNumber={0}
          total={totalLossRatio}
          color={"#FF8080"}
          link={""}
        />
      </div>
    </div>
  );
};

export default Claims;
