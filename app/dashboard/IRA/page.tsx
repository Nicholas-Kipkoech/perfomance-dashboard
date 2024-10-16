'use client'

import CustomButton from '@/app/UI/reusableComponents/CustomButton'
import { DatePicker } from 'antd'
import React, { useState } from 'react'
import {
  fetchIRABusinessForce,
  fetchIRACommisions,
  fetchIRAIncuredClaims,
  fetchIRAPremiumRegister,
  fetchIRAPremiums,
  fetchIRAPremiumsCounty,
  fetchIRAReinsurancePremiums,
  fetchIRAUnearnedPremiums,
} from './Services'
import dayjs from 'dayjs'
import { getDates } from '../premiums/helpers'

const IRAService = () => {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]
  const { currentMonth } = getDates()
  const [state, setState] = useState({
    fromDate: currentMonth.startDate,
    toDate: currentMonth.endDate,
    loading: '',
    messages: {} as { [key: string]: string },
  })

  const formatDate = (dateString: string) => {
    const [day, month, year] = dateString.split('-')
    const formattedMonth = months[Number(month) - 1]
    return `${day}-${formattedMonth}-${year}`
  }

  const handleDateChange = (key: 'fromDate' | 'toDate') => (
    date: dayjs.Dayjs,
    dateString: any,
  ) => {
    setState((prev) => ({
      ...prev,
      [key]: formatDate(dateString),
    }))
  }

  const handleFetchData = async (
    fetchFunction: any,
    name: string,
    successMessage: string,
  ) => {
    const { fromDate, toDate } = state

    if (!fromDate || !toDate) {
      alert('Please select from date and to date')
      return
    }

    setState((prev) => ({
      ...prev,
      loading: name,
      messages: { ...prev.messages, [name]: '' },
    }))

    try {
      const data = await fetchFunction(fromDate, toDate)
      if (data.message === 'Data written successfully') {
        setState((prev) => ({
          ...prev,
          messages: { ...prev.messages, [name]: successMessage },
        }))
      }
    } catch (error) {
      setState((prev) => ({
        ...prev,
        messages: {
          ...prev.messages,
          [name]: 'An error occurred while fetching data.',
        },
      }))
      console.error(error)
    } finally {
      setState((prev) => ({ ...prev, loading: '' }))
    }
  }

  const apiFunctions = [
    {
      fetchFunction: fetchIRAPremiums,
      name: 'Write to excel: IRA Premiums: [59-1B (a)]',
      successMessage: 'IRA Premiums written to Excel successfully!',
    },
    {
      fetchFunction: fetchIRABusinessForce,
      name: 'Write to excel: Business Force: [59-11B]',
      successMessage: 'Business Force data written to Excel successfully!',
    },
    {
      fetchFunction: fetchIRACommisions,
      name: 'Write to excel: IRA-commissions: [59-1B (d)]',
      successMessage: 'IRA commissions data written to Excel successfully!',
    },
    {
      fetchFunction: fetchIRAPremiumsCounty,
      name: 'Write to excel: Premiums By County: [18-1F]',
      successMessage:
        'IRA Premiums By county data written to Excel successfully!',
    },
    {
      fetchFunction: fetchIRAIncuredClaims,
      name: 'Write to excel: Inclured Claims: [59-3B]',
      successMessage: 'IRA Incured claims data written to Excel successfully!',
    },
    {
      fetchFunction: fetchIRAUnearnedPremiums,
      name: 'Write to excel: Unearned Premiums:[59-1B (c)]',
      successMessage: 'Unearned Premiums data written to Excel successfully!',
    },
    {
      fetchFunction: fetchIRAReinsurancePremiums,
      name: 'Write to excel: Reinsurance Premiums: [59-1B (c)]',
      successMessage:
        'Reinsurance Premiums data written to Excel successfully!',
    },
    {
      fetchFunction: fetchIRAPremiumRegister,
      name: 'Write to excel: Premium register: [70-3A]',
      successMessage: 'Premium register data written to Excel successfully!',
    },
  ]

  const handleSequentialFetch = async () => {
    for (const api of apiFunctions) {
      await handleFetchData(api.fetchFunction, api.name, api.successMessage)
    }
  }

  const CustomCard = ({ fetchFunction, name, successMessage }: any) => {
    const { loading, messages } = state
    return (
      <div className="flex gap-10 border w-full p-2 items-center rounded-md justify-between">
        <div className="flex gap-2 items-center">
          <span>{name}</span>
          <span className="text-[12px] text-green-700 italic">
            {messages[name]}
          </span>
        </div>
        <CustomButton
          name={loading === name ? 'Submitting' : 'Submit to IRA'}
          disabled={loading !== ''}
          onClick={() => handleFetchData(fetchFunction, name, successMessage)}
          className={`h-[2rem] border w-[10rem] rounded-md ${
            loading === name ? 'bg-slate-500' : 'bg-[#cb7529]'
          } text-white`}
        />
      </div>
    )
  }

  const { fromDate, toDate } = state

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex justify-center flex-col">
        <p className="flex justify-center font-bold">
          Running Period [{fromDate}] - [{toDate}]
        </p>
        <div className="top-0 z-0 flex gap-2 items-center">
          <div className="flex flex-col mt-2">
            <label>From date</label>
            <DatePicker
              format="DD-MM-YYYY"
              placeholder="DD-MM-YYYY"
              className="md:w-[250px] sm:w-[20rem] h-[40px] border p-2 rounded-md"
              onChange={handleDateChange('fromDate')}
            />
          </div>
          <div className="flex flex-col mt-2">
            <label>To date</label>
            <DatePicker
              format="DD-MM-YYYY"
              placeholder="DD-MM-YYYY"
              className="md:w-[250px] sm:w-[20rem] h-[40px] border p-2 rounded-md"
              onChange={handleDateChange('toDate')}
            />
          </div>
        </div>
      </div>

      <div className="mt-10 flex flex-col gap-2">
        {apiFunctions.map((api) => (
          <CustomCard
            key={api.name}
            fetchFunction={api.fetchFunction}
            name={api.name}
            successMessage={api.successMessage}
          />
        ))}
      </div>

      <CustomButton
        name={state.loading ? 'Running all..' : 'Run all suquentially'}
        onClick={handleSequentialFetch}
        disabled={state.loading !== ''}
        className="mt-5 bg-blue-500 text-white p-2 rounded-md flex items-center mb-5"
      />
    </div>
  )
}

export default IRAService
