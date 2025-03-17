"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { createContext } from "react";
import { IBranches, IRegisteredClaims } from "../assets/interfaces";
import { LOCAL_URL } from "./database-connect";
import { getDates } from "../dashboard/premiums/helpers";

export const ClaimsContext = createContext({});
const ClaimsContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { currentMonth } = getDates();

  const [claimsData, setClaimsData] = useState([]);
  const [loadingClaimsData, setLoadingClaimsData] = useState(false);
  const [fromDate, setFromDate] = useState(currentMonth.startDate);
  const [toDate, setToDate] = useState(currentMonth.endDate);
  const [branchCode, setBranchCode] = useState("");
  const [registeredClaims, setRegisteredClaims] = useState<IRegisteredClaims[]>(
    []
  );
  const [loadingRegisteredClaims, setLoadingRegisteredClaims] = useState(false);
  const [outstandingClaims, setOutstandingClaims] = useState([]);
  const [loadingOutstandingClaims, setLoadingOutstandingClaims] =
    useState(false);

  const [company, setCompany] = useState("INTRA");
  const [companys, setCompanys] = useState<IBranches[]>([]);

  const [salvages, setSalvages] = useState([]);
  const [loadingSalvages, setLoadingSalvages] = useState(false);
  const [cmLossRatio, setCmLossRatio] = useState([]);
  const [loadingCmLossRatio, setLoadingCmLossRatio] = useState(false);

  const [loadingData, setLoadingData] = useState(false);

  useEffect(() => {
    setLoadingClaimsData(true);
    axios
      .get(
        `${LOCAL_URL}/claims?fromDate=${fromDate}&toDate=${toDate}&branchCode=${branchCode}`
      )
      .then((response) => {
        setClaimsData(response.data.result);
      })
      .catch((error) => {
        console.error("Error fetching claims", error);
      })
      .finally(() => {
        setLoadingClaimsData(false);
      });
  }, [fromDate, toDate, branchCode]);

  useEffect(() => {
    setLoadingRegisteredClaims(true);
    axios
      .get(
        `${LOCAL_URL}/registered-claims?fromDate=${fromDate}&toDate=${toDate}&branchCode=${branchCode}`
      )
      .then((response) => {
        setRegisteredClaims(response.data.result);
      })
      .catch((error) => {
        console.error("Error fetching registered-claims", error);
      })
      .finally(() => {
        setLoadingRegisteredClaims(false);
      });
  }, [fromDate, toDate, branchCode]);

  useEffect(() => {
    setLoadingOutstandingClaims(true);
    axios
      .get(
        `${LOCAL_URL}/outstanding-claims?fromDate=${fromDate}&toDate=${toDate}&branchCode=${branchCode}`
      )
      .then((response) => {
        setOutstandingClaims(response.data.result);
      })
      .catch((error) => {
        console.error("Error fetching outstanding-claims", error);
      })
      .finally(() => {
        setLoadingOutstandingClaims(false);
      });
  }, [fromDate, toDate, branchCode]);

  useEffect(() => {
    setLoadingSalvages(true);
    axios
      .get(
        `${LOCAL_URL}/salvages?fromDate=${fromDate}&toDate=${toDate}&branchCode=${branchCode}`
      )
      .then((response) => {
        setSalvages(response.data.result);
      })
      .catch((error) => {
        console.error("Error fetching salvages", error);
      })
      .finally(() => {
        setLoadingSalvages(false);
      });
  }, [fromDate, toDate, branchCode]);

  useEffect(() => {
    setLoadingCmLossRatio(true);
    axios
      .get(
        `${LOCAL_URL}/cm-loss-ratio2?fromDate=${fromDate}&toDate=${toDate}&branchCode=${branchCode}`
      )
      .then((response) => {
        setCmLossRatio(response.data.result);
      })
      .catch((error) => {
        console.error("Error fetching loss ratio", error);
      })
      .finally(() => {
        setLoadingCmLossRatio(false);
      });
  }, [fromDate, toDate, branchCode]);

  const fetchClaimsData = async (
    fromDate: string,
    toDate: string,
    branchCode: string
  ) => {
    setLoadingData(true);
    try {
      const [orgBranchesResponse] = await Promise.all([
        axios.get(`${LOCAL_URL}/branches`),
      ]);

      setCompanys([
        { organization_name: "Entire Company", organization_code: "" },
        ...orgBranchesResponse.data.result,
      ]);

      setLoadingData(false);
    } catch (error) {
      setLoadingData(false);

      console.error("Error fetching data", error);
    }
  };

  const calculateClaimsData = (claimsData: any) => {
    let motorPaidClaims = 0;
    let nonMotorPaidClaims = 0;

    claimsData.forEach((claims: any) => {
      let total = claims.paidAmount;
      if (claims.motorCode === "070" || claims.motorCode === "080") {
        motorPaidClaims += total;
      } else {
        nonMotorPaidClaims += total;
      }
    });

    const totalClaimPaid = claimsData.reduce(
      (total: number, claims: any) => total + claims.paidAmount,
      0
    );

    return { totalClaimPaid, nonMotorPaidClaims, motorPaidClaims };
  };

  const { totalClaimPaid, motorPaidClaims, nonMotorPaidClaims } =
    calculateClaimsData(claimsData);

  const calculateRegisteredClaims = (registeredClaims: IRegisteredClaims[]) => {
    let motorRegisteredClaims = 0;
    let nonMotorRegisteredClaims = 0;
    const totalRegisteredClaims = registeredClaims.reduce(
      (total: number, claims) => total + claims.totalProvision,
      0
    );

    registeredClaims.forEach((claim: any) => {
      let total = claim.totalProvision;
      if (claim.motorCode === "070" || claim.motorCode === "080") {
        motorRegisteredClaims += total;
      } else {
        nonMotorRegisteredClaims += total;
      }
    });

    return {
      totalRegisteredClaims,
      nonMotorRegisteredClaims,
      motorRegisteredClaims,
    };
  };
  const {
    totalRegisteredClaims,
    nonMotorRegisteredClaims,
    motorRegisteredClaims,
  } = calculateRegisteredClaims(registeredClaims);

  const calculateOutstandingClaims = (outstandingClaims: any) => {
    let motorOutstanding = 0;
    let nonMotorOutstanding = 0;
    outstandingClaims.forEach((outstanding: any) => {
      let total = outstanding.totalProvision;
      if (outstanding.motorCode === "070" || outstanding.motorCode === "080") {
        motorOutstanding += total;
      } else {
        nonMotorOutstanding += total;
      }
    });
    const totalOutstanding = outstandingClaims.reduce(
      (total: number, outstanding: any) => total + outstanding.totalProvision,
      0
    );

    return {
      totalOutstanding,
      motorOutstanding,
      nonMotorOutstanding,
    };
  };

  const calculateSalvages = (salvages: any) => {
    const totalSalvages = salvages.reduce(
      (total: number, salvage: any) => total + salvage.receiptAmount,
      0
    );
    return { totalSalvages };
  };

  const { totalSalvages } = calculateSalvages(salvages);

  const { totalOutstanding, motorOutstanding, nonMotorOutstanding } =
    calculateOutstandingClaims(outstandingClaims);

  const filteredLossRation = cmLossRatio.filter((claim: any) => {
    return claim.cm_order_no === 10;
  });

  return (
    <ClaimsContext.Provider
      value={{
        fromDate,
        toDate,
        totalClaimPaid,
        loadingClaimsData,
        totalRegisteredClaims,
        loadingRegisteredClaims,
        totalOutstanding,
        loadingOutstandingClaims,
        totalSalvages,
        loadingSalvages,
        nonMotorRegisteredClaims,
        motorRegisteredClaims,
        filteredLossRation,
        loadingCmLossRatio,
        motorOutstanding,
        motorPaidClaims,
        nonMotorPaidClaims,
        nonMotorOutstanding,
        loadingData,
        companys,
        outstandingClaims,
        cmLossRatio,
        claimsData,
        setCompany,
        fetchClaimsData,
        setFromDate,
        setToDate,
      }}
    >
      {children}
    </ClaimsContext.Provider>
  );
};

export default ClaimsContextProvider;
