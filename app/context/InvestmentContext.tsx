"use client";
import axios from "axios";
import React, { useEffect, useState, createContext } from "react";

export const InvestmentContext = createContext({});

const InvestmentContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const getDateRanges = () => {
    const today = new Date();

    // First & last day of the current month
    const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
    const monthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    // First day of January
    const januaryStart = new Date(today.getFullYear(), 0, 1);

    // Last day of the year (December 31st)
    const yearEnd = new Date(today.getFullYear(), 11, 31);

    return {
      monthToDate: { from: monthStart, to: monthEnd },
      januaryToDate: { from: januaryStart, to: monthEnd }, // Jan 1 → Last day of this month
      yearToDate: { from: januaryStart, to: yearEnd }, // Jan 1 → Dec 31
    };
  };

  const BASE_URL = "http://192.168.1.112:5004/bima/perfomance/investment";
  const ASSET_TYPES = ["FIXED DEPOSITS", "TREASURY BONDS"];

  const fetchInvestmentData = async () => {
    const { monthToDate, januaryToDate, yearToDate } = getDateRanges();

    const formatDate = (date: Date) =>
      date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });

    const dateRanges = [
      {
        label: `${formatDate(monthToDate.from)} to ${formatDate(
          monthToDate.to
        )}`,
        from: formatDate(monthToDate.from),
        to: formatDate(monthToDate.to),
      },
      {
        label: `${formatDate(januaryToDate.from)} to ${formatDate(
          januaryToDate.to
        )}`,
        from: formatDate(januaryToDate.from),
        to: formatDate(januaryToDate.to),
      },
      {
        label: `${formatDate(yearToDate.from)} to ${formatDate(yearToDate.to)}`,
        from: formatDate(yearToDate.from),
        to: formatDate(yearToDate.to),
      },
    ];

    try {
      const requests = ASSET_TYPES.flatMap((assetType) =>
        dateRanges.map(({ label, from, to }) =>
          axios
            .get(BASE_URL, {
              params: { p_asset: assetType, p_fm_dt: from, p_to_dt: to },
            })
            .then((response) => ({
              assetType,
              label,
              data: response.data,
            }))
        )
      );

      return await Promise.all(requests);
    } catch (error: any) {
      console.error("Error fetching data:", error.message);
      return [];
    }
  };

  const [investmentData, setInvestmentData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchInvestmentData().then((data) => {
      setInvestmentData(data);
      setLoading(false);
    });
  }, []);

  return (
    <InvestmentContext.Provider value={{ investmentData, loading }}>
      {children}
    </InvestmentContext.Provider>
  );
};

export default InvestmentContextProvider;
