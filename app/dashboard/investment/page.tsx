"use client";

import { InvestmentContext } from "@/app/context/InvestmentContext";
import React, { useContext } from "react";
import * as XLSX from "xlsx";

const Investment = () => {
  const { investmentData, loading }: any = useContext(InvestmentContext);

  const handleDownloadExcel = (label: string, data: any) => {
    const formattedData = data.map((record: any) => ({
      "Asset Type": record.assetType,
      ...record.data.results.reduce((acc: any, item: any) => {
        acc["Amount"] = item.MT_AMT ?? 0;
        return acc;
      }, {}),
    }));

    if (!formattedData.length) {
      alert("No data available.");
      return;
    }

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    XLSX.utils.book_append_sheet(workbook, worksheet, label);
    XLSX.writeFile(workbook, `${label}_${Date.now()}.xlsx`);
  };

  const getSum = (data: any) => {
    return (
      data?.results?.reduce(
        (acc: number, item: any) => acc + (item.MT_AMT ?? 0),
        0
      ) || 0
    );
  };

  if (loading) {
    return <div className="text-center text-lg font-bold">Loading...</div>;
  }

  // Group by label (Month to date, Year to date, etc.)
  const groupedByLabel: Record<string, any[]> = {};
  investmentData.forEach((item: any) => {
    if (!groupedByLabel[item.label]) {
      groupedByLabel[item.label] = [];
    }
    groupedByLabel[item.label].push(item);
  });

  return (
    <div>
      <p className="flex justify-center font-bold text-[2.6rem]">
        Investment assets
      </p>
      <div className="flex flex-row items-center gap-10 mx-20 my-10">
        {Object.entries(groupedByLabel).map(([label, records]) => {
          const totalSum = records.reduce(
            (acc, { data }) => acc + getSum(data),
            0
          );

          return (
            <div
              key={label}
              onClick={() => handleDownloadExcel(label, records)}
              className="border shadow-lg rounded-xl p-6 flex flex-col items-center bg-white cursor-pointer hover:bg-gray-100 w-[28rem]"
            >
              <h2 className="text-2xl font-bold mb-4">{label}</h2>
              <div className="flex justify-between w-full py-2 mt-2 font-bold text-xl text-gray-800">
                <p>Total</p>
                <p>{Number(totalSum).toLocaleString()}</p>
              </div>
              <div className="w-full">
                {records.map(({ assetType, data }) => (
                  <div
                    key={assetType}
                    className="flex justify-between w-full py-2 border-b"
                  >
                    <p className="text-xm font-semibold">{assetType}</p>
                    <p className="text-[18px] font-bold">
                      {Number(getSum(data)).toLocaleString()}
                    </p>
                  </div>
                ))}
                {/* Total Sum */}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Investment;
