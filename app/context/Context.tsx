'use client'
import axios from 'axios'
import React, { toDate24, useEffect, useState } from 'react'
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

const Context = createContext({})
const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const localUrl = 'http://localhost:5002/bima/perfomance'
  const [branchCode, setBranchCode] = useState('')
  const [fromDate, setFromDate] = useState('1-jan-2024')
  const [toDate, setToDate] = useState('31-dec-2024')
  const [fromDate23, setFromDate23] = useState('1-jan-2023')
  const [toDate23, setToDate23] = useState('31-dec-2023')
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

  const login = async (username: any, password: any) => {
    try {
      const response = await axios.post(`${localUrl}/login`, {
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
    const fetchDirectClients = async () => {
      const { data } = await axios.get(
        `${localUrl}/direct-clients?branchCode=${branchCode}`,
      )
      setDirectClients(data.result)
    }
    fetchDirectClients()
  }, [branchCode])
  useEffect(() => {
    const fetchOutstandingRiCessionReports = async () => {
      const { data } = await axios.get(
        `${localUrl}/ri-outstanding-cession-report?toDate=${toDate}&branchCode=${branchCode}`,
      )
      setRiOutstandingCessionReport(data.result)
    }
    fetchOutstandingRiCessionReports()
  }, [, toDate, branchCode])

  useEffect(() => {
    const fetchRIPaidCessionReports = async () => {
      const { data } = await axios.get(
        `${localUrl}/ri-paid-cession-report?fromDate=${fromDate}&toDate=${toDate}&branchCode=${branchCode}`,
      )
      setRiPaidCessionReport(data.result)
    }
    fetchRIPaidCessionReports()
  }, [fromDate, toDate, branchCode])
  useEffect(() => {
    const fetchRICessionReports = async () => {
      const { data } = await axios.get(
        `${localUrl}/ri-cessions-register?fromDate=${fromDate}&toDate=${toDate}&branchCode=${branchCode}`,
      )
      setRiCessionReport(data.result)
    }
    fetchRICessionReports()
  }, [fromDate, toDate, branchCode])

  useEffect(() => {
    const fetchRIPaidCession = async () => {
      const { data } = await axios.get(
        `${localUrl}/ri-paid-cession-sum?fromDate=${fromDate}&toDate=${toDate}&branchCode=${branchCode}`,
      )
      setRiPaidCession(data.result)
    }
    fetchRIPaidCession()
  }, [fromDate, toDate, branchCode])

  useEffect(() => {
    const fetchRICession = async () => {
      const { data } = await axios.get(
        `${localUrl}/ri-cessions?fromDate=${fromDate}&toDate=${toDate}&branchCode=${branchCode}`,
      )
      setRiCession(data.result)
    }
    fetchRICession()
  }, [fromDate, toDate, branchCode])

  useEffect(() => {
    const fetchBimaData = async () => {
      const { data } = await axios.get(
        `${localUrl}/underwriting?fromDate=${fromDate}&toDate=${toDate}&branchCode=${branchCode}`,
      )
      setBimaData(data.result)
    }
    fetchBimaData()
  }, [fromDate, toDate, branchCode])

  useEffect(() => {
    const fetchOrgBranches = async () => {
      const { data } = await axios.get(`${localUrl}/branches`)
      setCompanys([
        { organization_name: 'Entire Company', organization_code: '' },
        ...data.result,
      ])
    }
    fetchOrgBranches()
  }, [])

  useEffect(() => {
    const fetchClaims = async () => {
      const { data } = await axios.get(
        `${localUrl}/claims?fromDate=${fromDate}&toDate=${toDate}&branchCode=${branchCode}`,
      )
      setClaimsData(data.result)
    }
    fetchClaims()
  }, [fromDate, toDate, branchCode])

  useEffect(() => {
    const fetchRegisteredClaims = async () => {
      const { data } = await axios.get(
        `${localUrl}/registered-claims?fromDate=${fromDate}&toDate=${toDate}&branchCode=${branchCode}`,
      )
      setRegisteredClaims(data.result)
    }
    fetchRegisteredClaims()
  }, [fromDate, toDate, branchCode])
  useEffect(() => {
    const fetchOutStandingClaims = async () => {
      const { data } = await axios.get(
        `${localUrl}/outstanding-claims?branchCode=${branchCode}&toDate=${toDate}&fromDate=${fromDate}`,
      )
      setOutstandingClaims(data.result)
    }
    fetchOutStandingClaims()
  }, [fromDate, toDate, branchCode])
  useEffect(() => {
    const fetchProductionPerUnit = async () => {
      const { data } = await axios.get(
        `${localUrl}/production?fromDate=${fromDate}&toDate=${toDate}&branchCode=${branchCode}`,
      )
      setProductionData(data.result)
    }
    fetchProductionPerUnit()
  }, [fromDate, toDate, branchCode])

  useEffect(() => {
    const fetchEntityClients = async () => {
      const { data } = await axios.get(
        `${localUrl}/clients?branchCode=${branchCode}`,
      )
      setClients(data.result)
    }
    fetchEntityClients()
  }, [fromDate, toDate, branchCode])
  useEffect(() => {
    const fetchUnrenewedPolicies = async () => {
      const { data } = await axios.get(
        `${localUrl}/unrenewed-policies?fromDate=${fromDate}&toDate=${toDate}&branchCode=${branchCode}`,
      )
      setUnrenewedPolicies(data.result)
    }
    fetchUnrenewedPolicies()
  }, [fromDate, toDate, branchCode])
  useEffect(() => {
    const fetchUndebitedPolicies = async () => {
      const { data } = await axios.get(
        `${localUrl}/undebited-policies?fromDate=${fromDate}&toDate=${toDate}&branchCode=${branchCode}`,
      )
      setUndebitedPolicies(data.result)
    }
    fetchUndebitedPolicies()
  }, [fromDate, toDate, branchCode])
  useEffect(() => {
    const fetchSalvages = async () => {
      const { data } = await axios.get(
        `${localUrl}/salvages?fromDate=${fromDate}&toDate=${toDate}&branchCode=${branchCode}`,
      )
      setSalvages(data.result)
    }
    fetchSalvages()
  }, [fromDate, toDate, branchCode])
  useEffect(() => {
    const fetchRecoveries = async () => {
      const { data } = await axios.get(
        `${localUrl}/recovery?fromDate=${fromDate}&toDate=${toDate}&branchCode=${branchCode}`,
      )
      setRecovery(data.result)
    }
    fetchRecoveries()
  }, [fromDate, toDate, branchCode])
  useEffect(() => {
    const fetchARreceipts = async () => {
      const { data } = await axios.get(
        `${localUrl}/AR-receipts?fromDate=${fromDate}&toDate=${toDate}&branchCode=${branchCode}`,
      )
      setReceipts(data.result)
    }
    fetchARreceipts()
  }, [fromDate, toDate, branchCode])
  useEffect(() => {
    const fetchReinsurance = async () => {
      const { data } = await axios.get(
        `${localUrl}/reinsurance?fromDate=${fromDate}&toDate=${toDate}&branchCode=${branchCode}`,
      )
      setReinsurance(data.result)
    }
    fetchReinsurance()
  }, [fromDate, toDate, branchCode])

  useEffect(() => {
    const fetchLossRatio = async () => {
      const { data } = await axios.get(
        `${localUrl}/cm-loss-ratio?fromDate=${fromDate}&toDate=${toDate}&branchCode=${branchCode}`,
      )
      setCmLossRatio(data.result)
    }
    fetchLossRatio()
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
      console.log('claim', claim)
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
        fromDate23,
        setFromDate23,
        setToDate23,
        toDate24,
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
      }}
    >
      {children}
    </Context.Provider>
  )
}

export const useContextApi = () => useContext(Context)

export default ContextProvider
