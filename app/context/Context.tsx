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

const Context = createContext({})
const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [branchCode, setBranchCode] = useState('')
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')
  const [years, setYears] = useState([])
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
  const [cmLossRatio, setCmLossRatio] = useState([])
  const [riCession, setRiCession] = useState([])
  const [riPaidCession, setRiPaidCession] = useState([])
  const [riCessionReport, setRiCessionReport] = useState([])
  const [riPaidCessionReport, setRiPaidCessionReport] = useState([])
  const [riOutstandingCessionReport, setRiOutstandingCessionReport] = useState(
    [],
  )
  const [directClients, setDirectClients] = useState([])
  const [loadingData, setLoadingData] = useState(false)

  useEffect(() => {
    const { currentYear, lastYear } = getDates()
    setFromDate(currentYear.startDate)
    setToDate(currentYear.endDate)
  }, [])

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
      const token = localStorage.getItem('accessToken')
      return token !== null
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoadingData(true)
      try {
        const [
          directClientsResponse,
          outstandingRiCessionReportsResponse,
          RIPaidCessionReportsResponse,
          RICessionReportsResponse,
          RIPaidCessionResponse,
          RICessionResponse,
          bimaDataResponse,
          orgBranchesResponse,
          claimsResponse,
          registeredClaimsResponse,
          outstandingClaimsResponse,
          productionPerUnitResponse,
          entityClientsResponse,
          unrenewedPoliciesResponse,
          undebitedPoliciesResponse,
          salvagesResponse,
          recoveriesResponse,
          ARReceiptsResponse,
          reinsuranceResponse,
          lossRatioResponse,
        ] = await Promise.all([
          axios.get(`${LOCAL_URL}/direct-clients?branchCode=${branchCode}`),
          axios.get(
            `${LOCAL_URL}/ri-outstanding-cession-report?toDate=${toDate}&branchCode=${branchCode}`,
          ),
          axios.get(
            `${LOCAL_URL}/ri-paid-cession-report?fromDate=${fromDate}&toDate=${toDate}&branchCode=${branchCode}`,
          ),
          axios.get(
            `${LOCAL_URL}/ri-cessions-register?fromDate=${fromDate}&toDate=${toDate}&branchCode=${branchCode}`,
          ),
          axios.get(
            `${LOCAL_URL}/ri-paid-cession-sum?fromDate=${fromDate}&toDate=${toDate}&branchCode=${branchCode}`,
          ),
          axios.get(
            `${LOCAL_URL}/ri-cessions?fromDate=${fromDate}&toDate=${toDate}&branchCode=${branchCode}`,
          ),
          axios.get(
            `${LOCAL_URL}/underwriting?fromDate=${fromDate}&toDate=${toDate}&branchCode=${branchCode}`,
          ),
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
            `${LOCAL_URL}/production?fromDate=${fromDate}&toDate=${toDate}&branchCode=${branchCode}`,
          ),
          axios.get(`${LOCAL_URL}/clients?branchCode=${branchCode}`),
          axios.get(
            `${LOCAL_URL}/unrenewed-policies?fromDate=${fromDate}&toDate=${toDate}&branchCode=${branchCode}`,
          ),
          axios.get(
            `${LOCAL_URL}/undebited-policies?fromDate=${fromDate}&toDate=${toDate}&branchCode=${branchCode}`,
          ),
          axios.get(
            `${LOCAL_URL}/salvages?fromDate=${fromDate}&toDate=${toDate}&branchCode=${branchCode}`,
          ),
          axios.get(
            `${LOCAL_URL}/recovery?fromDate=${fromDate}&toDate=${toDate}&branchCode=${branchCode}`,
          ),
          axios.get(
            `${LOCAL_URL}/AR-receipts?fromDate=${fromDate}&toDate=${toDate}&branchCode=${branchCode}`,
          ),
          axios.get(
            `${LOCAL_URL}/reinsurance?fromDate=${fromDate}&toDate=${toDate}&branchCode=${branchCode}`,
          ),
          axios.get(
            `${LOCAL_URL}/cm-loss-ratio?fromDate=2024&toDate=2024&branchCode=${branchCode}`,
          ),
        ])

        setDirectClients(directClientsResponse.data.result)
        setRiOutstandingCessionReport(
          outstandingRiCessionReportsResponse.data.result,
        )
        setRiPaidCessionReport(RIPaidCessionReportsResponse.data.result)
        setRiCessionReport(RICessionReportsResponse.data.result)
        setRiPaidCession(RIPaidCessionResponse.data.result)
        setRiCession(RICessionResponse.data.result)
        setBimaData(bimaDataResponse.data.result)
        setCompanys([
          { organization_name: 'Entire Company', organization_code: '' },
          ...orgBranchesResponse.data.result,
        ])
        setClaimsData(claimsResponse.data.result)
        setRegisteredClaims(registeredClaimsResponse.data.result)
        setOutstandingClaims(outstandingClaimsResponse.data.result)
        setProductionData(productionPerUnitResponse.data.result)
        setClients(entityClientsResponse.data.result)
        setUnrenewedPolicies(unrenewedPoliciesResponse.data.result)
        setUndebitedPolicies(undebitedPoliciesResponse.data.result)
        setSalvages(salvagesResponse.data.result)
        setRecovery(recoveriesResponse.data.result)
        setReceipts(ARReceiptsResponse.data.result)
        setReinsurance(reinsuranceResponse.data.result)
        setCmLossRatio(lossRatioResponse.data.result)
        setLoadingData(false)
      } catch (error) {
        setLoadingData(false)

        console.error('Error fetching data', error)
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

  const filteredLossRation = cmLossRatio.filter((claim: any) => {
    return claim.cm_order_no === 10
  })
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
        setBranchCode,
        fromDate,
        branchCode,
        toDate,
        setFromDate,
        setToDate,
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
        years,
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
        filteredLossRation,
        riCession,
        riPaidCession,
        riCessionReport,
        riPaidCessionReport,
        riOutstandingCessionReport,
        totalDirectClients,
        loadingData,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export const useContextApi = () => useContext(Context)

export default ContextProvider
