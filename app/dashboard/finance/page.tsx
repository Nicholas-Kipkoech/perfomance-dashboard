'use client'
import { useContextApi } from '@/app/context/Context'
import CustomCard from '@/app/UI/reusableComponents/CustomCard'
import { LoadingOutlined } from '@ant-design/icons'
import { Spin, Table } from 'antd'
import Link from 'next/link'
import React from 'react'

interface IBankBalance {
  bankCode: string
  bankBranchCode: string
  bankAccountNo: string
  bankAccountName: string
  bankCurCode: string
  bankTrnCode: string
  ledgerCode: string
  amount: number
}

const Finance = () => {
  const {
    receiptResults,
    toDate,
    fromDate,
    branchCode,
    loadingData,
    bankBalances,
  }: any = useContextApi()
  interface IFinanceCard {
    name: string
    color?: string
    link?: string
  }
  const CustomFinanceCard = ({ name, color, link }: IFinanceCard) => {
    return (
      <Link
        href={`${link}`}
        target="_blank"
        style={{ backgroundColor: color }}
        className={`h-[130px] w-[330px] border h-auto cursor-pointer  rounded-md p-[10px]`}
        onClick={() => {}}
      >
        <div className="flex gap-1 flex-col text-[14px] ">
          <div className="justify-between flex font-bold">
            <p>Amount</p>
            <p>Count</p>
          </div>
          {Object.entries(receiptResults).map(
            ([currencyCode, { total, count }]: any, key) => (
              <div className="justify-between flex" key={key}>
                <p className="text-[20px] font-bold flex justify-start items-start">
                  {currencyCode} {total.toLocaleString()}
                </p>
                <p className="text-[20px] font-bold flex justify-start items-start">
                  {count.toLocaleString()}
                </p>
              </div>
            ),
          )}
          <p className="text-[16px] flex justify-center ">
            {name.toUpperCase()}
          </p>
        </div>
      </Link>
    )
  }

  const columns = [
    {
      title: 'Bank Code',
      dataIndex: 'bankCode',
      key: 'bankCode',
    },
    {
      title: 'Bank Branch Code',
      dataIndex: 'bankBranchCode',
      key: 'bankBranchCode',
    },
    {
      title: 'Bank Account No',
      dataIndex: 'bankAccountNo',
      key: 'bankAccountNo',
    },
    {
      title: 'Bank Account Name',
      dataIndex: 'bankAccountName',
      key: 'bankAccountName',
    },
    {
      title: 'Bank Currency Code',
      dataIndex: 'bankCurCode',
      key: 'bankCurCode',
    },
    {
      title: 'Bank Transaction Code',
      dataIndex: 'bankTrnCode',
      key: 'bankTrnCode',
    },
    {
      title: 'Ledger Code',
      dataIndex: 'ledgerCode',
      key: 'ledgerCode',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
  ]

  const allBankBalances = bankBalances.filter((bankBalance: IBankBalance) => {
    return bankBalance.bankCurCode === bankBalance.bankTrnCode
  })
  const KSHBankBalances = allBankBalances.filter(
    (bankbalance: IBankBalance) => {
      return bankbalance.bankCurCode === 'KSH'
    },
  )

  const totalInKSH = KSHBankBalances.reduce(
    (acc: any, bankBalance: IBankBalance) => acc + bankBalance.amount,
    0,
  )
  const USDBankBalances = allBankBalances.filter(
    (bankbalance: IBankBalance) => {
      return bankbalance.bankCurCode === 'USD'
    },
  )
  const totalInUSD = USDBankBalances.reduce(
    (acc: any, bankBalance: IBankBalance) => acc + bankBalance.amount,
    0,
  )
  const EUROBankBalances = allBankBalances.filter(
    (bankbalance: IBankBalance) => {
      return bankbalance.bankCurCode === 'EURO'
    },
  )
  const totalInEURO = EUROBankBalances.reduce(
    (acc: any, bankBalance: IBankBalance) => acc + bankBalance.amount,
    0,
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
          <p className="text-[#cb7229]">Fetching data.....</p>
        </div>
      </div>
    )
  }
  const receiptListingLink = `http://192.168.1.112:8001/icon/reports?p_module_name=AR_RECEIPT_LISTING&destype=cache&desformat=PDF&rep_param1=&rep_param2=&rep_param3=&rep_param4=&rep_param5=&rep_param6=&rep_param7=&rep_param8=&rep_param9=&rep_doc_index=&rep_doc_org=50&rep_doc_no=&p_role_code=AR.MGR&p_org_code=50&p_menu_code=AR000032&p_grp_code=AR.MGR&p_os_code=01&p_user_code=1000000&p_user_name=ICON,%20Admin%20&p_report_title=RECEIPT%20LISTING%20REPORT&P_ORG_CODE=50&P_CURRENCY=&P_BRANCH=${branchCode}&P_CATEGORY=&P_AGENT=&P_FM_DT=${fromDate}&P_TO_DT=${toDate}&P_CREATED_BY=&P_PAYING_FOR=&P_MODE=&P_STATUS=`
  return (
    <div>
      <div className="flex    border-b-slate-800 p-2">
        <CustomFinanceCard
          name={'Receipts Listing'}
          link={receiptListingLink}
        />
      </div>

      <div className="flex justify-between px-5">
        <p className="font-bold">Bank Balances</p>

        <p className="font-bold">
          Total In KSH {Math.floor(totalInKSH).toLocaleString()}
        </p>
      </div>

      <Table columns={columns} dataSource={KSHBankBalances} />

      <div className="flex justify-between px-5">
        <p className="font-bold">Bank Balances</p>

        <p className="font-bold">
          Total In USD {Math.floor(totalInUSD).toLocaleString()}
        </p>
      </div>

      <Table columns={columns} dataSource={USDBankBalances} />

      <div className="flex justify-between px-5">
        <p className="font-bold">Bank Balances</p>
        <p className="font-bold">
          Total In EURO {Math.floor(totalInEURO).toLocaleString()}
        </p>
      </div>

      <Table columns={columns} dataSource={EUROBankBalances} />
    </div>
  )
}

export default Finance
