"use client";
import React, { useState } from "react";
import { useContextApi } from "../context/Context";
import CustomSelect from "../UI/reusableComponents/CustomSelect";
import { IBranches } from "../assets/interfaces";
import Claims from "./claims/page";
import Underwriting from "./premiums/page";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import CustomButton from "../UI/reusableComponents/CustomButton";

const Dashboard = () => {
  const {
    year: _year,
    setFromDate,
    setToDate,
    companys,
    setBranchCode,
    setCompany,
    years,
    component,
  }: any = useContextApi();

  const formattedCompanys: [] = companys.map((company: IBranches) => {
    return {
      label: company.organization_name,
      value: company.organization_code,
    };
  });

  const renderComponent = () => {
    switch (component) {
      case "Underwriting":
        return <Underwriting />;
      case "Claims":
        return <Claims />;
      default:
        break;
    }
  };

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const handleToDate = (event: any) => {
    const inputDate = event.target.value;
    let formattedMonth: any = "";
    const [year, month, day] = inputDate.split("-");
    if (month < 10) {
      formattedMonth = months[month.toString().slice(1) - 1];
    } else {
      formattedMonth = months[Number(month - 1)];
    }
    const formattedToDate = day + "-" + formattedMonth + "-" + year;

    setToDate(formattedToDate);
  };
  const handleFromDate = (event: any) => {
    const inputDate = event.target.value;
    let formattedMonth: any = "";
    const [year, month, day] = inputDate.split("-");
    if (month < 10) {
      formattedMonth = months[month.toString().slice(1) - 1];
    } else {
      formattedMonth = months[Number(month - 1)];
    }
    const formattedFromDate = day + "-" + formattedMonth + "-" + year;
    setFromDate(formattedFromDate);
  };

  return (
    <div className="p-[10px] mt-[20px] ">
      <div className="flex gap-2 items-center">
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
        <div className="flex flex-col mt-2">
          <label>From date</label>
          <input
            type="date"
            className={"w-[330px] h-[40px] border p-2 rounded-md"}
            onChange={handleFromDate}
          />
        </div>
        <div className="flex flex-col mt-2">
          <label>To date</label>
          <input
            type="date"
            className={"w-[330px] h-[40px] border p-2 rounded-md"}
            onChange={handleToDate}
          />
        </div>
      </div>

      {renderComponent()}
    </div>
  );
};

export default Dashboard;
