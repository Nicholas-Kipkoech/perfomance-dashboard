"use client";
import React from "react";
import CustomCard from "../UI/reusableComponents/CustomCard";
import { useContextApi } from "../context/Context";
import CustomSelect from "../UI/reusableComponents/CustomSelect";
import { IBranches } from "../assets/interfaces";

const Dashboard = () => {
  const {
    totalPremium,
    newPoliciesPremium,
    renewals,
    additionalPremium,
    refundPremium,
    year: _year,
    setYear,
    registeredClaims,
    outStandingClaims,
    claimPaid,
    reinsurance,
    commision,
    directClients,
    intermediaryClients,
    companys,
    setBranchCode,
    setCompany,
    years,
    nonMotorPremium,
    motorPremium,
  }: any = useContextApi();

  const formattedOptions = years.map((year: any) => {
    return {
      label: year.year,
      value: year.year,
    };
  });

  const formattedCompanys: [] = companys.map((company: IBranches) => {
    return {
      label: company.organization_name,
      value: company.organization_code,
    };
  });

  return (
    <div className="p-[10px] mt-[20px]">
      <div className="flex gap-2">
        <CustomSelect
          defaultValue={{ label: "Entire Company", value: "" }}
          options={formattedCompanys}
          onChange={(value: { value: string; label: string }) => {
            setBranchCode(value.value);
            setCompany(value.label);
          }}
          className="w-[330px]"
          name="Company"
        />
        <CustomSelect
          defaultValue={{ label: "2023", value: 2023 }}
          options={formattedOptions}
          onChange={(value: { value: string; label: string }) => {
            setYear(value.value);
          }}
          className="w-[330px]"
          name="Year"
        />
      </div>

      <div className="divide-y">
        <div className="flex flex-wrap gap-3 h-auto  overflow-auto  border-b-slate-800 p-2">
          <CustomCard name={"Total  Premium"} total={totalPremium} currency />
          <CustomCard
            name={"Additional Premium"}
            total={additionalPremium}
            currency
          />
          <CustomCard name={"Refund Premium"} total={refundPremium} currency />
          <CustomCard
            name={"New Business"}
            total={newPoliciesPremium}
            currency
          />
          <CustomCard name={"Renewals"} total={renewals} currency />
          <CustomCard
            name={"Reinsurance This Year"}
            total={reinsurance}
            currency
          />
          <CustomCard name={"Commision"} total={commision} />
          <CustomCard name={"Number of direct clients"} total={directClients} />
          <CustomCard
            name={"Number of intermediary"}
            total={intermediaryClients}
          />
          <CustomCard name={"Registered Claims"} total={registeredClaims} />
          <CustomCard name={"Outstanding claims"} total={outStandingClaims} />
          <CustomCard name={"Claim Paid"} total={claimPaid} />
          <CustomCard name={"Motor Premium"} total={motorPremium} currency />
          <CustomCard
            name={"Non Motor Premium"}
            total={nonMotorPremium}
            currency
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
