'use client'
import React, { useEffect, useState, JSX } from 'react'
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
        const decodedToken: any = jwtDecode(accessToken)
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
  }: any = useContextApi()

  const [lastDayOfMonth, setLastDayOfMonth] = useState('')
  const [today, setToday] = useState('')
  const [fmDate, setFmDate] = useState('')
  const [toDate, setTdDate] = useState('')
  const [loading, setLoading] = useState(false)
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
    setTdDate(formattedToDate)
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
    setFmDate(formattedToDate)
  }

  const handleRunReports = () => {
    if (checkDate === true) {
      alert('Please select from date and to date')
    } else {
      setLoading(true)
      const id = setTimeout(() => {
        setLoading(false) // After 2 seconds, set loading to false
      }, 5000)
      setTimeoutId(id) // Store the timeout ID
      setFromDate(fmDate)
      setToDate(toDate)
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

  const checkDate = fmDate.split('-').join('') === 'undefinedundefined'

  return (
    <div className="mt-[20px] ml-4 flex flex-col justify-center">
      <div className="top-0  z-0 flex sm:flex-col md:flex-row gap-2 items-center">
        <CustomSelect
          defaultValue={{ label: 'Entire Company', value: '' }}
          options={formattedCompanys}
          onChange={(value: { value: string; label: string }) => {
            setBranchCode(value.value)
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
          name={loading ? 'Running...' : 'Run'}
          disabled={loading}
          className={
            'bg-[#cb7229] text-white h-[40px] md:w-[152px] sm:w-[20rem] flex justify-center items-center mt-8 rounded-md'
          }
          onClick={handleRunReports}
        />
      </div>
      <div className="flex ">
        {loading ? (
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
        ) : (
          renderComponent()
        )}
      </div>
    </div>
  )
}

export default Dashboard
