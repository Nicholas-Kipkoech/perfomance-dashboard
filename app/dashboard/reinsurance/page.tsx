'use client'
import { useContextApi } from '@/app/context/Context'
import Link from 'next/link'

import React from 'react'

const CustomCard = ({
  total,
  name,
  link,
}: {
  total: number
  name: string
  link: string
}) => {
  return (
    <Link
      href={`/dashboard/reinsurance/${link}`}
      className={`md:h-[130px]  sm:h-[130px] w-[330px] border cursor-pointer  rounded-md p-[20px]`}
    >
      <div className="flex flex-col gap-2">
        <p className="text-[20px] font-bold flex justify-start items-start">
          KSH {total.toLocaleString()}
        </p>
        <p className="text-[16px] flex justify-center ">{name.toUpperCase()}</p>
      </div>
    </Link>
  )
}

const Reinsurance = () => {
  const { riCession, riPaidCession }: any = useContextApi()
  const treatyPremium = riCession.reduce(
    (acc: any, ri: any) => Number(acc + ri.treatyPremium + ri.treatyCommission),
    0,
  )
  const facPremium = riCession.reduce(
    (acc: any, ri: any) => Number(acc + ri.facPremium + ri.facCommission),
    0,
  )
  const paidCession = riPaidCession.reduce(
    (acc: any, ri: any) => Number(acc + ri.treatyAmt + ri.facAmt + ri.xolAmt),
    0,
  )

  return (
    <div className="flex gap-2 mt-2 ml-3">
      <CustomCard name="Treaty" total={treatyPremium} link={'ri-cessions'} />
      <CustomCard name="FAC" total={facPremium} link={'ri-cessions'} />
      <CustomCard
        name="Paid Cession sum"
        total={paidCession}
        link={'ri-paid-cession'}
      />
    </div>
  )
}

export default Reinsurance
