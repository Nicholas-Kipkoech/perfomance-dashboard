'use client'
import { useContextApi } from '@/app/context/Context'
import CustomCard from '@/app/UI/reusableComponents/CustomCard'
import { useRouter } from 'next/navigation'
import React from 'react'

const Claims = () => {
  const {
    totalClaimPaid,
    totalClaims,
    totalRegisteredClaims,
    totalOutstanding,
    totalCount: totalOutstandingCount,
    totalSalvages,
    nonMotorRegisteredClaims,
    motorRegisteredClaims,
    filteredLossRation,
    motorOutstanding,
    motorPaidClaims,
    nonMotorPaidClaims,
    nonMotorOutstanding,
  }: any = useContextApi()
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

  return (
    <div>
      <div className="flex flex-wrap gap-3 h-auto  overflow-auto  border-b-slate-800 p-2">
        <div
          className={`md:h-[130px] sm:h-[130px] w-[400px] border cursor-pointer rounded-md p-[20px]`}
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
          className={`md:h-[130px] sm:h-[130px] w-[400px] border cursor-pointer rounded-md p-[20px]`}
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
          className={`md:h-[130px] sm:h-[130px] w-[400px] border cursor-pointer  rounded-md p-[20px]`}
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
