"use client";
import React, { useState } from "react";
import CustomCard from "../UI/reusableComponents/CustomCard";
import { Years } from "../data/BimaData";
import { useContextApi } from "../context/Context";

const Dashboard = () => {
  const {
    _totalPremium: totalPremium,
    directPremium,
    intermediaryPremium,
    year: _year,
    setYear,
    directClients,
    _totalClients: totalClients,
    intermediaryClients,
    registeredClaims,
    outStandingClaims,
    claimPaid,
  }: any = useContextApi();
  const [active, setActive] = useState(null);

  const formattedOptions = Years.map((record) => {
    return {
      label: `Year ${record.name}`,
      value: record.value,
    };
  });
  const handleClickYear = (index: any) => {
    setActive(index);
  };

  return (
    <div className="p-[10px] mt-[20px]">
      <div className="flex justify-end gap-2">
        {formattedOptions.map((year, key) => (
          <p
            onClick={() => {
              setYear(year.value);
              handleClickYear(key);
            }}
            key={key}
            className={`border ${
              active === key || year.value === _year
                ? "bg-[#cb7529] text-white"
                : ""
            } h-[40px] flex items-center justify-center rounded-md cursor-pointer  w-[100px] `}
          >
            {year.value}
          </p>
        ))}
      </div>

      <div className="divide-y">
        <div className="flex flex-wrap gap-3 h-auto  overflow-auto  border-b-slate-800 p-2">
          <CustomCard name={"Total  Premium"} total={totalPremium} currency />
          <CustomCard
            name={"Total Direct Premium"}
            total={directPremium}
            currency
          />
          <CustomCard
            name={"Intermediary Premium"}
            total={intermediaryPremium}
            currency
          />
          <CustomCard name={"Total number of clients"} total={totalClients} />
          <CustomCard name={"Number of direct clients"} total={directClients} />
          <CustomCard
            name={"Number of intermediary"}
            total={intermediaryClients}
          />
          <CustomCard name={"Registered Claims"} total={registeredClaims} />
          <CustomCard name={"Outstanding claims"} total={outStandingClaims} />
          <CustomCard name={"Claim Paid"} total={claimPaid} />
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
