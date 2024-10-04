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
