'use client'
import { IBranches } from '@/app/assets/interfaces'
import { ClaimsContext } from '@/app/context/ClaimsContext'
import { useContextApi } from '@/app/context/Context'
import CustomButton from '@/app/UI/reusableComponents/CustomButton'
import CustomCard from '@/app/UI/reusableComponents/CustomCard'
import CustomSelect from '@/app/UI/reusableComponents/CustomSelect'
import { LoadingOutlined } from '@ant-design/icons'
import { DatePicker, Spin } from 'antd'
import { useRouter } from 'next/navigation'
import React, { useContext, useState } from 'react'

const Claims = () => {
  const {
    totalClaimPaid,
    totalRegisteredClaims,
    totalOutstanding,
    totalSalvages,
    nonMotorRegisteredClaims,
    motorRegisteredClaims,
    filteredLossRation,
    motorOutstanding,
    motorPaidClaims,
    nonMotorPaidClaims,
    nonMotorOutstanding,
    year: _year,

    companys,

    setCompany,
    loadingData,
    fetchClaimsData,
  }: any = useContext(ClaimsContext)

  const [branchCode, setBranchCode] = useState('')
  const [fmDate24, setFmDate24] = useState('')
  const [toDate24, setTdDate24] = useState('')

  const router = useRouter()
  const totalLossRatio = filteredLossRation.reduce(
    (acc: number, ratio: any) => {
      return ratio.total !== null ? acc + Number(ratio.total) : acc
    },
    0,
  )
  const nonMotorAmountPercantage = Math.round(
    (nonMotorPaidClaims / totalClaimPaid) * 100,
  )
  const motorAmountPercantage = Math.round(
    (motorPaidClaims / totalClaimPaid) * 100,
  )
  const motorOutstandingPerc = Math.round(
    (motorOutstanding / totalOutstanding) * 100,
  )
  const nonMotorOutstandingPerc = Math.round(
    (nonMotorOutstanding / totalOutstanding) * 100,
  )

  const nonMotorRegisteredPerc = Math.round(
    (nonMotorRegisteredClaims / totalRegisteredClaims) * 100,
  )
  const motorRegisteredPerc = Math.round(
    (motorRegisteredClaims / totalRegisteredClaims) * 100,
  )

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
          <p className="text-[#cb7229]">
            Fetching all claims data this might take time...
          </p>
        </div>
      </div>
    )
  }

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

  const formattedCompanys: [] = companys.map((company: IBranches) => {
    return {
      label: company.organization_name,
      value: company.organization_code,
    }
  })

  const handleToDate = (date: any, dateString: any) => {
    const [day, month, year] = dateString.split('-')
    let formattedMonth: any = ''
    if (month < 10) {
      formattedMonth = months[month.toString().slice(1) - 1]
    } else {
      formattedMonth = months[Number(month - 1)]
    }
    const formattedToDate = day + '-' + formattedMonth + '-' + year

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

    setFmDate24(formattedToDate)
  }

  const handleRunReports = async () => {
    if (fmDate24.length !== 11 || toDate24.length !== 11) {
      alert('Please select from date and to date')
    } else {
      await fetchClaimsData(fmDate24, toDate24, branchCode)
    }
  }

  return (
    <div>
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
          name={'Run'}
          className={
            'bg-[#cb7229] text-white h-[40px] md:w-[152px] sm:w-[20rem] flex justify-center items-center mt-8 rounded-md'
          }
          onClick={handleRunReports}
        />
      </div>
      <div className="flex flex-wrap gap-3 h-auto  overflow-auto  border-b-slate-800 p-2">
        <div
          className={`md:h-[130px] sm:h-[130px] w-[450px] border cursor-pointer rounded-md p-[20px]`}
          onClick={() => router.push('/dashboard/claims/registeredClaims')}
        >
          <div className="flex flex-col gap-1">
            <p className="text-[18px] font-bold flex justify-center">
              TOTAL {totalRegisteredClaims.toLocaleString()}
            </p>
            <div className="flex justify-between text-[15px]">
              <p>{'Motor'.toUpperCase()}</p>
              <p>{'Non Motor'.toUpperCase()}</p>
            </div>
            <div className="flex justify-between text-[14px]">
              <p className="font-bold ">
                {motorRegisteredClaims.toLocaleString()}
              </p>
              <p className="font-bold text-[14px]">{motorRegisteredPerc}%</p>
              <p className="font-bold text-[14px]">
                {nonMotorRegisteredClaims.toLocaleString()}
              </p>
              <p className="font-bold text-[14px]">{nonMotorRegisteredPerc}%</p>
            </div>
            <p className="text-[14px] flex justify-center font-bold">
              {'Registered Claims'.toUpperCase()}
            </p>
          </div>
        </div>
        <div
          className={`md:h-[130px] sm:h-[130px] w-[450px] border cursor-pointer rounded-md p-[20px]`}
          onClick={() => router.push('/dashboard/claims/paidClaims')}
        >
          <div className="flex flex-col gap-1">
            <p className="text-[18px] font-bold flex justify-center items-center">
              TOTAL {totalClaimPaid.toLocaleString()}
            </p>
            <div className="flex justify-between text-[15px]">
              <p>{'Non Motor'.toUpperCase()}</p>
              <p>{' Motor'.toUpperCase()}</p>
            </div>
            <div className="flex justify-between text-[14px]">
              <p className="font-bold ">
                {Math.floor(nonMotorPaidClaims).toLocaleString()}
              </p>
              <p className="font-bold text-[14px]">
                {nonMotorAmountPercantage}%
              </p>
              <p className="font-bold text-[14px]">
                {Math.floor(motorPaidClaims).toLocaleString()}
              </p>
              <p className="font-bold text-[14px]">{motorAmountPercantage}%</p>
            </div>
            <p className="text-[14px] flex justify-center font-bold ">
              {'Paid Claims'.toUpperCase()}
            </p>
          </div>
        </div>

        <div
          className={`md:h-[130px] sm:h-[130px] w-[450px] border cursor-pointer  rounded-md p-[20px]`}
          onClick={() => router.push('/dashboard/claims/outstandingClaims')}
        >
          <div className="flex flex-col gap-1">
            <p className="text-[18px] font-bold flex justify-center">
              TOTAL {totalOutstanding.toLocaleString()}
            </p>
            <div className="flex justify-between text-[15px]">
              <p>{'Motor'.toUpperCase()}</p>
              <p>{'Non Motor'.toUpperCase()}</p>
            </div>
            <div className="flex justify-between text-[14px]">
              <p className="font-bold ">{motorOutstanding.toLocaleString()}</p>
              <p className="font-bold text-[14px]">{motorOutstandingPerc}%</p>
              <p className="font-bold text-[14px]">
                {nonMotorOutstanding.toLocaleString()}
              </p>
              <p className="font-bold text-[14px]">
                {nonMotorOutstandingPerc}%
              </p>
            </div>
            <p className="text-[14px] flex justify-center font-bold">
              {'Outstanding Claims'.toUpperCase()}
            </p>
          </div>
        </div>
        <CustomCard
          link={'/dashboard/claims/salvages'}
          name={'Salvages'}
          totalNumber={0}
          total={totalSalvages}
          currency
        />
        <CustomCard
          name={'Loss Ratio'}
          totalNumber={0}
          total={totalLossRatio}
          perc
          link={''}
        />
      </div>
    </div>
  )
}

export default Claims
