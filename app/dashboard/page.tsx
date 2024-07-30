'use client'
import React, { useEffect, useState, JSX, useContext } from 'react'
import { useContextApi } from '../context/Context'
import CustomSelect from '../UI/reusableComponents/CustomSelect'
import { IBranches } from '../assets/interfaces'
import Claims from './claims/page'
import Underwriting from './premiums/page'
import Finance from './finance/page'
import { DatePicker, Spin } from 'antd'
import CustomButton from '../UI/reusableComponents/CustomButton'
import { LoadingOutlined } from '@ant-design/icons'
import { useRouter } from 'next/navigation'
import { jwtDecode } from 'jwt-decode'
import Reinsurance from './reinsurance/page'
import Statistical from './statistical/page'
import { StatisticalContext } from '../context/StatisticalContext'

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

const Dashboard = () => {
  const { isAuthenticated }: any = useContextApi()
  const router = useRouter()

  useEffect(() => {
    const checkAuth = () => {
      if (typeof window !== 'undefined') {
        const currentTime = Math.floor(Date.now() / 1000)
        const accessToken: string | any = localStorage.getItem('accessToken')
        const decodedToken: any | string = jwtDecode(accessToken)
        if (!isAuthenticated() || currentTime > decodedToken.exp) {
          router.push('/')
        }
      }
    }
    checkAuth()
  }, [isAuthenticated, router])

  const {
    year: _year,
    setFromDate,
    toDate: _toDate,
    setToDate,
    companys,
    setBranchCode,
    setCompany,
    component,
    loadingData,
  }: any = useContextApi()

  const {
    setFromDate: _setFromDate,
    setFromDate23: _setFromDate23,
    setToDate: _setToDate,
    setToDate23: _setToDate23,
    setBranchCode: _setBranchCode,
  }: any = useContext(StatisticalContext)

  const [today, setToday] = useState('')
  const [fmDate23, setFmDate23] = useState('')
  const [toDate23, setTdDate23] = useState('')
  const [fmDate24, setFmDate24] = useState('')
  const [toDate24, setTdDate24] = useState('')
  const [timeoutId, setTimeoutId] = useState<any>(null)

  const formattedCompanys: [] = companys.map((company: IBranches) => {
    return {
      label: company.organization_name,
      value: company.organization_code,
    }
  })

  const renderComponent = () => {
    switch (component) {
      case 'Underwriting':
        return <Underwriting />
      case 'Claims':
        return <Claims />
      case 'Finance':
        return <Finance />
      case 'Reinsurance':
        return <Reinsurance />
      case 'Statistical':
        return <Statistical />
      default:
        break
    }
  }

  const handleToDate = (date: any, dateString: any) => {
    const [day, month, year] = dateString.split('-')
    let formattedMonth: any = ''
    if (month < 10) {
      formattedMonth = months[month.toString().slice(1) - 1]
    } else {
      formattedMonth = months[Number(month - 1)]
    }
    const formattedToDate = day + '-' + formattedMonth + '-' + year
    const formattedToDate23 = day + '-' + formattedMonth + '-' + 2023

    setTdDate23(formattedToDate23)
    setTdDate24(formattedToDate)
  }

  const handleFromDate = (date: any, dateString: any) => {
    const [day, month, year] = dateString.split('-')
    let formattedMonth: any = ''
    if (month < 10) {
      formattedMonth = months[month.toString().slice(1) - 1]
    } else {
      formattedMonth = months[Number(month - 1)]
    }
    const formattedToDate = day + '-' + formattedMonth + '-' + year
    const formattedToDate23 = day + '-' + formattedMonth + '-' + 2023
    setFmDate23(formattedToDate23)
    setFmDate24(formattedToDate)
  }

  const handleRunReports = () => {
    if (checkDate === true) {
      alert('Please select from date and to date')

      setFromDate(fmDate24)
      _setFromDate(fmDate24)
      _setToDate(toDate24)
      setToDate(toDate24), _setFromDate23(fmDate23), _setToDate23(toDate23)
    }
  }

  useEffect(() => {
    return () => {
      // Cleanup function to clear timeout when component unmounts
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [timeoutId])

  const checkDate = fmDate24.split('-').join('') === 'undefinedundefined'

  if (loadingData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col gap-2">
          <Spin
            indicator={
              <LoadingOutlined
                style={{
                  fontSize: 60,
                  color: '#cb7229',
                }}
                spin
              />
            }
          />{' '}
          <p className="text-[#cb7229]">Fetching data.....</p>
        </div>
      </div>
    )
  }

  return (
    <div className="mt-[20px] ml-4 flex flex-col justify-center">
      <div className="top-0  z-0 flex sm:flex-col md:flex-row gap-2 items-center">
        <CustomSelect
          defaultValue={{ label: 'Entire Company', value: '' }}
          options={formattedCompanys}
          onChange={(value: { value: string; label: string }) => {
            setBranchCode(value.value)
            _setBranchCode(value.value)
            setCompany(value.label)
          }}
          className="w-[330px] ml-3"
          name="Company"
        />
        <div className="flex flex-col mt-2">
          <label>From date</label>
          <DatePicker
            format={'DD-MM-YYYY'}
            placeholder={'DD-MM-YYYY'}
            className={
              'md:w-[250px] sm:w-[20rem] h-[40px] border p-2 rounded-md'
            }
            onChange={handleFromDate}
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
            onChange={handleToDate}
          />
        </div>
        <CustomButton
          name={loadingData ? 'Running...' : 'Run'}
          disabled={loadingData}
          className={
            'bg-[#cb7229] text-white h-[40px] md:w-[152px] sm:w-[20rem] flex justify-center items-center mt-8 rounded-md'
          }
          onClick={handleRunReports}
        />
      </div>
      <div className="flex flex-wrap ">{renderComponent()}</div>
    </div>
  )
}

export default Dashboard
