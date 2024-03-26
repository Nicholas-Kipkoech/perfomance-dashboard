"use client";
import React, { useEffect, useState } from "react";
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

  const [lastDayOfMonth, setLastDayOfMonth] = useState("");
  const [today, setToday] = useState("");

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

  const handleToDate = (date: any, dateString: any) => {
    const [day, month, year] = dateString.split("-");
    let formattedMonth: any = "";
    if (month < 10) {
      formattedMonth = months[month.toString().slice(1) - 1];
    } else {
      formattedMonth = months[Number(month - 1)];
    }
    const formattedToDate = day + "-" + formattedMonth + "-" + year;
    setToDate(formattedToDate);
  };

  const handleFromDate = (date: any, dateString: any) => {
    const [day, month, year] = dateString.split("-");
    let formattedMonth: any = "";
    if (month < 10) {
      formattedMonth = months[month.toString().slice(1) - 1];
    } else {
      formattedMonth = months[Number(month - 1)];
    }
    const formattedToDate = day + "-" + formattedMonth + "-" + year;
    setFromDate(formattedToDate);
  };

  useEffect(() => {
    const today = new Date();

    // Get the current month and year
    const currentMonth = today.getMonth() + 1; // Month starts from 0
    const currentYear = today.getFullYear();

    // Create a new Date object for the first day of the next month
    const nextMonthFirstDay = new Date(currentYear, currentMonth, 1);

    // Subtract one day from the first day of the next month to get the last day of the current month
    const lastDayOfMonth = new Date(nextMonthFirstDay.getTime() - 1);

    // Get the last day of the month
    const lastDay = lastDayOfMonth.getDate();

    // Format the date to include day, month, and year
    const formattedDate = `${lastDay}-${String(currentMonth).padStart(
      2,
      "0"
    )}-${currentYear}`;
    const formattedToday = `${today.getDate()}-${String(
      today.getMonth() + 1
    ).padStart(2, "0")}-${today.getFullYear()}`;
    setToday(formattedToday);
    setLastDayOfMonth(formattedDate);
  }, []);

  return (
    <div className="mt-[20px] ml-4 ">
      <div className="flex gap-2 items-center">
        <CustomSelect
          defaultValue={{ label: "Entire Company", value: "" }}
          options={formattedCompanys}
          onChange={(value: { value: string; label: string }) => {
            setBranchCode(value.value);
            setCompany(value.label);
          }}
          className="w-[330px] ml-3"
          name="Company"
        />
        <div className="flex flex-col mt-2">
          <label>From date</label>
          <DatePicker
            format={"DD-MM-YYYY"}
            placeholder={`${today}`}
            className={"w-[330px] h-[40px] border p-2 rounded-md"}
            onChange={handleFromDate}
          />
        </div>
        <div className="flex flex-col mt-2">
          <label>To date</label>
          <DatePicker
            format={"DD-MM-YYYY"}
            placeholder={`${lastDayOfMonth}`}
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
