'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { createContext } from 'react'
import { IBranches } from '../assets/interfaces'
import { LOCAL_URL } from './database-connect'
import { getDates } from '../dashboard/premiums/helpers'

export const ReinsuranceContext = createContext({})
const ReinsuranceContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const { currentMonth } = getDates()

  const [companys, setCompanys] = useState<IBranches[]>([])
  const [fromDate, setFromDate] = useState(currentMonth.startDate)
  const [toDate, setToDate] = useState(currentMonth.endDate)
  const [branchCode, setBranchCode] = useState('')
  const [riCession, setRiCession] = useState([])
  const [loadingRiCession, setLoadingRiCession] = useState(false)

  const [riPaidCession, setRiPaidCession] = useState([])
  const [loadingRiPaidCession, setLoadingRiPaidCession] = useState(false)

  const [riOutstandingCessionReport, setRiOutstandingCessionReport] = useState(
    [],
  )
  const [
    loadingRiOutstandingCessionReport,
    setLoadingRiOutstandingCessionReport,
  ] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setLoadingRiOutstandingCessionReport(true)
      try {
        const response = await axios.get(
          `{LOCAL_URL}/ri-outstanding-cession-report?toDate=${toDate}&branchCode=${branchCode}`,
        )
        setRiOutstandingCessionReport(response.data.result)
      } catch (error) {
        console.error('Error fetching  data', error)
      } finally {
        setLoadingRiOutstandingCessionReport(false)
      }
    }
    fetchData()
  }, [fromDate, toDate, branchCode])

  useEffect(() => {
    const fetchData = async () => {
      setLoadingRiPaidCession(true)
      try {
        const response = await axios.get(
          `{LOCAL_URL}/ri-paid-cession-sum?toDate=${toDate}&branchCode=${branchCode}`,
        )
        setRiPaidCession(response.data.result)
      } catch (error) {
        console.error('Error fetching  data', error)
      } finally {
        setLoadingRiPaidCession(false)
      }
    }
    fetchData()
  }, [fromDate, toDate, branchCode])

  useEffect(() => {
    const fetchData = async () => {
      setLoadingRiCession(true)
      try {
        const response = await axios.get(
          `${LOCAL_URL}/ri-cessions?toDate=${toDate}&branchCode=${branchCode}`,
        )
        setRiCession(response.data.result)
      } catch (error) {
        console.error('Error fetching  data', error)
      } finally {
        setLoadingRiCession(false)
      }
    }
    fetchData()
  }, [fromDate, toDate, branchCode])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${LOCAL_URL}/branches`)
        setCompanys(response.data.result)
      } catch (error) {
        console.error('Error fetching  data', error)
      }
    }
    fetchData()
  }, [])

  return (
    <ReinsuranceContext.Provider
      value={{
        fromDate,
        toDate,
        setFromDate,
        setToDate,
        setBranchCode,
        riCession,
        riPaidCession,
        riOutstandingCessionReport,
        loadingRiCession,
        loadingRiOutstandingCessionReport,
        loadingRiPaidCession,
        companys,
      }}
    >
      {children}
    </ReinsuranceContext.Provider>
  )
}

export default ReinsuranceContextProvider
