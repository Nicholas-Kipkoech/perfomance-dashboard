'use client'
import React, { useEffect, useState, createContext, useContext } from 'react'
import axios from 'axios'
import {
  IBimaData,
  IBranches,
  IClients,
  IProduction,
  IReceipts,
  IRecovery,
  IRegisteredClaims,
  IUndebitedPolicies,
  IUnrenewedPolicies,
} from '../assets/interfaces'
import { LOCAL_URL } from './database-connect'

import { getDates } from '../dashboard/premiums/helpers'
import { jwtDecode } from 'jwt-decode'

const Context = createContext({})

const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { currentMonth } = getDates()
  const [fromDate, setFromDate] = useState(currentMonth.startDate)
  const [toDate, setToDate] = useState(currentMonth.endDate)
  const [branchCode, setBranchCode] = useState('')
  const [bimaData, setBimaData] = useState<IBimaData[]>([])
  const [claimsData, setClaimsData] = useState([])
  const [registeredClaims, setRegisteredClaims] = useState<IRegisteredClaims[]>(
    [],
  )
  const [outstandingClaims, setOutstandingClaims] = useState([])
  const [productionData, setProductionData] = useState<IProduction[]>([])
  const [clients, setClients] = useState<IClients[]>([])
  const [unrenewedPolicies, setUnrenewedPolicies] = useState<
    IUnrenewedPolicies[]
  >([])
  const [undebitedPolicies, setUndebitedPolicies] = useState<
    IUndebitedPolicies[]
  >([])
  const [salvages, setSalvages] = useState([])
  const [recovery, setRecovery] = useState<IRecovery[]>([])
  const [receipts, setReceipts] = useState<IReceipts[]>([])
  const [companys, setCompanys] = useState<IBranches[]>([])

  const [company, setCompany] = useState('INTRA')
  const [component, setComponent] = useState('Statistical')
  const [reinsurance, setReinsurance] = useState([])

  const [directClients, setDirectClients] = useState([])

  // Loading states
  const [loadingBimaData, setLoadingBimaData] = useState(false)
  const [loadingClaimsData, setLoadingClaimsData] = useState(false)
  const [loadingRegisteredClaims, setLoadingRegisteredClaims] = useState(false)
  const [loadingOutstandingClaims, setLoadingOutstandingClaims] = useState(
    false,
  )
  const [loadingProductionData, setLoadingProductionData] = useState(false)
  const [loadingClients, setLoadingClients] = useState(false)
  const [loadingUnrenewedPolicies, setLoadingUnrenewedPolicies] = useState(
    false,
  )
  const [loadingUndebitedPolicies, setLoadingUndebitedPolicies] = useState(
    false,
  )
  const [loadingSalvages, setLoadingSalvages] = useState(false)
  const [loadingRecovery, setLoadingRecovery] = useState(false)
  const [loadingReceipts, setLoadingReceipts] = useState(false)
  const [loadingCompanys, setLoadingCompanys] = useState(false)
  const [loadingDirectClients, setLoadingDirectClients] = useState(false)
  const [loadingBankBalances, setLoadingBankBalances] = useState(false)

  // Authentication methods
  const login = async (username: any, password: any) => {
    try {
      const response = await axios.post(`${LOCAL_URL}/login`, {
        un: username,
        pw: password,
      })
      const newToken = response.data.accessToken
      console.log(newToken)
      localStorage.setItem('accessToken', newToken)
      return true
    } catch (error) {
      console.error('login error', error)
      return false
    }
  }

  const logout = () => {
    localStorage.removeItem('accessToken')
  }

  const isAuthenticated = () => {
    if (typeof window !== 'undefined') {
      const accessTokenJson = localStorage.getItem('accessToken')
      if (!accessTokenJson) return false
      const decodedToken: any = jwtDecode(accessTokenJson)
      const currentTime = Date.now() / 1000
      if (currentTime >= decodedToken?.exp) {
        return false
      }
    }
    return true
  }

  // Fetch Company Data
  useEffect(() => {
    const fetchBranches = async () => {
      setLoadingCompanys(true)
      try {
        const response = await axios.get(`${LOCAL_URL}/branches`)
        setCompanys(response.data.result)
      } catch (error) {
        console.error('Error fetching branches', error)
      } finally {
        setLoadingCompanys(false)
      }
    }
    fetchBranches()
  }, [])

  // Fetch Direct Clients Data
  useEffect(() => {
    const fetchDirectClients = async () => {
      setLoadingDirectClients(true)
      try {
        const response = await axios.get(
          `${LOCAL_URL}/direct-clients?branchCode=${branchCode}`,
        )
        setDirectClients(response.data.result)
      } catch (error) {
        console.error('Error fetching direct clients', error)
      } finally {
        setLoadingDirectClients(false)
      }
    }
    fetchDirectClients()
  }, [branchCode])

  // Fetch Bima Data
  useEffect(() => {
    const fetchBimaData = async () => {
      setLoadingBimaData(true)
      try {
        const response = await axios.get(
          `${LOCAL_URL}/underwriting?fromDate=${fromDate}&toDate=${toDate}&branchCode=${branchCode}`,
        )
        setBimaData(response.data.result)
      } catch (error) {
        console.error('Error fetching Bima data', error)
      } finally {
        setLoadingBimaData(false)
      }
    }
    fetchBimaData()
  }, [fromDate, toDate, branchCode])

  // Fetch Claims Data
  useEffect(() => {
    const fetchClaimsData = async () => {
      setLoadingClaimsData(true)
      try {
        const response = await axios.get(
          `${LOCAL_URL}/claims?fromDate=${fromDate}&toDate=${toDate}&branchCode=${branchCode}`,
        )
        setClaimsData(response.data.result)
      } catch (error) {
        console.error('Error fetching claims data', error)
      } finally {
        setLoadingClaimsData(false)
      }
    }
    fetchClaimsData()
  }, [fromDate, toDate, branchCode])

  // Fetch Registered Claims Data
  useEffect(() => {
    const fetchRegisteredClaims = async () => {
      setLoadingRegisteredClaims(true)
      try {
        const response = await axios.get(
          `${LOCAL_URL}/registered-claims?fromDate=${fromDate}&toDate=${toDate}&branchCode=${branchCode}`,
        )
        setRegisteredClaims(response.data.result)
      } catch (error) {
        console.error('Error fetching registered claims data', error)
      } finally {
        setLoadingRegisteredClaims(false)
      }
    }
    fetchRegisteredClaims()
  }, [fromDate, toDate, branchCode])

  // Fetch Outstanding Claims Data
  useEffect(() => {
    const fetchOutstandingClaims = async () => {
      setLoadingOutstandingClaims(true)
      try {
        const response = await axios.get(
          `${LOCAL_URL}/outstanding-claims?branchCode=${branchCode}&toDate=${toDate}&fromDate=${fromDate}`,
        )
        setOutstandingClaims(response.data.result)
      } catch (error) {
        console.error('Error fetching outstanding claims data', error)
      } finally {
        setLoadingOutstandingClaims(false)
      }
    }
    fetchOutstandingClaims()
  }, [fromDate, toDate, branchCode])

  // Fetch Production Data
  useEffect(() => {
    const fetchProductionData = async () => {
      setLoadingProductionData(true)
      try {
        const response = await axios.get(
          `${LOCAL_URL}/production?fromDate=${fromDate}&toDate=${toDate}&branchCode=${branchCode}`,
        )
        setProductionData(response.data.result)
      } catch (error) {
        console.error('Error fetching production data', error)
      } finally {
        setLoadingProductionData(false)
      }
    }
    fetchProductionData()
  }, [fromDate, toDate, branchCode])

  // Fetch Clients Data
  useEffect(() => {
    const fetchClients = async () => {
      setLoadingClients(true)
      try {
        const response = await axios.get(
          `${LOCAL_URL}/clients?branchCode=${branchCode}`,
        )
        setClients(response.data.result)
      } catch (error) {
        console.error('Error fetching clients data', error)
      } finally {
        setLoadingClients(false)
      }
    }
    fetchClients()
  }, [branchCode])

  // Fetch Unrenewed Policies Data
  useEffect(() => {
    const fetchUnrenewedPolicies = async () => {
      setLoadingUnrenewedPolicies(true)
      try {
        const response = await axios.get(
          `${LOCAL_URL}/unrenewed-policies?fromDate=${fromDate}&toDate=${toDate}&branchCode=${branchCode}`,
        )
        setUnrenewedPolicies(response.data.result)
      } catch (error) {
        console.error('Error fetching unrenewed policies data', error)
      } finally {
        setLoadingUnrenewedPolicies(false)
      }
    }
    fetchUnrenewedPolicies()
  }, [fromDate, toDate, branchCode])

  // Fetch Undebited Policies Data
  useEffect(() => {
    const fetchUndebitedPolicies = async () => {
      setLoadingUndebitedPolicies(true)
      try {
        const response = await axios.get(
          `${LOCAL_URL}/undebited-policies?fromDate=${fromDate}&toDate=${toDate}&branchCode=${branchCode}`,
        )
        setUndebitedPolicies(response.data.result)
      } catch (error) {
        console.error('Error fetching undebited policies data', error)
      } finally {
        setLoadingUndebitedPolicies(false)
      }
    }
    fetchUndebitedPolicies()
  }, [branchCode])

  // Fetch Salvages Data
  useEffect(() => {
    const fetchSalvages = async () => {
      setLoadingSalvages(true)
      try {
        const response = await axios.get(
          `${LOCAL_URL}/salvagesfromDate=${fromDate}&toDate=${toDate}&branchCode=${branchCode}`,
        )
        setSalvages(response.data.result)
      } catch (error) {
        console.error('Error fetching salvages data', error)
      } finally {
        setLoadingSalvages(false)
      }
    }
    fetchSalvages()
  }, [branchCode])

  // Fetch Recovery Data
  useEffect(() => {
    const fetchRecovery = async () => {
      setLoadingRecovery(true)
      try {
        const response = await axios.get(
          `${LOCAL_URL}/recovery?fromDate=${fromDate}&toDate=${toDate}&branchCode=${branchCode}`,
        )
        setRecovery(response.data.result)
      } catch (error) {
        console.error('Error fetching recovery data', error)
      } finally {
        setLoadingRecovery(false)
      }
    }
    fetchRecovery()
  }, [fromDate, toDate, branchCode])

  // Fetch Receipts Data
  useEffect(() => {
    const fetchReceipts = async () => {
      setLoadingReceipts(true)
      try {
        const response = await axios.get(
          `${LOCAL_URL}/receipts?fromDate=${fromDate}&toDate=${toDate}&branchCode=${branchCode}`,
        )
        setReceipts(response.data.result)
      } catch (error) {
        console.error('Error fetching receipts data', error)
      } finally {
        setLoadingReceipts(false)
      }
    }
    fetchReceipts()
  }, [fromDate, toDate, branchCode])

  // Fetch Bank Balances Data

  useEffect(() => {
    const fetchData = async () => {
      setLoadingReceipts(true)
      try {
        const response = await axios.get(
          `${LOCAL_URL}/reinsurance?fromDate=${fromDate}&toDate=${toDate}&branchCode=${branchCode}`,
        )
        setReinsurance(response.data.result)
      } catch (error) {
        console.error('Error fetching reinsuranced data', error)
      } finally {
        setLoadingReceipts(false)
      }
    }
    fetchData()
  }, [fromDate, toDate, branchCode])

  function calculatePremiums(bimaData: any) {
    let nonMotorPremium = 0
    let motorPremium = 0
    let directPremium = 0
    let intermediaryPremium = 0

    bimaData.forEach((premium: any) => {
      let total = 0
      if (premium.clientCode === '25' || premium.clientCode === '70') {
        total = premium.premiums + premium.earthQuake + premium.PVTPremium
        intermediaryPremium += total
      } else if (premium.clientCode === '15') {
        total = premium.premiums + premium.earthQuake + premium.PVTPremium
        directPremium += total
      }
    })

    bimaData.forEach((premium: any) => {
      let total = 0
      if (premium.motorCode === '070' || premium.motorCode === '080') {
        total = premium.premiums + premium.earthQuake + premium.PVTPremium
        motorPremium += total
      } else {
        total = premium.premiums + premium.earthQuake + premium.PVTPremium
        nonMotorPremium += total
      }
    })

    const totalPremium = bimaData.reduce((total: number, premium: any) => {
      return total + premium.premiums + premium.earthQuake + premium.PVTPremium
    }, 0)

    const commision = bimaData.reduce((total: number, premium: any) => {
      return total + premium.brokerComm
    }, 0)

    return {
      totalPremium,
      commision,
      nonMotorPremium,
      motorPremium,
      intermediaryPremium,
      directPremium,
    }
  }
  const {
    totalPremium,
    commision,
    nonMotorPremium,
    motorPremium,
    intermediaryPremium,
    directPremium,
  } = calculatePremiums(bimaData)

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

  const calculateProductionData = (productionData: IProduction[]) => {
    const totalRenewals = productionData.reduce(
      (total: number, production) => total + Number(production.renewals),
      0,
    )
    const totalNewBusiness = productionData.reduce(
      (total: number, production) => total + Number(production.newBusiness),
      0,
    )
    return { totalNewBusiness, totalRenewals }
  }
  const { totalNewBusiness, totalRenewals } = calculateProductionData(
    productionData,
  )

  const calculateClientsData = (clients: IClients[]) => {
    let broker = 0
    let agents = 0

    clients.forEach((client) => {
      const totalClients = client.totalClients
      if (client.clientCode === '70') {
        broker += totalClients
      } else if (client.clientCode === '25') {
        agents += totalClients
      }
    })
    const allClients = clients.reduce(
      (total: number, client) => total + client.totalClients,
      0,
    )

    return {
      broker,
      agents,
      allClients,
    }
  }
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

  const { broker, agents, allClients } = calculateClientsData(clients)

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
  const calculateUnrenewedPolicies = (
    unrenewedPolicies: IUnrenewedPolicies[],
  ) => {
    const nonMotorUnrenewed = unrenewedPolicies.reduce(
      (total: number, unrenewed) => total + unrenewed.nonMotorAmount,
      0,
    )
    const motorRenewed = unrenewedPolicies.reduce(
      (total: number, unrenewed) => total + unrenewed.motorAmount,
      0,
    )
    return {
      nonMotorUnrenewed,
      motorRenewed,
    }
  }
  const calculateUndebitedPolicies = (
    undebitedPolicies: IUndebitedPolicies[],
  ) => {
    let motorUndebited = 0
    let nonMotorUndebited = 0

    undebitedPolicies.forEach((policy) => {
      const totalPremium = policy.totalPremium
      if (policy.premiumCode === '080' || policy.premiumCode === '070') {
        motorUndebited += totalPremium
      } else {
        nonMotorUndebited += totalPremium
      }
    })
    return { nonMotorUndebited, motorUndebited }
  }

  const calculateSalvages = (salvages: any) => {
    const totalSalvages = salvages.reduce(
      (total: number, salvage: any) => total + salvage.receiptAmount,
      0,
    )
    return { totalSalvages }
  }
  const calculateRecovery = (recovery: IRecovery[]) => {
    const totalRecovery = recovery.reduce(
      (total: number, recovery) =>
        total + recovery.treatyAmount + recovery.facAmount + recovery.xolAmount,
      0,
    )
    return { totalRecovery }
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

  const { totalRecovery } = calculateRecovery(recovery)
  const { totalSalvages } = calculateSalvages(salvages)

  const { nonMotorUndebited, motorUndebited } = calculateUndebitedPolicies(
    undebitedPolicies,
  )

  const {
    totalOutstanding,
    motorOutstanding,
    nonMotorOutstanding,
  } = calculateOutstandingClaims(outstandingClaims)
  const { nonMotorUnrenewed, motorRenewed } = calculateUnrenewedPolicies(
    unrenewedPolicies,
  )

  function calculateDirectClients(data: any) {
    const totalDirectClients = data.reduce(
      (acc: number, direct: any) => acc + direct.totalClients,
      0,
    )
    return { totalDirectClients }
  }
  const { totalDirectClients } = calculateDirectClients(directClients)

  return (
    <Context.Provider
      value={{
        login,
        logout,
        isAuthenticated,

        totalPremium,
        totalNewBusiness,
        totalRenewals,
        totalClaimPaid,
        claimsData,
        motorPaidClaims,
        nonMotorPaidClaims,
        commision,
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
        component,
        setComponent,
        totalRegisteredClaims,
        nonMotorRegisteredClaims,
        motorRegisteredClaims,
        totalOutstanding,
        motorOutstanding,
        nonMotorOutstanding,
        nonMotorUnrenewed,
        motorRenewed,
        nonMotorUndebited,
        motorUndebited,
        totalSalvages,
        totalRecovery,
        receiptResults,
        bimaData,
        productionData,
        unrenewedPolicies,
        undebitedPolicies,
        registeredClaims,
        outstandingClaims,
        salvages,
        recovery,
        reinsurance,
        totalDirectClients,
        loadingBimaData,
        loadingClaimsData,
        loadingRegisteredClaims,
        loadingOutstandingClaims,
        loadingProductionData,
        loadingClients,
        loadingUnrenewedPolicies,
        loadingUndebitedPolicies,
        loadingSalvages,
        loadingRecovery,
        loadingReceipts,
        loadingCompanys,
        loadingDirectClients,
        loadingBankBalances,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export const useContextApi = () => useContext(Context)

export default ContextProvider
