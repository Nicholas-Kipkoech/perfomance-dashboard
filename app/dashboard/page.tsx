"use client";
import React, { useEffect, useState } from "react";
import CustomCard from "../UI/reusableComponents/CustomCard";
import { Companies, Years } from "../data/BimaData";
import CustomSelect from "../UI/reusableComponents/CustomSelect";
import axios from "axios";

const Dashboard = () => {
  const [branchCode, setBranchCode] = useState("");
  const [year, setYear] = useState(2024);

  const formattedOptions = Years.map((record) => {
    return {
      label: `Year ${record.name}`,
      value: record.value,
    };
  });
  const formattedCompanies = Companies.map((company) => {
    return {
      label: company.name,
      value: company.org_code,
    };
  });

  interface IBimaData {
    totalPremium: number;
    branchCode: string;
    intermediaryCode: string;
  }

  const [bimaData, setBimaData] = useState<IBimaData[]>([]);

  const localUrl = "http://localhost:5002";

  useEffect(() => {
    const fetchBimaData = async () => {
      const { data } = await axios.get(
        `${localUrl}/bima/perfomance/underwriting?year=${year}&branchCode=${branchCode}`
      );
      setBimaData(data.result);
    };
    fetchBimaData();
  }, [year, branchCode]);

  function calculatePremiums(bimaData: IBimaData[]) {
    let directPremium = 0;
    let intermediaryPremium = 0;

    bimaData.forEach((data) => {
      const totalPremium = data.totalPremium;
      if (data.intermediaryCode === "15") {
        directPremium += totalPremium;
      } else if (
        data.intermediaryCode === "25" ||
        data.intermediaryCode === "70"
      ) {
        intermediaryPremium += totalPremium;
      }
    });
    const _totalPremium = bimaData.reduce(
      (total: number, premium) => total + premium.totalPremium,
      0
    );

    return { directPremium, intermediaryPremium, _totalPremium };
  }
  const { directPremium, intermediaryPremium, _totalPremium } =
    calculatePremiums(bimaData);
  return (
    <div className="p-[10px] mt-[20px]">
      <div className="flex justify-between items-center mb-2">
        <div className="flex gap-3">
          <CustomSelect
            className={"w-[300px]"}
            options={formattedOptions}
            onChange={(value: { value: any }) => setYear(value.value)}
            name={"Year"}
            placeholder="Select year"
          />
          <CustomSelect
            className={"w-[300px]"}
            options={formattedCompanies}
            onChange={(value: { value: string }) => setBranchCode(value.value)}
            name={"Company"}
            placeholder="Select company"
          />
        </div>
      </div>
      <div className="divide-y">
        <div className="flex flex-wrap gap-3 h-auto  overflow-auto  border-b-slate-800 p-2">
          <CustomCard name={"Total  Premium"} total={_totalPremium} />
          <CustomCard name={"Total Direct Premium"} total={directPremium} />
          <CustomCard
            name={"Intermediary Premium"}
            total={intermediaryPremium}
          />
        </div>

        {/* <div className="flex justify-between items-center">
          <p className="text-[25px] font-[700] p-[20px]">
            Monthly Distribution {title}
          </p>
          <div
            className="text-[16px] bg-[#cb7529] border h-[40px] w-[100px] flex justify-center items-center rounded-md text-white font-[700] cursor-pointer"
            onClick={() => setToggleComponent((prev) => !prev)}
          >
            {toggleComponent ? "View Chart" : "View Data"}
          </div>
        </div>
        {toggleComponent ? (
          <TableComponent total={totals} />
        ) : (
          <BarChartComponent title={title} total={totals} />
        )} */}
      </div>
    </div>
  );
};

export default Dashboard;
