"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { createContext } from "react";
import {
  IBimaData,
  IBranches,
  IClaimsData,
  IClients,
  IOutstandingClaims,
  IProduction,
  IRegisteredClaims,
  IUndebitedPolicies,
  IUnrenewedPolicies,
} from "../assets/interfaces";

const Context = createContext({});
const ContextProvider = ({ children }: any) => {
  const localUrl = "http://localhost:5002/bima/perfomance";
  const [branchCode, setBranchCode] = useState("");
  const [year, setYear] = useState(2023);
  const [years, setYears] = useState([]);
  const [bimaData, setBimaData] = useState<IBimaData[]>([]);
  const [claimsData, setClaimsData] = useState<IClaimsData[]>([]);
  const [registeredClaims, setRegisteredClaims] = useState<IRegisteredClaims[]>(
    []
  );
  const [outstandingClaims, setOutstandingClaims] = useState<
    IOutstandingClaims[]
  >([]);
  const [productionData, setProductionData] = useState<IProduction[]>([]);
  const [clients, setClients] = useState<IClients[]>([]);
  const [unrenewedPolicies, setUnrenewedPolicies] = useState<
    IUnrenewedPolicies[]
  >([]);
  const [undebitedPolicies, setUndebitedPolicies] = useState<
    IUndebitedPolicies[]
  >([]);
  const [companys, setCompanys] = useState<IBranches[]>([]);
  const [company, setCompany] = useState("Entire Company (INTRA)");
  const [component, setComponent] = useState("Underwriting");

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
      const sortedData = data.result.sort((a: any, b: any) => b.year - a.year);
      setYears(sortedData);
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

  useEffect(() => {
    const fetchRegisteredClaims = async () => {
      const { data } = await axios.get(
        `${localUrl}/registered-claims?year=${year}&branchCode=${branchCode}`
      );
      setRegisteredClaims(data.result);
    };
    fetchRegisteredClaims();
  }, [year, branchCode]);
  useEffect(() => {
    const fetchOutStandingClaims = async () => {
      const { data } = await axios.get(
        `${localUrl}/outstanding-claims?year=31-Dec-${year}&branchCode=${branchCode}`
      );
      setOutstandingClaims(data.result);
    };
    fetchOutStandingClaims();
    const _year = `31-Dec-${year}`;
    console.log(_year);
  }, [year, branchCode]);
  useEffect(() => {
    const fetchProductionPerUnit = async () => {
      const { data } = await axios.get(
        `${localUrl}/production?year=${year}&branchCode=${branchCode}`
      );
      setProductionData(data.result);
    };
    fetchProductionPerUnit();
  }, [year, branchCode]);

  useEffect(() => {
    const fetchEntityClients = async () => {
      const { data } = await axios.get(
        `${localUrl}/clients?branchCode=${branchCode}&year=${year}`
      );
      setClients(data.result);
    };
    fetchEntityClients();
  }, [year, branchCode]);
  useEffect(() => {
    const fetchUnrenewedPolicies = async () => {
      const { data } = await axios.get(
        `${localUrl}/unrenewed-policies?branchCode=${branchCode}&year=${year}`
      );
      setUnrenewedPolicies(data.result);
    };
    fetchUnrenewedPolicies();
  }, [year, branchCode]);
  useEffect(() => {
    const fetchUndebitedPolicies = async () => {
      const { data } = await axios.get(
        `${localUrl}/undebited-policies?branchCode=${branchCode}&year=${year}`
      );
      setUndebitedPolicies(data.result);
    };
    fetchUndebitedPolicies();
  }, [year, branchCode]);

  function calculatePremiums(bimaData: IBimaData[]) {
    let directClients = 0;

    let nonMotorPremium = 0;
    let motorPremium = 0;
    let directPremium = 0;
    let intermediaryPremium = 0;
    bimaData.forEach((data) => {
      let total = 0;
      if (data.renewalCode === "000") {
        total =
          data.additional +
          data.facin +
          data.refund +
          data.renewals +
          data.newPolicies;
        intermediaryPremium += total;
      } else if (data.clientCode === "15") {
        total =
          data.additional +
          data.facin +
          data.refund +
          data.renewals +
          data.newPolicies;
        directPremium += total;
      }
    });

    bimaData.forEach((data) => {
      let total = 0;
      if (data.clientCode === "25" || data.clientCode === "70") {
        total =
          data.additional +
          data.facin +
          data.refund +
          data.renewals +
          data.newPolicies;
        intermediaryPremium += total;
      } else if (data.clientCode === "15") {
        total =
          data.additional +
          data.facin +
          data.refund +
          data.renewals +
          data.newPolicies;
        directPremium += total;
      }
    });

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
      reinsurance,
      additionalPremium,
      refundPremium,
      commision,
      directClients,
      nonMotorPremium,
      motorPremium,
      intermediaryPremium,
      directPremium,
    };
  }
  const {
    totalPremium,
    reinsurance,
    additionalPremium,
    refundPremium,
    commision,
    directClients,
    nonMotorPremium,
    motorPremium,
    intermediaryPremium,
    directPremium,
  } = calculatePremiums(bimaData);

  const calculateClaimsData = (claimsData: IClaimsData[]) => {
    const totalClaimPaid = claimsData.reduce(
      (total: number, claims) => total + claims.amountPaid,
      0
    );
    const totalClaims = claimsData.reduce(
      (total: number, claims) => total + claims.totalNumber,
      0
    );

    return { totalClaimPaid, totalClaims };
  };
  const { totalClaimPaid, totalClaims } = calculateClaimsData(claimsData);

  const calculateProductionData = (productionData: IProduction[]) => {
    const totalRenewals = productionData.reduce(
      (total: number, production) => total + Number(production.renewals),
      0
    );
    const totalNewBusiness = productionData.reduce(
      (total: number, production) => total + Number(production.newBusiness),
      0
    );
    return { totalNewBusiness, totalRenewals };
  };
  const { totalNewBusiness, totalRenewals } =
    calculateProductionData(productionData);

  const calculateClientsData = (clients: IClients[]) => {
    let broker = 0;
    let agents = 0;

    clients.forEach((client) => {
      const totalClients = client.totalClients;
      if (client.clientCode === "70") {
        broker += totalClients;
      } else if (client.clientCode === "25") {
        agents += totalClients;
      }
    });
    const allClients = clients.reduce(
      (total: number, client) => total + client.totalClients,
      0
    );

    return {
      broker,
      agents,
      allClients,
    };
  };
  const calculateRegisteredClaims = (registeredClaims: IRegisteredClaims[]) => {
    const totalRegisteredClaims = registeredClaims.reduce(
      (total: number, claims) => total + claims.totalNumber,
      0
    );
    return {
      totalRegisteredClaims,
    };
  };
  const { totalRegisteredClaims } = calculateRegisteredClaims(registeredClaims);

  const { broker, agents, allClients } = calculateClientsData(clients);

  const calculateOutstandingClaims = (
    outstandingClaims: IOutstandingClaims[]
  ) => {
    const totalOutstanding = outstandingClaims.reduce(
      (total: number, outstanding) => total + outstanding.totalAmount,
      0
    );
    const totalCount = outstandingClaims.reduce(
      (total: number, outstanding) => total + outstanding.count,
      0
    );
    return {
      totalOutstanding,
      totalCount,
    };
  };
  const calculateUnrenewedPolicies = (
    unrenewedPolicies: IUnrenewedPolicies[]
  ) => {
    const nonMotorUnrenewed = unrenewedPolicies.reduce(
      (total: number, unrenewed) => total + unrenewed.nonMotorAmount,
      0
    );
    const motorRenewed = unrenewedPolicies.reduce(
      (total: number, unrenewed) => total + unrenewed.motorAmount,
      0
    );
    return {
      nonMotorUnrenewed,
      motorRenewed,
    };
  };
  const calculateUndebitedPolicies = (
    undebitedPolicies: IUndebitedPolicies[]
  ) => {
    let motorUndebited = 0;
    let nonMotorUndebited = 0;
    undebitedPolicies.forEach((policy) => {
      const totalPremium = policy.totalPremium;
      if (policy.premiumCode === "080" || policy.premiumCode === "070") {
        motorUndebited += totalPremium;
      } else {
        nonMotorUndebited += totalPremium;
      }
    });
    return { nonMotorUndebited, motorUndebited };
  };
  const { nonMotorUndebited, motorUndebited } =
    calculateUndebitedPolicies(undebitedPolicies);

  const { totalOutstanding, totalCount } =
    calculateOutstandingClaims(outstandingClaims);
  const { nonMotorUnrenewed, motorRenewed } =
    calculateUnrenewedPolicies(unrenewedPolicies);

  return (
    <Context.Provider
      value={{
        setBranchCode,
        year,
        setYear,
        totalPremium,
        totalNewBusiness,
        totalRenewals,
        reinsurance,
        totalClaimPaid,
        totalClaims,
        additionalPremium,
        refundPremium,
        commision,
        directClients,
        allClients,
        broker,
        agents,
        nonMotorPremium,
        motorPremium,
        intermediaryPremium,
        directPremium,
        company,
        companys,
        setCompany,
        years,
        component,
        setComponent,
        totalRegisteredClaims,
        totalOutstanding,
        totalCount,
        nonMotorUnrenewed,
        motorRenewed,
        nonMotorUndebited,
        motorUndebited,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useContextApi = () => useContext(Context);

export default ContextProvider;
