'use client'
import { IBranches } from '@/app/assets/interfaces'
import { useContextApi } from '@/app/context/Context'
import CustomButton from '@/app/UI/reusableComponents/CustomButton'
import CustomCard from '@/app/UI/reusableComponents/CustomCard'
import CustomSelect from '@/app/UI/reusableComponents/CustomSelect'
import { LoadingOutlined } from '@ant-design/icons'
import { DatePicker, Spin } from 'antd'
import Link from 'next/link'
import React, { useState } from 'react'

const Underwriting = () => {
  const {
    year: _year,
    setFromDate,
    toDate: _toDate,
    setToDate,
    companys,
    setBranchCode,
    setCompany,
    totalPremium,
    totalNewBusiness,
    totalRenewals,
    nonMotorUnrenewed,
    reinsurance,
    totalDirectClients,
    allClients,
    nonMotorPremium,
    motorPremium,
    intermediaryPremium,
    directPremium,
    broker,
    agents,
    motorRenewed,
    nonMotorUndebited,
    motorUndebited,
    commision,
  }: any = useContextApi()

  const totalReinsurance = reinsurance.reduce(
    (total: number, reinsurance: any) =>
      Math.floor(total + reinsurance.netPremium),
    0,
  )

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

  const [fmDate24, setFmDate24] = useState('')
  const [toDate24, setTdDate24] = useState('')

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

  const handleRunReports = () => {
    if (fmDate24.length !== 11 || toDate24.length !== 11) {
      alert('Please select from date and to date')
    } else {
      setFromDate(fmDate24)
      setToDate(toDate24)
    }
  }

  interface IPremiumCard {
    name: string
    cummulativeTotal: number
    total: number
    color?: string
    link?: string
  }

  const CustomPremiumCard = ({
    name,
    cummulativeTotal,
    total,
    color,
    link,
  }: IPremiumCard) => {
    return (
      <Link
        href={`${link}`}
        style={{ backgroundColor: color }}
        className={`md:h-[130px] sm:h-[130px] w-[330px] border cursor-pointer   rounded-md p-[20px]`}
      >
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <p className="text-[20px] font-bold flex justify-start items-start">
              {Number(total.toFixed(2)).toLocaleString()}
            </p>
            <p className="text-[20px] font-bold flex justify-start items-start">
              {Math.round((total / cummulativeTotal) * 100).toFixed(1)} %
            </p>
          </div>
          <p className="text-[16px] flex justify-center ">
            {name.toUpperCase()}
          </p>
        </div>
      </Link>
    )
  }
  // if (loadingData) {
  //   return (
  //     <div className="flex items-center justify-center h-screen">
  //       <div className="flex flex-col gap-2">
  //         <Spin
  //           indicator={
  //             <LoadingOutlined
  //               style={{
  //                 fontSize: 60,
  //                 color: '#cb7229',
  //               }}
  //               spin
  //             />
  //           }
  //         />{' '}
  //         <p className="text-[#cb7229]">Fetching data.....</p>
  //       </div>
  //     </div>
  //   )
  // }

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
      <div className="flex flex-wrap gap-3 h-auto   border-b-slate-800 p-2">
        <CustomCard
          name={'Total  Premium'}
          total={totalPremium}
          currency
          link={'/dashboard/premiums/totalPremiums'}
        />
        <CustomCard
          link={'/dashboard/premiums/directPremiums'}
          name={'Direct Premium'}
          total={directPremium}
          currency
        />
        <CustomCard
          link={'/dashboard/premiums/intermediaryPremiums'}
          name={'Intermediary Premium'}
          total={intermediaryPremium}
          currency
        />
        <CustomCard
          name={'Reinsurance'}
          total={totalReinsurance}
          currency
          link={'/dashboard/premiums/reinsurance'}
        />

        <CustomPremiumCard
          link={'/dashboard/premiums/newBusiness'}
          name={'New Business'}
          total={totalNewBusiness}
          cummulativeTotal={totalPremium}
        />
        <CustomPremiumCard
          name={'Renewals'}
          link={'/dashboard/premiums/renewals'}
          total={totalRenewals}
          cummulativeTotal={totalPremium}
        />
        <CustomPremiumCard
          name={'Motor Premium'}
          link={'/dashboard/premiums/motorPremiums'}
          total={motorPremium}
          cummulativeTotal={totalPremium}
        />
        <CustomPremiumCard
          name={'Non Motor Premium'}
          link={'/dashboard/premiums/nonMotorPremiums'}
          total={nonMotorPremium}
          cummulativeTotal={totalPremium}
        />
        <CustomCard name={'Commision'} link="" total={commision} currency />
        <CustomCard
          name={'Total number of all clients'}
          total={allClients}
          link=""
        />
        <CustomCard
          name={'Total number of direct clients'}
          total={totalDirectClients}
          link=""
        />
        <CustomCard name={'Total number of brokers'} total={broker} link="" />
        <CustomCard name={'Total number of agents'} total={agents} link="" />

        <Link
          href={'/dashboard/premiums/unrenewedPolicies'}
          className={`md:h-[130px] sm:h-[130px] w-[330px] border cursor-pointer  rounded-md p-[20px]`}
          onClick={() => {}}
        >
          <div className="flex flex-col gap-1">
            <p className="text-[18px] font-bold flex justify-start items-start">
              TOTAL {(motorRenewed + nonMotorUnrenewed).toLocaleString()}
            </p>
            <div className="flex justify-between">
              <p>{'Motor'.toUpperCase()}</p>
              <p>{'Non Motor'.toUpperCase()}</p>
            </div>
            <div className="flex justify-between">
              <p className="font-bold">{motorRenewed.toLocaleString()}</p>
              <p className="font-bold">{nonMotorUnrenewed.toLocaleString()}</p>
            </div>
            <p className="text-[14px] flex justify-center ">
              {'Unrenewed Policies'.toUpperCase()}
            </p>
          </div>
        </Link>
        <Link
          href={'/dashboard/premiums/undebitedPolicies'}
          className={`md:h-[130px] sm:h-[130px] w-[330px] border cursor-pointer   rounded-md p-[20px]`}
          onClick={() => {}}
        >
          <div className="flex flex-col gap-1">
            <p className="text-[18px] font-bold flex justify-start items-start">
              TOTAL {(motorUndebited + nonMotorUndebited).toLocaleString()}
            </p>
            <div className="flex justify-between">
              <p>{'Motor'.toUpperCase()}</p>
              <p>{'Non Motor'.toUpperCase()}</p>
            </div>
            <div className="flex justify-between">
              <p className="font-bold"> {motorUndebited.toLocaleString()}</p>
              <p className="font-bold">{nonMotorUndebited.toLocaleString()}</p>
            </div>
            <p className="text-[14px] flex justify-center ">
              {'Undebited Policies'.toUpperCase()}
            </p>
          </div>
        </Link>
        <Link
          href={''}
          target="_blank"
          className={`md:h-[130px] sm:h-[130px] w-[330px] border cursor-pointer  rounded-md p-[20px] `}
          onClick={() => {}}
        >
          <div className="flex flex-col gap-1">
            <div className="flex justify-between">
              <p>{'Budget'.toUpperCase()}</p>
              <p>{'Actual'.toUpperCase()}</p>
            </div>
            <div className="flex justify-between">
              <p className="font-bold"> {(1282600).toLocaleString()}</p>
              <p className="font-bold">{totalPremium.toLocaleString()}</p>
            </div>
            <div className="flex justify-between">
              <p className="font-bold">10%</p>
              <p className="font-bold">90%</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Underwriting
