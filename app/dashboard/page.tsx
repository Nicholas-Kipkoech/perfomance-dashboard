"use client";
import React, { useEffect, useState } from "react";
import { useContextApi } from "../context/Context";
import CustomSelect from "../UI/reusableComponents/CustomSelect";
import { IBranches } from "../assets/interfaces";
import Claims from "./claims/page";
import Underwriting from "./premiums/page";
import Finance from "./finance/page";
import { DatePicker, Spin } from "antd";
import CustomButton from "../UI/reusableComponents/CustomButton";
import { LoadingOutlined } from "@ant-design/icons";

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
const Dashboard = () => {
  const {
    year: _year,
    setFromDate,
    fromDate,
    toDate: _toDate,
    setToDate,
    companys,
    setBranchCode,
    setCompany,
    component,
  }: any = useContextApi();

  const [lastDayOfMonth, setLastDayOfMonth] = useState("");
  const [today, setToday] = useState("");
  const [fmDate, setFmDate] = useState("");
  const [toDate, setTdDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [timeoutId, setTimeoutId] = useState<any>(null);

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
      case "Finance":
        return <Finance />;
      default:
        break;
    }
  };

  const handleToDate = (date: any, dateString: any) => {
    const [day, month, year] = dateString.split("-");
    let formattedMonth: any = "";
    if (month < 10) {
      formattedMonth = months[month.toString().slice(1) - 1];
    } else {
      formattedMonth = months[Number(month - 1)];
    }
    const formattedToDate = day + "-" + formattedMonth + "-" + year;
    setTdDate(formattedToDate);
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
    setFmDate(formattedToDate);
  };

  const handleRunReports = () => {
    setLoading(true);
    const id = setTimeout(() => {
      setLoading(false); // After 2 seconds, set loading to false
    }, 3000);
    setTimeoutId(id); // Store the timeout ID
    setFromDate(fmDate);
    setToDate(toDate);
  };

  useEffect(() => {
    return () => {
      // Cleanup function to clear timeout when component unmounts
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

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

  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 60,
        color: "#cb7229",
      }}
      spin
    />
  );

  return (
    <div className="mt-[20px] ml-4">
      <div className="top-0 sticky z-0 flex gap-2 items-center">
        <CustomSelect
          defaultValue={{ label: "Entire Company", value: "" }}
          options={formattedCompanys}
          onChange={(value: { value: string; label: string }) => {
            setBranchCode(value.value);
            setCompany(value.label);
            handleRunReports();
          }}
          className="w-[330px] ml-3"
          name="Company"
        />
        <div className="flex flex-col mt-2">
          <label>From date</label>
          <DatePicker
            format={"DD-MM-YYYY"}
            placeholder={`${today}`}
            className={"w-[250px] h-[40px] border p-2 rounded-md"}
            onChange={handleFromDate}
          />
        </div>
        <div className="flex flex-col mt-2">
          <label>To date</label>
          <DatePicker
            format={"DD-MM-YYYY"}
            placeholder={`${lastDayOfMonth}`}
            className={"w-[250px] h-[40px] border p-2 rounded-md"}
            onChange={handleToDate}
          />
        </div>
        <CustomButton
          name={loading ? "Running..." : "Run"}
          disabled={loading}
          className={
            "bg-[#cb7229] text-white h-[40px] w-[152px] flex justify-center items-center mt-8 rounded-md"
          }
          onClick={handleRunReports}
        />
      </div>
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <div className="flex flex-col gap-2">
            <Spin indicator={antIcon} />{" "}
            <p className="text-[#cb7229]">Fetching data.....</p>
          </div>
        </div>
      ) : (
        renderComponent()
      )}
    </div>
  );
};

export default Dashboard;
