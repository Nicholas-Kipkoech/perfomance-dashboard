'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { createContext } from 'react'
import { IBranches, IReceipts } from '../assets/interfaces'
import { LOCAL_URL } from './database-connect'

export const FinanceContext = createContext({})
const FinanceContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [receipts, setReceipts] = useState<IReceipts[]>([])
  const [companys, setCompanys] = useState<IBranches[]>([])

  const [bankBalances, setBankBalances] = useState([])
  const [loadingData, setLoadingData] = useState(false)

  const fetchFinanceData = async (
    fromDate: string,
    toDate: string,
    branchCode: string,
  ) => {
    setLoadingData(true)
    try {
      const [
        orgBranchesResponse,

        ARReceiptsResponse,
        bankBalancesResponse,
      ] = await Promise.all([
        axios.get(`${LOCAL_URL}/branches`),

        axios.get(
          `${LOCAL_URL}/AR-receipts?fromDate=${fromDate}&toDate=${toDate}&branchCode=${branchCode}`,
        ),

        axios.get(
          `${LOCAL_URL}/bank-balances?fromDate=${fromDate}&toDate=${toDate}&branchCode=${branchCode}`,
        ),
      ])

      setCompanys([
        { organization_name: 'Entire Company', organization_code: '' },
        ...orgBranchesResponse.data.result,
      ])

      setReceipts(ARReceiptsResponse.data.result)

      setBankBalances(bankBalancesResponse.data.result)
      setLoadingData(false)
    } catch (error) {
      setLoadingData(false)

      console.error('Error fetching data', error)
    }
  }

  const calculateTotalByCurrency = (receipts: IReceipts[]) => {
    return receipts.reduce((acc: any, curr) => {
      const { currencyCode, receiptAmount } = curr
      // Check if the currency code already exists in the accumulator object
      if (acc[currencyCode]) {
        // If exists, add the current receipt amount to the existing total
        acc[currencyCode].total += receiptAmount
        // Increment the count for the currency code
        acc[currencyCode].count++
      } else {
        // If currency code doesn't exist, create a new entry
        acc[currencyCode] = {
          total: receiptAmount,
          count: 1,
        }
      }
      return acc
    }, {})
  }
  const receiptResults = calculateTotalByCurrency(receipts)

  return (
    <FinanceContext.Provider
      value={{
        receiptResults,
        loadingData,
        bankBalances,
        companys,
        fetchFinanceData,
      }}
    >
      {children}
    </FinanceContext.Provider>
  )
}

export default FinanceContextProvider
