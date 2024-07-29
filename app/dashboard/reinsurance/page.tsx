'use client'
import { useContextApi } from '@/app/context/Context'
import Link from 'next/link'

import React from 'react'

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
  return (
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
  )
}

export default Reinsurance
