'use client'
import { useContextApi } from '@/app/context/Context'
import CustomCard from '@/app/UI/reusableComponents/CustomCard'
import React from 'react'

const Claims = () => {
  const {
    totalClaimPaid,
    totalClaims,
    totalRegisteredClaims,
    totalOutstanding,
    totalCount: totalOutstandingCount,
    totalSalvages,
    totalRecovery,
    filteredLossRation,
  }: any = useContextApi()

  const totalLossRatio = filteredLossRation.reduce(
    (acc: number, ratio: any) => {
      return ratio.total !== null ? acc + Number(ratio.total) : acc
    },
    0,
  )

  return (
    <div>
      <div className="flex flex-wrap gap-3 h-auto  overflow-auto  border-b-slate-800 p-2">
        <CustomCard
          name={'Registered  Claims'}
          total={totalRegisteredClaims}
          currency
          link={'/dashboard/claims/registeredClaims'}
        />
        <CustomCard
          link={'/dashboard/claims/paidClaims'}
          name={'Paid  Claims'}
          totalNumber={totalClaims}
          total={totalClaimPaid}
          currency
        />
        <CustomCard
          name={'Outstanding Claims'}
          totalNumber={totalOutstandingCount}
          total={totalOutstanding}
          currency
          link={'/dashboard/claims/outstandingClaims'}
        />
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
