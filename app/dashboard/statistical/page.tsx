'use client'
import { IBranches } from '@/app/assets/interfaces'
import { ClaimsContext } from '@/app/context/ClaimsContext'
import { useContextApi } from '@/app/context/Context'
import { StatisticalContext } from '@/app/context/StatisticalContext'
import CustomButton from '@/app/UI/reusableComponents/CustomButton'
import CustomSelect from '@/app/UI/reusableComponents/CustomSelect'
import { LoadingOutlined } from '@ant-design/icons'
import { ConfigProvider, DatePicker, Spin, Table } from 'antd'
import React, { useContext, useState } from 'react'

interface ICustomCard {
  total2024: number
  total2023: number
  loading23?: boolean
  loading24?: boolean
  name: string
}

const CustomCard = ({
  total2024,
  total2023,
  name,
  loading23,
  loading24,
}: ICustomCard) => {
  return (
    <div className="border  pt-4 h-[8rem] w-[30rem]">
      <p className="flex justify-center">{name.toUpperCase()}</p>
      <div className="flex justify-evenly mt-2">
        <div className="flex flex-col justify-evenly ">
          <p className="text-[1rem]">2024</p>
          {loading24 ? (
            <Spin
              indicator={
                <LoadingOutlined
                  style={{
                    fontSize: 20,
                    color: '#cb7229',
                  }}
                  spin
                />
              }
            />
          ) : (
            <p className="font-bold text-[1.1rem]">
              KSH {Number(total2024.toFixed(2)).toLocaleString()}
            </p>
          )}
        </div>
        <div className="flex flex-col justify-evenly">
          <p className="text-[1rem]">2023</p>
          {loading23 ? (
            <Spin
              indicator={
                <LoadingOutlined
                  style={{
                    fontSize: 20,
                    color: '#cb7229',
                  }}
                  spin
                />
              }
            />
          ) : (
            <p className="font-bold text-[1.1rem]">
              KSH {Number(total2023.toFixed(2)).toLocaleString()}
            </p>
          )}
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
    loadingPremiums2024,
    loadingPremiums2023,
    loadingClaims2023,
    loadingClaims2024,
    loadingOutstandingClaims23,
    loadingOutstandingClaims24,
    loadingRiCession23,
    loadingRiCession24,
    loadingRiPaidCession23,
    loadingRiPaidCession24,
    loadingManagementExpenses23,
    loadingManagementExpenses24,
    loadingRiOutstandingCessionReport23,
    loadingRiOutstandingCessionReport24,
    businessSummary,
    loadingBusinessSummary,
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
  const { companys, setBranchCode, setCompany }: any = useContextApi()
  const {
    setFromDate: _setFromDate,
    setFromDate23: _setFromDate23,
    setToDate: _setToDate,
    setToDate23: _setToDate23,
    setBranchCode: _setBranchCode,
    fromDate,
    toDate,
    cmLossRatio,
    loadingLossRatio,
    cmPaidOuts,
    filteredLossRation,
    unpaidBills,
    loadingUnpaidBills,
  }: any = useContext(StatisticalContext)

  const [fmDate23, setFmDate23] = useState('')
  const [toDate23, setTdDate23] = useState('')
  const [fmDate24, setFmDate24] = useState('')
  const [toDate24, setTdDate24] = useState('')

  const lossRatioMap = new Map(
    cmLossRatio.map((item: any) => [item.branchCode, item]),
  )
  const mergedLRCPOuts = cmPaidOuts.map((item: any) => {
    const lossRatioItem: any = lossRatioMap.get(item.branchCode)
    return {
      branchName: item.branchName,
      lossRatio: lossRatioItem ? lossRatioItem.total : null,
      claimsPaid: item.claimPaid,
      outstandingAmount: item.outstandingAmount,
    }
  })
  const uniqueBranchNames = Array.from(
    new Set(mergedLRCPOuts.map((item: any) => item.branchName)),
  ).map((branchName) => {
    return mergedLRCPOuts.find((item: any) => item.branchName === branchName)
  })

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
    const formattedToDate23 = day + '-' + formattedMonth + '-' + '2023'

    setTdDate23(formattedToDate23)
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
    const formattedToDate23 = day + '-' + formattedMonth + '-' + '2023'

    setFmDate23(formattedToDate23)
    setFmDate24(formattedToDate)
  }

  const handleRunReports = () => {
    if (fmDate24.length !== 11 || toDate24.length !== 11) {
      alert('Please select from date and to date')
    } else {
      _setFromDate(fmDate24)
      _setToDate(toDate24)
      _setFromDate23(fmDate23), _setToDate23(toDate23)
    }
  }

  const columns = [
    {
      title: 'Branch Name',
      dataIndex: 'branchName',
      key: 'branchName',
    },
    {
      title: 'Total Premium',
      dataIndex: 'totalPremium',
      key: 'totalPremium',
      render: (_: any, item: any) => (
        <p className="flex justify-end">{item.totalPremium.toLocaleString()}</p>
      ),
    },
    {
      title: 'Receipt Total',
      dataIndex: 'receiptTotal',
      key: 'receiptTotal',
      render: (_: any, item: any) => (
        <p className="flex justify-end">{item.receiptTotal.toLocaleString()}</p>
      ),
    },
    {
      title: 'Credit Note Amount',
      dataIndex: 'totalInvoiceAmt',
      key: 'totalInvoiceAmt',
      render: (_: any, item: any) => (
        <p className="flex justify-end">
          {item.totalInvoiceAmt.toLocaleString()}
        </p>
      ),
    },
    {
      title: 'Management Expenses',
      dataIndex: 'lossRatio',
      key: 'lossRatio',
      render: (_: any, item: any) => (
        <p className="flex justify-end">
          {Math.floor(
            (item.totalPremium / totalPremium2024) * totalME24,
          ).toLocaleString()}
        </p>
      ),
    },
  ]

  const columns2 = [
    {
      title: 'Branch Name',
      dataIndex: 'branchName',
      key: 'branchName',
    },
    {
      title: 'Claim Paid',
      dataIndex: 'totalPremium',
      key: 'totalPremium',
      render: (_: any, item: any) => (
        <p className="flex justify-end">{item.claimsPaid.toLocaleString()}</p>
      ),
    },
    {
      title: 'Outstanding Amount',
      dataIndex: 'receiptTotal',
      key: 'receiptTotal',
      render: (_: any, item: any) => (
        <p className="flex justify-end">
          {item.outstandingAmount.toLocaleString()}
        </p>
      ),
    },
    {
      title: 'Loss Ratio',
      dataIndex: 'lossRatio',
      key: 'lossRatio',
      render: (_: any, item: any) => (
        <p className="flex justify-end">{item.lossRatio}</p>
      ),
    },
  ]

  const columns3 = [
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Totals',
      dataIndex: 'lossRatio',
      key: 'lossRatio',
      render: (_: any, item: any) => (
        <p className="flex justify-end">{item.amountToPay.toLocaleString()}</p>
      ),
    },
  ]

  const totalBussPrem = businessSummary.reduce(
    (acc: any, item: any) => acc + item.totalPremium,
    0,
  )
  const receiptsTotal = businessSummary.reduce(
    (acc: any, item: any) => acc + item.receiptTotal,
    0,
  )
  const CRTotals = businessSummary.reduce(
    (acc: any, item: any) => acc + item.totalInvoiceAmt,
    0,
  )

  const claimPaidTotals = uniqueBranchNames.reduce(
    (acc: any, item: any) => acc + item.claimsPaid,
    0,
  )

  const lossRatioTotals = filteredLossRation.reduce(
    (acc: number, ratio: any) => {
      return ratio.total !== null ? acc + Number(ratio.total / 100) : acc
    },
    0,
  )
  const unpaidBillsTotals = unpaidBills.reduce(
    (acc: any, item: any) => acc + item.amountToPay,
    0,
  )
  return (
    <div className="">
      <p className="flex justify-center font-bold">
        Running Period [{fromDate}] - [{toDate}]
      </p>
      <div className="top-0  z-0 flex sm:flex-col md:flex-row gap-2 items-center">
        <CustomSelect
          defaultValue={{ label: 'Entire Company', value: '' }}
          options={formattedCompanys}
          onChange={(value: { value: string; label: string }) => {
            setBranchCode(value.value)
            _setBranchCode(value.value)
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
      <div className="grid gap-4 grid-cols-2 mt-2 ml-3">
        <CustomCard
          name="Gross Premiums"
          total2023={totalPremium2023}
          loading23={loadingPremiums2023}
          loading24={loadingPremiums2024}
          total2024={totalPremium2024}
        />
        <CustomCard
          name="Gross Commission"
          total2023={commision2023}
          loading23={loadingPremiums2023}
          loading24={loadingPremiums2024}
          total2024={commision2024}
        />
        <CustomCard
          name="Gross Claim Paid"
          total2023={totalClaimPaid2023}
          total2024={totalClaimPaid2024}
          loading23={loadingClaims2023}
          loading24={loadingClaims2024}
        />
        <CustomCard
          name="Gross Claim Outstanding"
          total2023={totalOutstanding2023}
          total2024={totalOutstanding2024}
          loading23={loadingOutstandingClaims23}
          loading24={loadingOutstandingClaims24}
        />
        <CustomCard
          name="Management Expenses"
          total2023={totalME23}
          total2024={totalME24}
          loading23={loadingManagementExpenses23}
          loading24={loadingManagementExpenses24}
        />
        <CustomCard
          name="Gross Fac Out Commision"
          total2023={facCommission23}
          total2024={facCommission24}
          loading23={loadingRiCession23}
          loading24={loadingRiCession24}
        />
        <CustomCard
          name="Gross Fac Premium"
          total2023={facPremium23}
          total2024={facPremium24}
          loading23={loadingRiCession23}
          loading24={loadingRiCession24}
        />
        <CustomCard
          name="Claim Paid Recovery"
          total2023={claimPaidRecovery23}
          total2024={claimPaidRecovery24}
          loading23={loadingRiPaidCession23}
          loading24={loadingRiPaidCession24}
        />
        <CustomCard
          name="Reinsurance share of claim outstanding"
          total2023={totalOutstandingReinsurance23}
          total2024={totalOutstandingReinsurance24}
          loading23={loadingRiOutstandingCessionReport23}
          loading24={loadingRiOutstandingCessionReport24}
        />
      </div>
      <div className="mt-2 ml-3">
        <p className="flex justify-center text-[1.5rem] font-bold">
          Business Summary Per Branch
        </p>
        <div className="flex justify-between mx-2 text-[14px] font-bold">
          <p>Total Premium: {totalBussPrem.toLocaleString()} </p>
          <p>Receipts Total: {receiptsTotal.toLocaleString()} </p>
          <p>Credit Notes Total: {CRTotals.toLocaleString()} </p>
          <p>
            Management Expenses Total: {Math.floor(totalME24).toLocaleString()}{' '}
          </p>
        </div>
        <ConfigProvider
          theme={{
            components: {
              Table: {
                headerBg: '#092332',
                headerColor: 'white',
                colorBgContainer: 'whitesmoke',
                rowHoverBg: '#cb7529',
                padding: 8,
              },
            },
          }}
        >
          <Table
            dataSource={businessSummary}
            columns={columns}
            loading={loadingBusinessSummary}
          />
        </ConfigProvider>
        <div className="flex justify-between mx-2 text-[14px] font-bold">
          <p>Total Claims Paid: {claimPaidTotals.toLocaleString()} </p>
          <p>
            Oustanding Amount Total: {totalOutstanding2024.toLocaleString()}{' '}
          </p>
          <p>Loss Ratio Overall: {Math.floor(Number(lossRatioTotals))} </p>
        </div>
        <ConfigProvider
          theme={{
            components: {
              Table: {
                headerBg: '#092332',
                headerColor: 'white',
                colorBgContainer: 'whitesmoke',
                rowHoverBg: '#cb7529',
                padding: 8,
              },
            },
          }}
        >
          <Table
            dataSource={uniqueBranchNames}
            columns={columns2}
            loading={loadingLossRatio}
          />
        </ConfigProvider>
        <div className="font-bold flex justify-between items-center mx-2">
          <p className="text-[1.5rem]">Unpaid Bills</p>
          <p>Overall Total: {unpaidBillsTotals.toLocaleString()}</p>
        </div>
        <ConfigProvider
          theme={{
            components: {
              Table: {
                headerBg: '#092332',
                headerColor: 'white',
                colorBgContainer: 'whitesmoke',
                rowHoverBg: '#cb7529',
                padding: 8,
              },
            },
          }}
        >
          <Table
            dataSource={unpaidBills}
            columns={columns3}
            loading={loadingUnpaidBills}
          />
        </ConfigProvider>
      </div>
    </div>
  )
}

export default Statistical
