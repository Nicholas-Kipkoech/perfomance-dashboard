'use client'
import { IBranches } from '@/app/assets/interfaces'
import { useContextApi } from '@/app/context/Context'
import CustomButton from '@/app/UI/reusableComponents/CustomButton'
import CustomSelect from '@/app/UI/reusableComponents/CustomSelect'
import { LoadingOutlined } from '@ant-design/icons'
import { DatePicker, Spin } from 'antd'
import Link from 'next/link'

import React, { useState } from 'react'

const CustomCard = ({
  total1,
  total2,
  total3,
  name1,
  name2,
  name3,
  link,
  cumulativeTotal,
  perc,
}: {
  total1: number
  total2?: number
  total3?: number
  name1: string
  name2?: string
  name3?: string
  link: string
  cumulativeTotal?: number
  perc?: boolean
}) => {
  return (
    <Link
      href={`/dashboard/reinsurance/${link}`}
      className={`md:h-[130px]  sm:h-[130px] w-[450px] border cursor-pointer  rounded-md p-[20px]`}
    >
      <div className="flex flex-col gap-2 justify-center">
        <div className="flex gap-2 items-center justify-between">
          <p className="text-[14px] flex justify-center ">
            {name1.toUpperCase()}
          </p>
          <p className="text-[13px] font-bold flex justify-start items-start">
            KSH {total1.toLocaleString()}
          </p>
        </div>
        {name2 && (
          <div className="flex gap-2 items-center justify-between">
            <p className="text-[14px] flex justify-center  ">
              {name2?.toUpperCase()}
            </p>
            <p className="text-[13px] font-bold flex justify-start items-start">
              KSH {total2?.toLocaleString()}
            </p>
          </div>
        )}
        {name3 && (
          <div className="flex gap-2 items-center justify-between">
            <p className="text-[14px] flex justify-center ">
              {name3?.toUpperCase()}
            </p>
            <p className="text-[13px] font-bold flex justify-start items-start">
              KSH {total3?.toLocaleString()}
            </p>
          </div>
        )}
      </div>
    </Link>
  )
}

const Reinsurance = () => {
  const {
    riCession,
    riPaidCession,
    riOutstandingCessionReport,
    loadingData,
    year: _year,
    setFromDate,
    toDate: _toDate,
    setToDate,
    companys,
    setBranchCode,
    setCompany,
  }: any = useContextApi()

  const treatyPremium = riCession.reduce(
    (acc: any, ri: any) => Number(acc + ri.treatyPremium),
    0,
  )
  const treatyCommission = riCession.reduce(
    (acc: any, ri: any) => Number(acc + ri.treatyCommission),
    0,
  )
  const facPremium = riCession.reduce(
    (acc: any, ri: any) => Number(acc + ri.facPremium),
    0,
  )
  const facCommission = riCession.reduce(
    (acc: any, ri: any) => Number(acc + ri.facCommission),
    0,
  )
  const treatyAmt = riPaidCession.reduce(
    (acc: any, ri: any) => Number(acc + ri.treatyAmt),
    0,
  )
  const facAmt = riPaidCession.reduce(
    (acc: any, ri: any) => Number(acc + ri.facAmt),
    0,
  )
  const xolAmt = riPaidCession.reduce(
    (acc: any, ri: any) => Number(acc + ri.xolAmt),
    0,
  )

  const totalOutstandingReinsurance = riOutstandingCessionReport.reduce(
    (acc: any, ri: any) =>
      Number(
        acc +
          ri.cqsAmt +
          ri['1stSurpAmt'] +
          ri['2ndSurpAmt'] +
          ri.qsAmt +
          ri.facOutAmt +
          ri.xolAmt,
      ),
    0,
  )

  const treatyOutstandingAmt = riOutstandingCessionReport.reduce(
    (acc: any, ri: any) =>
      Number(acc + ri.cqsAmt + ri['1stSurpAmt'] + ri['2ndSurpAmt'] + ri.qsAmt),
    0,
  )
  const facOutstandingAmt = riOutstandingCessionReport.reduce(
    (acc: any, ri: any) => Number(acc + ri.facOutAmt),
    0,
  )
  const xolOutstandingAmt = riOutstandingCessionReport.reduce(
    (acc: any, ri: any) => Number(acc + ri.xolAmt),
    0,
  )
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

      <div className="flex flex-wrap gap-2 mt-2 ml-3">
        <Link
          href={'/dashboard/reinsurance/ri-cessions'}
          className={`md:h-[130px]  sm:h-[130px] w-[450px] border cursor-pointer  rounded-md p-[20px]`}
        >
          <div className="flex gap-2 items-center flex-col">
            <p className="text-[14px] flex justify-center ">
              {'Total reinsurance premium (ceeded)'.toUpperCase()}
            </p>
            <p className="text-[18px] font-bold flex justify-start items-start">
              KSH {(treatyPremium + facPremium).toLocaleString()}
            </p>
          </div>
        </Link>
        <CustomCard
          name1="Treaty premium"
          total1={treatyPremium}
          name2={'Fac premium'}
          total2={facPremium}
          link={'ri-cessions'}
          cumulativeTotal={treatyPremium + treatyCommission}
          perc
        />
        <Link
          href={'/dashboard/reinsurance/ri-cessions'}
          className={`md:h-[130px]  sm:h-[130px] w-[450px] border cursor-pointer  rounded-md p-[20px]`}
        >
          <div className="flex gap-2 items-center flex-col">
            <p className="text-[14px] flex justify-center ">
              {'Total Reinsurance Commission (Earned)'.toUpperCase()}
            </p>
            <p className="text-[18px] font-bold flex justify-start items-start">
              KSH {(treatyCommission + facCommission).toLocaleString()}
            </p>
          </div>
        </Link>
        <CustomCard
          name1="Treaty Commission"
          total1={treatyCommission}
          name2={'Fac Commission'}
          total2={facCommission}
          link={'ri-cessions'}
          cumulativeTotal={facPremium + facCommission}
          perc
        />
        <Link
          href={'/dashboard/reinsurance/ri-paid-cession'}
          className={`md:h-[130px]  sm:h-[130px] w-[450px] border cursor-pointer  rounded-md p-[20px]`}
        >
          <div className="flex gap-2 items-center flex-col">
            <p className="text-[14px] flex justify-center ">
              {'Reinsurance Claim paid Recovery'.toUpperCase()}
            </p>
            <p className="text-[18px] font-bold flex justify-start items-start">
              KSH {(treatyAmt + facAmt + xolAmt).toLocaleString()}
            </p>
          </div>
        </Link>

        <CustomCard
          name1="Treaty claim recovery "
          total1={treatyAmt}
          name2={'fac claim recovery'}
          total2={facAmt}
          name3={'xol claim recovery'}
          total3={xolAmt}
          link={'ri-paid-cession'}
        />
        <Link
          href={'/dashboard/reinsurance/ri-outstanding-cession'}
          className={`md:h-[130px]  sm:h-[130px] w-[450px] border cursor-pointer  rounded-md p-[20px]`}
        >
          <div className="flex gap-2 items-center flex-col">
            <p className="text-[14px] flex justify-center ">
              {'reinsurance share of claim Outstanding '.toUpperCase()}
            </p>
            <p className="text-[18px] font-bold flex justify-start items-start">
              KSH {totalOutstandingReinsurance.toLocaleString()}
            </p>
          </div>
        </Link>
        <CustomCard
          name1="Treaty share of claim Outstanding "
          total1={treatyOutstandingAmt}
          name2={'fac share of claim Outstanding'}
          total2={facOutstandingAmt}
          name3={'xol share of claim Outstanding'}
          total3={xolOutstandingAmt}
          link={'ri-outstanding-cession'}
        />
      </div>
    </div>
  )
}

export default Reinsurance
