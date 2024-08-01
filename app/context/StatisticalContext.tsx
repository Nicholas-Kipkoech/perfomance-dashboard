'use client'
import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'
import { LOCAL_URL } from './database-connect'
import { getDates } from '../dashboard/premiums/helpers'

export const StatisticalContext = createContext({})

const StatisticalProvider = ({ children }: { children: React.ReactNode }) => {
  const { currentYear, lastYear } = getDates()

  const [fromDate23, setFromDate23] = useState(lastYear.startDate)
  const [toDate23, setToDate23] = useState(lastYear.endDate)
  const [fromDate, setFromDate] = useState(currentYear.startDate)
  const [toDate, setToDate] = useState(currentYear.endDate)
  const [branchCode, setBranchCode] = useState('')

  // States for data and loading status
  const [premiums2024, setPremiums2024] = useState([])
  const [loadingPremiums2024, setLoadingPremiums2024] = useState(false)

  const [premiums2023, setPremiums2023] = useState([])
  const [loadingPremiums2023, setLoadingPremiums2023] = useState(false)

  const [claims2023, setClaims2023] = useState([])
  const [loadingClaims2023, setLoadingClaims2023] = useState(false)

  const [claims2024, setClaims2024] = useState([])
  const [loadingClaims2024, setLoadingClaims2024] = useState(false)

  const [outstandingClaims23, setOutstandingClaims23] = useState([])
  const [loadingOutstandingClaims23, setLoadingOutstandingClaims23] = useState(
    false,
  )

  const [outstandingClaims24, setOutstandingClaims24] = useState([])
  const [loadingOutstandingClaims24, setLoadingOutstandingClaims24] = useState(
    false,
  )

  const [riCession23, setRiCession23] = useState([])
  const [loadingRiCession23, setLoadingRiCession23] = useState(false)

  const [riCession24, setRiCession24] = useState([])
  const [loadingRiCession24, setLoadingRiCession24] = useState(false)

  const [riPaidCession23, setRiPaidCession23] = useState([])
  const [loadingRiPaidCession23, setLoadingRiPaidCession23] = useState(false)

  const [riPaidCession24, setRiPaidCession24] = useState([])
  const [loadingRiPaidCession24, setLoadingRiPaidCession24] = useState(false)

  const [managementExpenses23, setManagementExpenses23] = useState([])
  const [
    loadingManagementExpenses23,
    setLoadingManagementExpenses23,
  ] = useState(false)

  const [managementExpenses24, setManagementExpenses24] = useState([])
  const [
    loadingManagementExpenses24,
    setLoadingManagementExpenses24,
  ] = useState(false)

  const [
    riOutstandingCessionReport23,
    setRiOutstandingCessionReport23,
  ] = useState([])
  const [
    loadingRiOutstandingCessionReport23,
    setLoadingRiOutstandingCessionReport23,
  ] = useState(false)

  const [
    riOutstandingCessionReport24,
    setRiOutstandingCessionReport24,
  ] = useState([])
  const [
    loadingRiOutstandingCessionReport24,
    setLoadingRiOutstandingCessionReport24,
  ] = useState(false)

  useEffect(() => {
    setLoadingPremiums2024(true)
    axios
      .get(
        `${LOCAL_URL}/underwriting?fromDate=${fromDate}&toDate=${toDate}&branchCode=${branchCode}`,
      )
      .then((response) => {
        setPremiums2024(response.data.result)
      })
      .catch((error) => {
        console.error('Error fetching premiums 2024', error)
      })
      .finally(() => {
        setLoadingPremiums2024(false)
      })
  }, [fromDate, toDate, branchCode])

  useEffect(() => {
    setLoadingPremiums2023(true)
    axios
      .get(
        `${LOCAL_URL}/underwriting?fromDate=${fromDate23}&toDate=${toDate23}&branchCode=${branchCode}`,
      )
      .then((response) => {
        setPremiums2023(response.data.result)
      })
      .catch((error) => {
        console.error('Error fetching premiums 2023', error)
      })
      .finally(() => {
        setLoadingPremiums2023(false)
      })
  }, [fromDate23, toDate23, branchCode])

  useEffect(() => {
    setLoadingClaims2023(true)
    axios
      .get(
        `${LOCAL_URL}/claims?fromDate=${fromDate23}&toDate=${toDate23}&branchCode=${branchCode}`,
      )
      .then((response) => {
        setClaims2023(response.data.result)
      })
      .catch((error) => {
        console.error('Error fetching claims 2023', error)
      })
      .finally(() => {
        setLoadingClaims2023(false)
      })
  }, [fromDate23, toDate23, branchCode])

  useEffect(() => {
    setLoadingClaims2024(true)
    axios
      .get(
        `${LOCAL_URL}/claims?fromDate=${fromDate}&toDate=${toDate}&branchCode=${branchCode}`,
      )
      .then((response) => {
        setClaims2024(response.data.result)
      })
      .catch((error) => {
        console.error('Error fetching claims 2024', error)
      })
      .finally(() => {
        setLoadingClaims2024(false)
      })
  }, [fromDate, toDate, branchCode])

  useEffect(() => {
    setLoadingOutstandingClaims23(true)
    axios
      .get(
        `${LOCAL_URL}/outstanding-claims?branchCode=${branchCode}&toDate=${toDate23}&fromDate=${fromDate23}`,
      )
      .then((response) => {
        setOutstandingClaims23(response.data.result)
      })
      .catch((error) => {
        console.error('Error fetching outstanding claims 2023', error)
      })
      .finally(() => {
        setLoadingOutstandingClaims23(false)
      })
  }, [fromDate23, toDate23, branchCode])

  useEffect(() => {
    setLoadingOutstandingClaims24(true)
    axios
      .get(
        `${LOCAL_URL}/outstanding-claims?branchCode=${branchCode}&toDate=${toDate}&fromDate=${fromDate}`,
      )
      .then((response) => {
        setOutstandingClaims24(response.data.result)
      })
      .catch((error) => {
        console.error('Error fetching outstanding claims 2024', error)
      })
      .finally(() => {
        setLoadingOutstandingClaims24(false)
      })
  }, [fromDate, toDate, branchCode])

  useEffect(() => {
    setLoadingRiCession23(true)
    axios
      .get(
        `${LOCAL_URL}/ri-cessions?fromDate=${fromDate23}&toDate=${toDate23}&branchCode=${branchCode}`,
      )
      .then((response) => {
        setRiCession23(response.data.result)
      })
      .catch((error) => {
        console.error('Error fetching RI cession 2023', error)
      })
      .finally(() => {
        setLoadingRiCession23(false)
      })
  }, [fromDate23, toDate23, branchCode])

  useEffect(() => {
    setLoadingRiCession24(true)
    axios
      .get(
        `${LOCAL_URL}/ri-cessions?fromDate=${fromDate}&toDate=${toDate}&branchCode=${branchCode}`,
      )
      .then((response) => {
        setRiCession24(response.data.result)
      })
      .catch((error) => {
        console.error('Error fetching RI cession 2024', error)
      })
      .finally(() => {
        setLoadingRiCession24(false)
      })
  }, [fromDate, toDate, branchCode])

  useEffect(() => {
    setLoadingRiPaidCession23(true)
    axios
      .get(
        `${LOCAL_URL}/ri-paid-cession-sum?fromDate=${fromDate23}&toDate=${toDate23}&branchCode=${branchCode}`,
      )
      .then((response) => {
        setRiPaidCession23(response.data.result)
      })
      .catch((error) => {
        console.error('Error fetching RI paid cession 2023', error)
      })
      .finally(() => {
        setLoadingRiPaidCession23(false)
      })
  }, [fromDate23, toDate23, branchCode])

  useEffect(() => {
    setLoadingRiPaidCession24(true)
    axios
      .get(
        `${LOCAL_URL}/ri-paid-cession-sum?fromDate=${fromDate}&toDate=${toDate}&branchCode=${branchCode}`,
      )
      .then((response) => {
        setRiPaidCession24(response.data.result)
      })
      .catch((error) => {
        console.error('Error fetching RI paid cession 2024', error)
      })
      .finally(() => {
        setLoadingRiPaidCession24(false)
      })
  }, [fromDate, toDate, branchCode])

  useEffect(() => {
    setLoadingManagementExpenses23(true)
    axios
      .get(
        `${LOCAL_URL}/management-expenses?fromDate=${fromDate23}&toDate=${toDate23}&branchCode=${branchCode}`,
      )
      .then((response) => {
        setManagementExpenses23(response.data.result)
      })
      .catch((error) => {
        console.error('Error fetching management expenses 2023', error)
      })
      .finally(() => {
        setLoadingManagementExpenses23(false)
      })
  }, [fromDate23, toDate23, branchCode])

  useEffect(() => {
    setLoadingManagementExpenses24(true)
    axios
      .get(
        `${LOCAL_URL}/management-expenses?fromDate=${fromDate}&toDate=${toDate}&branchCode=${branchCode}`,
      )
      .then((response) => {
        setManagementExpenses24(response.data.result)
      })
      .catch((error) => {
        console.error('Error fetching management expenses 2024', error)
      })
      .finally(() => {
        setLoadingManagementExpenses24(false)
      })
  }, [fromDate, toDate, branchCode])

  useEffect(() => {
    setLoadingRiOutstandingCessionReport23(true)
    axios
      .get(
        `${LOCAL_URL}/ri-outstanding-cession-report?toDate=${toDate23}&branchCode=${branchCode}`,
      )
      .then((response) => {
        setRiOutstandingCessionReport23(response.data.result)
      })
      .catch((error) => {
        console.error(
          'Error fetching RI outstanding cession report 2023',
          error,
        )
      })
      .finally(() => {
        setLoadingRiOutstandingCessionReport23(false)
      })
  }, [toDate23, branchCode])

  useEffect(() => {
    setLoadingRiOutstandingCessionReport24(true)
    axios
      .get(
        `${LOCAL_URL}/ri-outstanding-cession-report?toDate=${toDate}&branchCode=${branchCode}`,
      )
      .then((response) => {
        setRiOutstandingCessionReport24(response.data.result)
      })
      .catch((error) => {
        console.error(
          'Error fetching RI outstanding cession report 2024',
          error,
        )
      })
      .finally(() => {
        setLoadingRiOutstandingCessionReport24(false)
      })
  }, [toDate, branchCode])

  function calculatePremiums(premiums: any) {
    const totalPremium = premiums.reduce((total: number, premium: any) => {
      return total + premium.premiums + premium.earthQuake + premium.PVTPremium
    }, 0)

    const commision = premiums.reduce((total: number, premium: any) => {
      return total + premium.brokerComm
    }, 0)

    return {
      totalPremium,
      commision,
    }
  }

  const {
    totalPremium: totalPremium2024,
    commision: commision2024,
  } = calculatePremiums(premiums2024)

  const {
    totalPremium: totalPremium2023,
    commision: commision2023,
  } = calculatePremiums(premiums2023)

  const calculateClaimsData = (claimsData: any) => {
    const totalClaimPaid = claimsData.reduce(
      (total: number, claims: any) => total + claims.paidAmount,
      0,
    )

    return { totalClaimPaid }
  }

  const calculateOutstandingClaims = (outstandingClaims: any) => {
    const totalOutstanding = outstandingClaims.reduce(
      (total: number, outstanding: any) => total + outstanding.totalProvision,
      0,
    )

    return {
      totalOutstanding,
    }
  }

  const { totalClaimPaid: totalClaimPaid2023 } = calculateClaimsData(claims2023)
  const { totalClaimPaid: totalClaimPaid2024 } = calculateClaimsData(claims2024)
  const { totalOutstanding: totalOutstanding2023 } = calculateOutstandingClaims(
    outstandingClaims23,
  )
  const { totalOutstanding: totalOutstanding2024 } = calculateOutstandingClaims(
    outstandingClaims24,
  )

  return (
    <StatisticalContext.Provider
      value={{
        setFromDate,
        setFromDate23,
        setToDate,
        setToDate23,
        setBranchCode,
        totalPremium2024,
        commision2024,
        totalPremium2023,
        commision2023,
        totalClaimPaid2023,
        totalClaimPaid2024,
        totalOutstanding2023,
        totalOutstanding2024,
        riCession23,
        riCession24,
        riPaidCession23,
        riPaidCession24,
        managementExpenses23,
        managementExpenses24,
        riOutstandingCessionReport23,
        riOutstandingCessionReport24,
        loadingPremiums2024,
        loadingPremiums2023,
        loadingClaims2023,
        loadingClaims2024,
        loadingOutstandingClaims23,
        loadingOutstandingClaims24,
        loadingRiCession23,
        loadingRiCession24,
        loadingRiPaidCession23,
        loadingRiPaidCession24,
        loadingManagementExpenses23,
        loadingManagementExpenses24,
        loadingRiOutstandingCessionReport23,
        loadingRiOutstandingCessionReport24,
      }}
    >
      {children}
    </StatisticalContext.Provider>
  )
}

export default StatisticalProvider
