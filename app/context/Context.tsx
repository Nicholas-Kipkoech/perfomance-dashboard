"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { createContext } from "react";
import { IBimaData, IBranches, IClaimsData } from "../assets/interfaces";

const Context = createContext({});
const ContextProvider = ({ children }: any) => {
  const localUrl = "http://localhost:5002/bima/perfomance";
  const [branchCode, setBranchCode] = useState("");
  const [year, setYear] = useState(2023);
  const [years, setYears] = useState([]);
  const [bimaData, setBimaData] = useState<IBimaData[]>([]);
  const [claimsData, setClaimsData] = useState<IClaimsData[]>([]);
  const [companys, setCompanys] = useState<IBranches[]>([]);
  const [company, setCompany] = useState("Entire Company (INTRA)");

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
    const fetchOrgBranches = async () => {
      const { data } = await axios.get(`${localUrl}/branches`);
      setCompanys([
        { organization_name: "Entire Company", organization_code: "" },
        ...data.result,
      ]);
    };
    fetchOrgBranches();
  }, []);
  useEffect(() => {
    const fetchYears = async () => {
      const { data } = await axios.get(`${localUrl}/years`);
      setYears(data.result);
    };
    fetchYears();
  }, []);

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
    let directClients = 0;
    let intermediaryClients = 0;
    let nonMotorPremium = 0;
    let motorPremium = 0;

    bimaData.forEach((data) => {
      let total = 0;
      if (data.motorCode === "070" || data.motorCode === "080") {
        total =
          data.additional +
          data.facin +
          data.refund +
          data.renewals +
          data.newPolicies;
        motorPremium += total;
      } else {
        total =
          data.additional +
          data.facin +
          data.refund +
          data.renewals +
          data.newPolicies;
        nonMotorPremium += total;
      }

      let totalClients = data.clientsCount;
      if (data.clientCode === "15") {
        directClients += totalClients;
      } else if (data.clientCode === "25" || data.clientCode === "70") {
        intermediaryClients += totalClients;
      }
    });

    const totalPremium = bimaData.reduce((total: number, premium) => {
      return (
        total +
        premium.additional +
        premium.facin +
        premium.refund +
        premium.renewals +
        premium.newPolicies
      );
    }, 0);

    const newPoliciesPremium = bimaData.reduce((total: number, premium) => {
      return total + premium.newPolicies;
    }, 0);
    const renewals = bimaData.reduce((total: number, premium) => {
      return total + premium.renewals;
    }, 0);
    const reinsurance = bimaData.reduce((total: number, premium) => {
      return total + premium.facin;
    }, 0);
    const additionalPremium = bimaData.reduce((total: number, premium) => {
      return total + premium.additional;
    }, 0);
    const refundPremium = bimaData.reduce((total: number, premium) => {
      return total + premium.refund;
    }, 0);
    const commision = bimaData.reduce((total: number, premium) => {
      return total + premium.commision;
    }, 0);

    return {
      totalPremium,
      newPoliciesPremium,
      renewals,
      reinsurance,
      additionalPremium,
      refundPremium,
      commision,
      directClients,
      intermediaryClients,
      nonMotorPremium,
      motorPremium,
    };
  }
  const {
    totalPremium,
    newPoliciesPremium,
    renewals,
    reinsurance,
    additionalPremium,
    refundPremium,
    commision,
    directClients,
    intermediaryClients,
    nonMotorPremium,
    motorPremium,
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
        newPoliciesPremium,
        totalPremium,
        renewals,
        reinsurance,
        registeredClaims,
        outStandingClaims,
        claimPaid,
        additionalPremium,
        refundPremium,
        commision,
        directClients,
        intermediaryClients,
        nonMotorPremium,
        motorPremium,
        company,
        companys,
        setCompany,
        years,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useContextApi = () => useContext(Context);

export default ContextProvider;
