'use client'
import CustomButton from '@/app/UI/reusableComponents/CustomButton'
import { DatePicker } from 'antd'
import React, { useState } from 'react'
import { fetchIRABusinessForce, fetchIRAPremiums } from './Services'
import dayjs from 'dayjs'

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

  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')
  const [loading, setLoading] = useState('')
  const [messages, setMessages] = useState<any>({})

  const formatDate = (dateString: string) => {
    const [day, month, year] = dateString.split('-')
    const formattedMonth = months[Number(month) - 1]
    return `${day}-${formattedMonth}-${year}`
  }

  const handleDateChange = (
    setter: React.Dispatch<React.SetStateAction<string>>,
  ) => (date: dayjs.Dayjs, dateString: string) => {
    setter(formatDate(dateString))
  }

  const handleFetchData = async (
    fetchFunction: any,
    name: string,
    successMessage: string,
  ) => {
    try {
      setMessages((prev: any) => ({ ...prev, [name]: '' }))
      setLoading(name)
      const data = await fetchFunction(fromDate, toDate)
      if (data.message === 'Data written successfully') {
        setMessages((prev: any) => ({ ...prev, [name]: successMessage }))
      }
    } catch (error) {
      setLoading('')
      setMessages((prev: any) => ({
        ...prev,
        [name]: 'An error occurred while fetching data.',
      }))
      console.error(error)
    } finally {
      setLoading('')
    }
  }

  interface IcustomCard {
    fetchFunction: any
    name: string
    successMessage: string
  }

  const CustomCard = ({ fetchFunction, name, successMessage }: IcustomCard) => {
    return (
      <div className="flex gap-10 border w-full p-2 items-center rounded-md">
        <span>{name}</span>
        <span>{messages[name]}</span>
        <CustomButton
          name={loading === name ? 'submitting' : 'Submit'}
          disabled={loading !== ''} // Disable button if any card is loading
          onClick={() => handleFetchData(fetchFunction, name, successMessage)}
          className={`h-[2rem] border w-[10rem] rounded-md ${
            loading === name ? `bg-slate-500` : `bg-[#cb7529]`
          } text-white`}
        />
      </div>
    )
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex justify-center flex-col">
        <p className="flex justify-center font-bold">
          Running Period [{fromDate}] - [{toDate}]
        </p>
        <div className="top-0  z-0 flex  gap-2 items-center">
          <div className="flex flex-col mt-2">
            <label>From date</label>
            <DatePicker
              format={'DD-MM-YYYY'}
              placeholder={'DD-MM-YYYY'}
              className={
                'md:w-[250px] sm:w-[20rem] h-[40px] border p-2 rounded-md'
              }
              onChange={handleDateChange(setFromDate)}
            />
          </div>
          <div className="flex flex-col mt-2">
            <label>To date</label>
            <DatePicker
              format={'DD-MM-YYYY'}
              placeholder={'DD-MM-YYYY'}
              className={
                'md:w-[250px] sm:w-[20rem] h-[40px] border p-2 rounded-md'
              }
              onChange={handleDateChange(setToDate)}
            />
          </div>
        </div>
      </div>

      <div className="mt-10 flex flex-col gap-2">
        <CustomCard
          successMessage={'IRA Premiums written to Excel successfully!'}
          name={'Write to excel: IRA Premiums'}
          fetchFunction={fetchIRAPremiums}
        />
        <CustomCard
          successMessage={'Business Force data written to Excel successfully!'}
          name={'Write to excel: Business Force'}
          fetchFunction={fetchIRABusinessForce}
        />
      </div>
    </div>
  )
}

export default IRAService
