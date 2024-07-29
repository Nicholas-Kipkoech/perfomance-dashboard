'use client'
import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'
import { useContextApi } from './Context'
import { LOCAL_URL } from './database-connect'

export const StatisticalContext = createContext({})

const StatisticalProvider = ({ children }: { children: React.ReactNode }) => {
  const [fromDate23, setFromDate23] = useState('1-jan-2023')
  const [toDate23, setToDate23] = useState('31-dec-2023')
  const [fromDate, setFromDate] = useState('1-jan-2024')
  const [toDate, setToDate] = useState('31-dec-2024')
  const [branchCode, setBranchCode] = useState('')
  const [premiums2024, setPremiums2024] = useState([])
  const [premiums2023, setPremiums2023] = useState([])
  const [claims2023, setClaims2023] = useState([])
  const [claims2024, setClaims2024] = useState([])
  const [outstandingClaims23, setOutstandingClaims23] = useState([])
  const [outstandingClaims24, setOutstandingClaims24] = useState([])
  const [riCession23, setRiCession23] = useState([])
  const [riCession24, setRiCession24] = useState([])
  const [riPaidCession23, setRiPaidCession23] = useState([])
  const [riPaidCession24, setRiPaidCession24] = useState([])
  const [managementExpenses23, setManagementExpenses23] = useState([])
  const [managementExpenses24, setManagementExpenses24] = useState([])
  const [
    riOutstandingCessionReport23,
    setRiOutstandingCessionReport23,
  ] = useState([])
  const [
    riOutstandingCessionReport24,
    setRiOutstandingCessionReport24,
  ] = useState([])

  useEffect(() => {
    const fetchPremiums2024 = async () => {
      const { data } = await axios.get(
        `${LOCAL_URL}/underwriting?fromDate=${fromDate}&toDate=${toDate}&branchCode=${branchCode}`,
      )
      setPremiums2024(data.result)
    }
    fetchPremiums2024()
  }, [fromDate, toDate, branchCode])

  useEffect(() => {
    const fetchPremiums2023 = async () => {
      const { data } = await axios.get(
        `${LOCAL_URL}/underwriting?fromDate=${fromDate23}&toDate=${toDate23}&branchCode=${branchCode}`,
      )
      setPremiums2023(data.result)
    }
    fetchPremiums2023()
  }, [fromDate23, toDate23, branchCode])

  useEffect(() => {
    const fetchClaims = async () => {
      const { data } = await axios.get(
        `${LOCAL_URL}/claims?fromDate=${fromDate23}&toDate=${toDate23}&branchCode=${branchCode}`,
      )
      setClaims2023(data.result)
    }
    fetchClaims()
  }, [fromDate23, toDate23, branchCode])

  useEffect(() => {
    const fetchClaims = async () => {
      const { data } = await axios.get(
        `${LOCAL_URL}/claims?fromDate=${fromDate}&toDate=${toDate}&branchCode=${branchCode}`,
      )
      setClaims2024(data.result)
    }
    fetchClaims()
  }, [fromDate, toDate, branchCode])

  useEffect(() => {
    const fetchOutStandingClaims = async () => {
      const { data } = await axios.get(
        `${LOCAL_URL}/outstanding-claims?branchCode=${branchCode}&toDate=${toDate23}&fromDate=${fromDate23}`,
      )
      setOutstandingClaims23(data.result)
    }
    fetchOutStandingClaims()
  }, [fromDate23, toDate23, branchCode])

  useEffect(() => {
    const fetchOutStandingClaims = async () => {
      const { data } = await axios.get(
        `${LOCAL_URL}/outstanding-claims?branchCode=${branchCode}&toDate=${toDate}&fromDate=${fromDate}`,
      )
      setOutstandingClaims24(data.result)
    }
    fetchOutStandingClaims()
  }, [fromDate, toDate, branchCode])

  useEffect(() => {
    const fetchRICession = async () => {
      const { data } = await axios.get(
        `${LOCAL_URL}/ri-cessions?fromDate=${fromDate23}&toDate=${toDate23}&branchCode=${branchCode}`,
      )
      setRiCession23(data.result)
    }
    fetchRICession()
  }, [fromDate23, toDate23, branchCode])

  useEffect(() => {
    const fetchRICession = async () => {
      const { data } = await axios.get(
        `${LOCAL_URL}/ri-cessions?fromDate=${fromDate}&toDate=${toDate}&branchCode=${branchCode}`,
      )
      setRiCession24(data.result)
    }
    fetchRICession()
  }, [fromDate, toDate, branchCode])

  useEffect(() => {
    const fetchRIPaidCession = async () => {
      const { data } = await axios.get(
        `${LOCAL_URL}/ri-paid-cession-sum?fromDate=${fromDate23}&toDate=${toDate23}&branchCode=${branchCode}`,
      )
      setRiPaidCession23(data.result)
    }
    fetchRIPaidCession()
  }, [fromDate23, toDate23, branchCode])

  useEffect(() => {
    const fetchRIPaidCession = async () => {
      const { data } = await axios.get(
        `${LOCAL_URL}/ri-paid-cession-sum?fromDate=${fromDate}&toDate=${toDate}&branchCode=${branchCode}`,
      )
      setRiPaidCession24(data.result)
    }
    fetchRIPaidCession()
  }, [fromDate, toDate, branchCode])

  useEffect(() => {
    const fetchManagementExpenses = async () => {
      const { data } = await axios.get(
        `${LOCAL_URL}/management-expenses?fromDate=${fromDate23}&toDate=${toDate23}&branchCode=${branchCode}`,
      )
      setManagementExpenses23(data.result)
    }
    fetchManagementExpenses()
  }, [fromDate23, toDate23, branchCode])

  useEffect(() => {
    const fetchManagementExpenses = async () => {
      const { data } = await axios.get(
        `${LOCAL_URL}/management-expenses?fromDate=${fromDate}&toDate=${toDate}&branchCode=${branchCode}`,
      )
      setManagementExpenses24(data.result)
    }
    fetchManagementExpenses()
  }, [fromDate, toDate, branchCode])

  useEffect(() => {
    const fetchOutstandingRiCessionReports = async () => {
      const { data } = await axios.get(
        `${LOCAL_URL}/ri-outstanding-cession-report?toDate=${toDate}&branchCode=${branchCode}`,
      )
      setRiOutstandingCessionReport24(data.result)
    }
    fetchOutstandingRiCessionReports()
  }, [toDate, branchCode])

  useEffect(() => {
    const fetchOutstandingRiCessionReports = async () => {
      const { data } = await axios.get(
        `${LOCAL_URL}/ri-outstanding-cession-report?toDate=${toDate23}&branchCode=${branchCode}`,
      )
      setRiOutstandingCessionReport23(data.result)
    }
    fetchOutstandingRiCessionReports()
  }, [toDate23, branchCode])

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
  console.log('23', fromDate23)
  console.log('24', fromDate)

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
      }}
    >
      {children}
    </StatisticalContext.Provider>
  )
}

export default StatisticalProvider
