'use client'
import { StatisticalContext } from '@/app/context/StatisticalContext'
import React, { useContext } from 'react'

interface ICustomCard {
  total2024: number
  total2023: number
  name: string
}

const CustomCard = ({ total2024, total2023, name }: ICustomCard) => {
  return (
    <div className="border  pt-4 h-[8rem] w-[30rem]">
      <p className="flex justify-center">{name.toUpperCase()}</p>
      <div className="flex justify-evenly mt-2">
        <div className="flex flex-col justify-evenly ">
          <p className="text-[1rem]">2024</p>
          <p className="font-bold text-[1.1rem]">
            KSH {Number(total2023.toFixed(2)).toLocaleString()}
          </p>
        </div>
        <div className="flex flex-col justify-evenly">
          <p className="text-[1rem]">2023</p>
          <p className="font-bold text-[1.1rem]">
            KSH {Number(total2024.toFixed(2)).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  )
}

const Statistical = () => {
  const {
    totalPremium2024,
    commision2024,
    totalPremium2023,
    commision2023,
    totalClaimPaid2023,
    totalClaimPaid2024,
    totalOutstanding2023,
    totalOutstanding2024,
    riCession23,
    riCession24,
    riPaidCession23,
    riPaidCession24,
    managementExpenses23,
    managementExpenses24,
    riOutstandingCessionReport23,
    riOutstandingCessionReport24,
  }: any = useContext(StatisticalContext)

  const facCommission23 = riCession23.reduce(
    (acc: any, ri: any) => Number(acc + ri.facCommission),
    0,
  )
  const facCommission24 = riCession24.reduce(
    (acc: any, ri: any) => Number(acc + ri.facCommission),
    0,
  )

  const facPremium23 = riCession23.reduce(
    (acc: any, ri: any) => Number(acc + ri.facPremium),
    0,
  )
  const facPremium24 = riCession24.reduce(
    (acc: any, ri: any) => Number(acc + ri.facPremium),
    0,
  )
  const claimPaidRecovery23 = riPaidCession23.reduce(
    (acc: any, ri: any) => Number(acc + ri.treatyAmt + ri.facAmt + ri.xolAmt),
    0,
  )
  const claimPaidRecovery24 = riPaidCession24.reduce(
    (acc: any, ri: any) => Number(acc + ri.treatyAmt + ri.facAmt + ri.xolAmt),
    0,
  )
  const totalME23 = managementExpenses23.reduce(
    (acc: any, trn: any) => Number(acc + trn.transactionAmt),
    0,
  )
  const totalME24 = managementExpenses24.reduce(
    (acc: any, trn: any) => Number(acc + trn.transactionAmt),
    0,
  )

  const totalOutstandingReinsurance23 = riOutstandingCessionReport23.reduce(
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

  const totalOutstandingReinsurance24 = riOutstandingCessionReport24.reduce(
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
  return (
    <div className="mt-2 ml-3">
      <div className="grid gap-4 grid-cols-2">
        <CustomCard
          name="Gross Premiums"
          total2023={totalPremium2023}
          total2024={totalPremium2024}
        />
        <CustomCard
          name="Gross Commission"
          total2023={commision2023}
          total2024={commision2024}
        />
        <CustomCard
          name="Gross Claim Paid"
          total2023={totalClaimPaid2023}
          total2024={totalClaimPaid2024}
        />
        <CustomCard
          name="Gross Claim Outstanding"
          total2023={totalOutstanding2023}
          total2024={totalOutstanding2024}
        />
        <CustomCard
          name="Management Expenses"
          total2023={totalME23}
          total2024={totalME24}
        />
        <CustomCard
          name="Gross Fac Out Commision"
          total2023={facCommission23}
          total2024={facCommission24}
        />
        <CustomCard
          name="Gross Fac Premium"
          total2023={facPremium23}
          total2024={facPremium24}
        />
        <CustomCard
          name="Claim Paid Recovery"
          total2023={claimPaidRecovery23}
          total2024={claimPaidRecovery24}
        />
        <CustomCard
          name="Reinsurance share of claim outstanding"
          total2023={totalOutstandingReinsurance23}
          total2024={totalOutstandingReinsurance24}
        />
      </div>
    </div>
  )
}

export default Statistical
