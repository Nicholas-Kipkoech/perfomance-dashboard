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
}: {
  total1: number
  total2?: number
  total3?: number
  name1: string
  name2?: string
  name3?: string
  link: string
}) => {
  return (
    <Link
      href={`/dashboard/reinsurance/${link}`}
      className={`md:h-[130px]  sm:h-[130px] w-[330px] border cursor-pointer  rounded-md p-[20px]`}
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
  const { riCession, riPaidCession }: any = useContextApi()
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
  return (
    <div className="flex gap-2 mt-2 ml-3">
      <CustomCard
        name1="Treaty premium"
        total1={treatyPremium}
        name2={'Treaty Commission'}
        total2={treatyCommission}
        link={'ri-cessions'}
      />
      <CustomCard
        name1="Fac premium"
        total1={facPremium}
        name2={'Fac Commission'}
        total2={facCommission}
        link={'ri-cessions'}
      />
      <CustomCard
        name1="Treaty Amount"
        total1={treatyAmt}
        name2={'fac amount'}
        total2={facAmt}
        name3={'xol amount'}
        total3={xolAmt}
        link={'ri-paid-cession'}
      />
    </div>
  )
}

export default Reinsurance
