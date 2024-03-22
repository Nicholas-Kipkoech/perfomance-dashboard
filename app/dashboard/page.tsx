"use client";
import React from "react";
import CustomCard from "../UI/reusableComponents/CustomCard";
import { useContextApi } from "../context/Context";
import CustomSelect from "../UI/reusableComponents/CustomSelect";
import { IBranches } from "../assets/interfaces";
import Premiums from "./premiums/page";
import Claims from "./claims/page";

const Dashboard = () => {
  const {
    year: _year,
    setYear,
    companys,
    setBranchCode,
    setCompany,
    years,
    component,
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

  const renderComponent = () => {
    switch (component) {
      case "Premiums":
        return <Premiums />;
        break;
      case "Claims":
        return <Claims />;
        break;
      default:
        return <p>Loading....</p>;
        break;
    }
  };

  return (
    <div className="p-[10px] mt-[20px] ">
      <div className="flex gap-2  ">
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

      {renderComponent()}
    </div>
  );
};

export default Dashboard;
