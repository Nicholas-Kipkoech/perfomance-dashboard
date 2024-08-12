'use client'
import { IBranches } from '@/app/assets/interfaces'
import { useContextApi } from '@/app/context/Context'
import FinanceContextProvider, {
  FinanceContext,
} from '@/app/context/FinanceContext'
import CustomButton from '@/app/UI/reusableComponents/CustomButton'
import CustomCard from '@/app/UI/reusableComponents/CustomCard'
import CustomSelect from '@/app/UI/reusableComponents/CustomSelect'
import { LoadingOutlined } from '@ant-design/icons'
import { ConfigProvider, DatePicker, Spin, Table } from 'antd'
import Link from 'next/link'
import React, { useContext, useState } from 'react'

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
    fetchFinanceData,
    loadingData,
    bankBalances,

    companys,

    setCompany,
  }: any = useContext(FinanceContext)
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
        className={`h-[130px] w-[330px] border  cursor-pointer  rounded-md p-[10px]`}
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
      title: 'Branch Code',
      dataIndex: 'bankBranchCode',
      key: 'bankBranchCode',
    },
    {
      title: 'Account No',
      dataIndex: 'bankAccountNo',
      key: 'bankAccountNo',
    },
    {
      title: 'Account Name',
      dataIndex: 'bankAccountName',
      key: 'bankAccountName',
    },
    {
      title: 'Account Currency',
      dataIndex: 'bankCurCode',
      key: 'bankCurCode',
    },
    {
      title: 'Transaction Currency',
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
      render: (_: any, item: any) => <p>{item.amount.toLocaleString()}</p>,
    },
  ]

  const allBankBalances = bankBalances.filter((bankBalance: IBankBalance) => {
    return bankBalance.bankCurCode === bankBalance.bankTrnCode
  })

  const KSHBankBalances = allBankBalances
    .filter((bankBalance: IBankBalance) => bankBalance.bankCurCode === 'KSH')
    .sort((a: IBankBalance, b: IBankBalance) => b.amount - a.amount)

  const totalInKSH = KSHBankBalances.reduce(
    (acc: any, bankBalance: IBankBalance) => acc + bankBalance.amount,
    0,
  )
  const USDBankBalances = allBankBalances
    .filter((bankBalance: IBankBalance) => bankBalance.bankCurCode === 'USD')
    .sort((a: IBankBalance, b: IBankBalance) => b.amount - a.amount)

  const totalInUSD = USDBankBalances.reduce(
    (acc: any, bankBalance: IBankBalance) => acc + bankBalance.amount,
    0,
  )
  const EUROBankBalances = allBankBalances
    .filter((bankBalance: IBankBalance) => bankBalance.bankCurCode === 'EURO')
    .sort((a: IBankBalance, b: IBankBalance) => b.amount - a.amount)

  const totalInEURO = EUROBankBalances.reduce(
    (acc: any, bankBalance: IBankBalance) => acc + bankBalance.amount,
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
  const [branchCode, setBranchCode] = useState('')
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

  const handleRunReports = async () => {
    if (fmDate24.length !== 11 || toDate24.length !== 11) {
      alert('Please select from date and to date')
    } else {
      await fetchFinanceData(fmDate24, toDate24, branchCode)
    }
  }
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
  const receiptListingLink = `http://192.168.1.112:8001/icon/reports?p_module_name=AR_RECEIPT_LISTING&destype=cache&desformat=PDF&rep_param1=&rep_param2=&rep_param3=&rep_param4=&rep_param5=&rep_param6=&rep_param7=&rep_param8=&rep_param9=&rep_doc_index=&rep_doc_org=50&rep_doc_no=&p_role_code=AR.MGR&p_org_code=50&p_menu_code=AR000032&p_grp_code=AR.MGR&p_os_code=01&p_user_code=1000000&p_user_name=ICON,%20Admin%20&p_report_title=RECEIPT%20LISTING%20REPORT&P_ORG_CODE=50&P_CURRENCY=&P_BRANCH=${branchCode}&P_CATEGORY=&P_AGENT=&P_FM_DT=${fmDate24}&P_TO_DT=${toDate24}&P_CREATED_BY=&P_PAYING_FOR=&P_MODE=&P_STATUS=`
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
      <div className="flex    border-b-slate-800 p-2">
        <CustomFinanceCard
          name={'Receipts Listing'}
          link={receiptListingLink}
        />
      </div>
      {totalInKSH === 0 ? (
        <></>
      ) : (
        <>
          <div className="flex justify-between px-5">
            <p className="font-bold">Bank Balances</p>

            <p className="font-bold">
              Total In KSH {Math.floor(totalInKSH).toLocaleString()}
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
                  padding: 10,
                },
              },
            }}
          >
            <Table columns={columns} dataSource={KSHBankBalances} />
          </ConfigProvider>
        </>
      )}

      {totalInUSD === 0 ? (
        <></>
      ) : (
        <>
          <div className="flex justify-between px-5">
            <p className="font-bold">Bank Balances</p>

            <p className="font-bold">
              Total In USD {Math.floor(totalInUSD).toLocaleString()}
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
                  padding: 10,
                },
              },
            }}
          >
            <Table columns={columns} dataSource={USDBankBalances} />
          </ConfigProvider>
        </>
      )}

      {totalInEURO === 0 ? (
        <></>
      ) : (
        <>
          <div className="flex justify-between px-5">
            <p className="font-bold">Bank Balances</p>
            <p className="font-bold">
              Total In EURO {Math.floor(totalInEURO).toLocaleString()}
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
                  padding: 10,
                },
              },
            }}
          >
            <Table columns={columns} dataSource={EUROBankBalances} />
          </ConfigProvider>
        </>
      )}
    </div>
  )
}

export default Finance
