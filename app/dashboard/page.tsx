"use client";
import React, { useEffect, useState } from "react";
import CustomCard from "../UI/reusableComponents/CustomCard";
import { BimaData } from "../data/BimaData";
import BarChartComponent from "../UI/charts/Barchart";
import TableComponent from "../UI/tables/Table";
import CustomSelect from "../UI/reusableComponents/CustomSelect";

const Dashboard = () => {
  const [title, setTitle] = useState("Total number of clients");
  const [totals, setTotals] = useState(0);

  const [toggleComponent, setToggleComponent] = useState(false);

  useEffect(() => {
    const currentTotals = BimaData.reduce((acc, total) => {
      return acc + total.total;
    }, 0);
    setTotals(currentTotals);
  }, []);

  const formattedOptions = BimaData.map((record) => {
    return {
      label: `Year ${record.year}`,
      value: record.year,
    };
  });

  return (
    <div className="p-[10px] mt-[20px]">
      <CustomSelect className={"w-[300px]"} options={formattedOptions} />
      <div className="divide-y">
        <div className="flex flex-wrap gap-3 h-auto  overflow-auto  border-b-slate-800 p-2">
          {BimaData.map((record, key) => (
            <CustomCard
              key={key}
              name={record.name}
              total={record.total}
              active={title === record.name}
              onClick={() => setTitle(record.name)}
            />
          ))}
        </div>

        <div className="flex justify-between items-center">
          <p className="text-[30px] font-[700] p-[20px]">
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
        )}
      </div>
    </div>
  );
};

export default Dashboard;
