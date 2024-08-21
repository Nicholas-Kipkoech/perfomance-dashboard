'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { createContext } from 'react'
import {
  IBimaData,
  IBranches,
  IClients,
  IProduction,
  IReceipts,
  IRecovery,
  IRegisteredClaims,
  ISalvages,
  IUndebitedPolicies,
  IUnrenewedPolicies,
} from '../assets/interfaces'
import { LOCAL_URL } from './database-connect'
import { getDates } from '../dashboard/premiums/helpers'
import { jwtDecode } from 'jwt-decode'
/**
 *  totalClaimPaid,
    totalClaims,
    totalRegisteredClaims,
    totalOutstanding,
    totalCount: totalOutstandingCount,
    totalSalvages,
    nonMotorRegisteredClaims,
    motorRegisteredClaims,
    filteredLossRation,
    motorOutstanding,
    motorPaidClaims,
    nonMotorPaidClaims,
    nonMotorOutstanding,
    loadingData,
    year: _year,
    setFromDate,
    toDate: _toDate,
    setToDate,
    companys,
    setBranchCode,
    setCompany,
 */

export const ClaimsContext = createContext({})
const ClaimsContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { currentYear } = getDates()

  const [claimsData, setClaimsData] = useState([])
  const [registeredClaims, setRegisteredClaims] = useState<IRegisteredClaims[]>(
    [],
  )
  const [outstandingClaims, setOutstandingClaims] = useState([])
  const [company, setCompany] = useState('INTRA')
  const [companys, setCompanys] = useState<IBranches[]>([])

  const [cmLossRatio, setCmLossRatio] = useState([])
  const [salvages, setSalvages] = useState([])

  const [loadingData, setLoadingData] = useState(false)

  const fetchClaimsData = async (
    fromDate: string,
    toDate: string,
    branchCode: string,
  ) => {
    setLoadingData(true)
    try {
      const [
        orgBranchesResponse,
        claimsResponse,
        registeredClaimsResponse,
        outstandingClaimsResponse,
        salvagesResponse,
        lossRatioResponse,
      ] = await Promise.all([
        axios.get(`${LOCAL_URL}/branches`),
        axios.get(
          `${LOCAL_URL}/claims?fromDate=${fromDate}&toDate=${toDate}&branchCode=${branchCode}`,
        ),
        axios.get(
          `${LOCAL_URL}/registered-claims?fromDate=${fromDate}&toDate=${toDate}&branchCode=${branchCode}`,
        ),
        axios.get(
          `${LOCAL_URL}/outstanding-claims?branchCode=${branchCode}&toDate=${toDate}&fromDate=${fromDate}`,
        ),

        axios.get(
          `${LOCAL_URL}/salvages?fromDate=${fromDate}&toDate=${toDate}&branchCode=${branchCode}`,
        ),

        axios.get(
          `${LOCAL_URL}/cm-loss-ratio2?fromDate=2024&toDate=2024&branchCode=${branchCode}`,
        ),
      ])

      setCompanys([
        { organization_name: 'Entire Company', organization_code: '' },
        ...orgBranchesResponse.data.result,
      ])
      setClaimsData(claimsResponse.data.result)
      setRegisteredClaims(registeredClaimsResponse.data.result)
      setOutstandingClaims(outstandingClaimsResponse.data.result)
      setSalvages(salvagesResponse.data.result)
      setCmLossRatio(lossRatioResponse.data.result)

      setLoadingData(false)
    } catch (error) {
      setLoadingData(false)

      console.error('Error fetching data', error)
    }
  }

  const calculateClaimsData = (claimsData: any) => {
    let motorPaidClaims = 0
    let nonMotorPaidClaims = 0

    claimsData.forEach((claims: any) => {
      let total = claims.paidAmount
      if (claims.motorCode === '070' || claims.motorCode === '080') {
        motorPaidClaims += total
      } else {
        nonMotorPaidClaims += total
      }
    })

    const totalClaimPaid = claimsData.reduce(
      (total: number, claims: any) => total + claims.paidAmount,
      0,
    )

    return { totalClaimPaid, nonMotorPaidClaims, motorPaidClaims }
  }

  const {
    totalClaimPaid,
    motorPaidClaims,
    nonMotorPaidClaims,
  } = calculateClaimsData(claimsData)

  const calculateRegisteredClaims = (registeredClaims: IRegisteredClaims[]) => {
    let motorRegisteredClaims = 0
    let nonMotorRegisteredClaims = 0
    const totalRegisteredClaims = registeredClaims.reduce(
      (total: number, claims) => total + claims.totalProvision,
      0,
    )

    registeredClaims.forEach((claim: any) => {
      let total = claim.totalProvision
      if (claim.motorCode === '070' || claim.motorCode === '080') {
        motorRegisteredClaims += total
      } else {
        nonMotorRegisteredClaims += total
      }
    })

    return {
      totalRegisteredClaims,
      nonMotorRegisteredClaims,
      motorRegisteredClaims,
    }
  }
  const {
    totalRegisteredClaims,
    nonMotorRegisteredClaims,
    motorRegisteredClaims,
  } = calculateRegisteredClaims(registeredClaims)

  const calculateOutstandingClaims = (outstandingClaims: any) => {
    let motorOutstanding = 0
    let nonMotorOutstanding = 0
    outstandingClaims.forEach((outstanding: any) => {
      let total = outstanding.totalProvision
      if (outstanding.motorCode === '070' || outstanding.motorCode === '080') {
        motorOutstanding += total
      } else {
        nonMotorOutstanding += total
      }
    })
    const totalOutstanding = outstandingClaims.reduce(
      (total: number, outstanding: any) => total + outstanding.totalProvision,
      0,
    )

    return {
      totalOutstanding,
      motorOutstanding,
      nonMotorOutstanding,
    }
  }

  const calculateSalvages = (salvages: any) => {
    const totalSalvages = salvages.reduce(
      (total: number, salvage: any) => total + salvage.receiptAmount,
      0,
    )
    return { totalSalvages }
  }

  const { totalSalvages } = calculateSalvages(salvages)

  const {
    totalOutstanding,
    motorOutstanding,
    nonMotorOutstanding,
  } = calculateOutstandingClaims(outstandingClaims)

  const filteredLossRation = cmLossRatio.filter((claim: any) => {
    return claim.cm_order_no === 10
  })

  return (
    <ClaimsContext.Provider
      value={{
        totalClaimPaid,
        totalRegisteredClaims,
        totalOutstanding,
        totalSalvages,
        nonMotorRegisteredClaims,
        motorRegisteredClaims,
        filteredLossRation,
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
      }}
    >
      {children}
    </ClaimsContext.Provider>
  )
}

export default ClaimsContextProvider
