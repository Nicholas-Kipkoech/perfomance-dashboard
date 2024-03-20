"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { createContext } from "react";

interface IBimaData {
  totalPremium: number;
  branchCode: string;
  intermediaryCode: string;
  noOfClients: number;
}
interface IClaimsData {
  claimsCount: number;
  claimsStatus: string;
  branchCode: string;
}
const Context = createContext({});
const ContextProvider = ({ children }: any) => {
  const localUrl = "http://localhost:5002/bima/perfomance";
  const [branchCode, setBranchCode] = useState("");
  const [year, setYear] = useState(2024);
  const [bimaData, setBimaData] = useState<IBimaData[]>([]);
  const [claimsData, setClaimsData] = useState<IClaimsData[]>([]);
  const [company, setCompany] = useState("Entire Company");

  useEffect(() => {
    const fetchBimaData = async () => {
      const { data } = await axios.get(
        `${localUrl}/underwriting?year=${year}&branchCode=${branchCode}`
      );
      setBimaData(data.result);
    };
    fetchBimaData();
  }, [year, branchCode]);

  useEffect(() => {
    const fetchClaims = async () => {
      const { data } = await axios.get(
        `${localUrl}/claims?year=${year}&branchCode=${branchCode}`
      );
      setClaimsData(data.result);
    };
    fetchClaims();
  }, [year, branchCode]);

  function calculatePremiums(bimaData: IBimaData[]) {
    let directPremium = 0;
    let intermediaryPremium = 0;
    let directClients = 0;
    let intermediaryClients = 0;

    bimaData.forEach((data) => {
      const totalPremium = data.totalPremium;
      const totalClients = data.noOfClients;
      if (data.intermediaryCode === "15") {
        directPremium += totalPremium;
        directClients += totalClients;
      } else if (
        data.intermediaryCode === "25" ||
        data.intermediaryCode === "70"
      ) {
        intermediaryPremium += totalPremium;
        intermediaryClients += totalClients;
      }
    });

    const _totalPremium = bimaData.reduce(
      (total: number, premium) => total + premium.totalPremium,
      0
    );
    const _totalClients = bimaData.reduce(
      (total: number, clients) => total + clients.noOfClients,
      0
    );

    return {
      directPremium,
      intermediaryPremium,
      _totalPremium,
      _totalClients,
      directClients,
      intermediaryClients,
    };
  }
  const {
    directPremium,
    intermediaryPremium,
    _totalPremium,
    _totalClients,
    directClients,
    intermediaryClients,
  } = calculatePremiums(bimaData);

  const calculateClaimsData = (claimsData: IClaimsData[]) => {
    let outStandingClaims = 0;
    let claimPaid = 0;

    claimsData.forEach((claims) => {
      const totalClaims = claims.claimsCount;
      if (claims.claimsStatus === "Closed") {
        claimPaid += totalClaims;
      } else if (
        claims.claimsStatus === "ReOpened" ||
        claims.claimsStatus === "Opened"
      ) {
        outStandingClaims += totalClaims;
      }
    });

    const registeredClaims = claimsData.reduce(
      (total: number, claims) => total + claims.claimsCount,
      0
    );
    return {
      registeredClaims,
      outStandingClaims,
      claimPaid,
    };
  };
  const { registeredClaims, outStandingClaims, claimPaid } =
    calculateClaimsData(claimsData);

  return (
    <Context.Provider
      value={{
        setBranchCode,
        year,
        setYear,
        directPremium,
        intermediaryPremium,
        _totalPremium,
        _totalClients,
        directClients,
        intermediaryClients,
        registeredClaims,
        outStandingClaims,
        claimPaid,
        company,
        setCompany,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useContextApi = () => useContext(Context);

export default ContextProvider;
