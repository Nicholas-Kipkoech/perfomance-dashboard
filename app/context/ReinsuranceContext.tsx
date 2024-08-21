'use client'
import axios from 'axios'
import React, { useState } from 'react'
import { createContext } from 'react'
import { IBranches } from '../assets/interfaces'
import { LOCAL_URL } from './database-connect'

export const ReinsuranceContext = createContext({})
const ReinsuranceContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [companys, setCompanys] = useState<IBranches[]>([])

  const [riCession, setRiCession] = useState([])
  const [riPaidCession, setRiPaidCession] = useState([])

  const [riOutstandingCessionReport, setRiOutstandingCessionReport] = useState(
    [],
  )

  const [loadingData, setLoadingData] = useState(false)

  const fetchRIData = async (
    fromDate: string,
    toDate: string,
    branchCode: string,
  ) => {
    setLoadingData(true)
    try {
      const [
        outstandingRiCessionReportsResponse,
        RIPaidCessionResponse,
        RICessionResponse,
        orgBranchesResponse,
      ] = await Promise.all([
        axios.get(
          `${LOCAL_URL}/ri-outstanding-cession-report?toDate=${toDate}&branchCode=${branchCode}`,
        ),
        axios.get(
          `${LOCAL_URL}/ri-paid-cession-sum?fromDate=${fromDate}&toDate=${toDate}&branchCode=${branchCode}`,
        ),
        axios.get(
          `${LOCAL_URL}/ri-cessions?fromDate=${fromDate}&toDate=${toDate}&branchCode=${branchCode}`,
        ),
        axios.get(`${LOCAL_URL}/branches`),
      ])

      setRiOutstandingCessionReport(
        outstandingRiCessionReportsResponse.data.result,
      )

      setRiPaidCession(RIPaidCessionResponse.data.result)
      setRiCession(RICessionResponse.data.result)

      setCompanys([
        { organization_name: 'Entire Company', organization_code: '' },
        ...orgBranchesResponse.data.result,
      ])
      setLoadingData(false)
    } catch (error) {
      setLoadingData(false)

      console.error('Error fetching data', error)
    }
  }

  return (
    <ReinsuranceContext.Provider
      value={{
        riCession,
        riPaidCession,
        riOutstandingCessionReport,
        loadingData,
        fetchRIData,
        companys,
      }}
    >
      {children}
    </ReinsuranceContext.Provider>
  )
}

export default ReinsuranceContextProvider
