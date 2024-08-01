'use client'
import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'
import { useContextApi } from './Context'
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
  const [loadingData, setLoadingData] = useState(false)

  

  useEffect(() => {
    const fetchData = async () => {
      setLoadingData(true)
      try {
        const [
          premiums2024Response,
          premiums2023Response,
          claims2023Response,
          claims2024Response,
          outstandingClaims23Response,
          outstandingClaims24Response,
          riCession23Response,
          riCession24Response,
          riPaidCession23Response,
          riPaidCession24Response,
          managementExpenses23Response,
          managementExpenses24Response,
          riOutstandingCessionReport23Response,
          riOutstandingCessionReport24Response,
        ] = await Promise.all([
          axios.get(
            `${LOCAL_URL}/underwriting?fromDate=${fromDate}&toDate=${toDate}&branchCode=${branchCode}`,
          ),
          axios.get(
            `${LOCAL_URL}/underwriting?fromDate=${fromDate23}&toDate=${toDate23}&branchCode=${branchCode}`,
          ),
          axios.get(
            `${LOCAL_URL}/claims?fromDate=${fromDate23}&toDate=${toDate23}&branchCode=${branchCode}`,
          ),
          axios.get(
            `${LOCAL_URL}/claims?fromDate=${fromDate}&toDate=${toDate}&branchCode=${branchCode}`,
          ),
          axios.get(
            `${LOCAL_URL}/outstanding-claims?branchCode=${branchCode}&toDate=${toDate23}&fromDate=${fromDate23}`,
          ),
          axios.get(
            `${LOCAL_URL}/outstanding-claims?branchCode=${branchCode}&toDate=${toDate}&fromDate=${fromDate}`,
          ),
          axios.get(
            `${LOCAL_URL}/ri-cessions?fromDate=${fromDate23}&toDate=${toDate23}&branchCode=${branchCode}`,
          ),
          axios.get(
            `${LOCAL_URL}/ri-cessions?fromDate=${fromDate}&toDate=${toDate}&branchCode=${branchCode}`,
          ),
          axios.get(
            `${LOCAL_URL}/ri-paid-cession-sum?fromDate=${fromDate23}&toDate=${toDate23}&branchCode=${branchCode}`,
          ),
          axios.get(
            `${LOCAL_URL}/ri-paid-cession-sum?fromDate=${fromDate}&toDate=${toDate}&branchCode=${branchCode}`,
          ),
          axios.get(
            `${LOCAL_URL}/management-expenses?fromDate=${fromDate23}&toDate=${toDate23}&branchCode=${branchCode}`,
          ),
          axios.get(
            `${LOCAL_URL}/management-expenses?fromDate=${fromDate}&toDate=${toDate}&branchCode=${branchCode}`,
          ),
          axios.get(
            `${LOCAL_URL}/ri-outstanding-cession-report?toDate=${toDate23}&branchCode=${branchCode}`,
          ),
          axios.get(
            `${LOCAL_URL}/ri-outstanding-cession-report?toDate=${toDate}&branchCode=${branchCode}`,
          ),
        ])

        setPremiums2024(premiums2024Response.data.result)
        setPremiums2023(premiums2023Response.data.result)
        setClaims2023(claims2023Response.data.result)
        setClaims2024(claims2024Response.data.result)
        setOutstandingClaims23(outstandingClaims23Response.data.result)
        setOutstandingClaims24(outstandingClaims24Response.data.result)
        setRiCession23(riCession23Response.data.result)
        setRiCession24(riCession24Response.data.result)
        setRiPaidCession23(riPaidCession23Response.data.result)
        setRiPaidCession24(riPaidCession24Response.data.result)
        setManagementExpenses23(managementExpenses23Response.data.result)
        setManagementExpenses24(managementExpenses24Response.data.result)
        setRiOutstandingCessionReport23(
          riOutstandingCessionReport23Response.data.result,
        )
        setRiOutstandingCessionReport24(
          riOutstandingCessionReport24Response.data.result,
        )
        setLoadingData(false)
      } catch (error) {
        setLoadingData(false)
        console.error('Error fetching data', error)
      }
    }

    fetchData()
  }, [fromDate, toDate, fromDate23, toDate23, branchCode])

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
        loadingData,
      }}
    >
      {children}
    </StatisticalContext.Provider>
  )
}

export default StatisticalProvider
