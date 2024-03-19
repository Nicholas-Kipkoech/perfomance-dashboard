"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { createContext } from "react";

interface IBimaData {
  totalPremium: number;
  branchCode: string;
  intermediaryCode: string;
}
const Context = createContext({});
const ContextProvider = ({ children }: any) => {
  const localUrl = "http://localhost:5002";
  const [branchCode, setBranchCode] = useState("");
  const [year, setYear] = useState(2024);
  const [bimaData, setBimaData] = useState<IBimaData[]>([]);

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
    <Context.Provider
      value={{
        setBranchCode,
        setYear,
        directPremium,
        intermediaryPremium,
        _totalPremium,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useContextApi = () => useContext(Context);

export default ContextProvider;
