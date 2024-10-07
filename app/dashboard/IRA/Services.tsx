'use client'

import axios from 'axios'

export const ENDPOINT = 'http://localhost:8000/ira'

export const AxiosUtility = axios.create({
  baseURL: `${ENDPOINT}`,
  timeout: 240000,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const fetchIRAPremiums = async (fromDate: string, toDate: string) => {
  const res = await AxiosUtility.get(
    `/ira-premiums?fromDate=${fromDate}&toDate=${toDate}`,
  )
  return res?.data
}
export const fetchIRABusinessForce = async (
  fromDate: string,
  toDate: string,
) => {
  const res = await AxiosUtility.get(
    `/business-force?fromDate=${fromDate}&toDate=${toDate}`,
  )
  return res?.data
}

export const fetchIRACommisions = async (fromDate: string, toDate: string) => {
  const res = await AxiosUtility.get(
    `/ira-commisions?fromDate=${fromDate}&toDate=${toDate}`,
  )
  return res?.data
}

export const fetchIRAPremiumsCounty = async (
  fromDate: string,
  toDate: string,
) => {
  const res = await AxiosUtility.get(
    `/ira-premiums-county?fromDate=${fromDate}&toDate=${toDate}`,
  )
  return res?.data
}

export const fetchIRAIncuredClaims = async (
  fromDate: string,
  toDate: string,
) => {
  const res = await AxiosUtility.get(
    `/ira-incurred-claims?fromDate=${fromDate}&toDate=${toDate}`,
  )
  return res?.data
}

export const fetchIRAUnearnedPremiums = async (
  fromDate: string,
  toDate: string,
) => {
  const res = await AxiosUtility.get(
    `/ira-unearned-premiums?fromDate=${fromDate}&toDate=${toDate}`,
  )
  return res?.data
}

export const fetchIRAReinsurancePremiums = async (
  fromDate: string,
  toDate: string,
) => {
  const res = await AxiosUtility.get(
    `/ira-reinsurance-premiums?fromDate=${fromDate}&toDate=${toDate}`,
  )
  return res?.data
}
export const fetchIRAPremiumRegister = async (
  fromDate: string,
  toDate: string,
) => {
  const res = await AxiosUtility.get(
    `/ira-premiums-register?fromDate=${fromDate}&toDate=${toDate}`,
  )
  return res?.data
}
