'use client'
import { IBranches } from '@/app/assets/interfaces'
import { ClaimsContext } from '@/app/context/ClaimsContext'
import { useContextApi } from '@/app/context/Context'
import { StatisticalContext } from '@/app/context/StatisticalContext'
import CustomButton from '@/app/UI/reusableComponents/CustomButton'
import CustomSelect from '@/app/UI/reusableComponents/CustomSelect'
import { LoadingOutlined } from '@ant-design/icons'
import { ConfigProvider, DatePicker, Spin, Table } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { Suspense, useContext, useState } from 'react'

interface ICustomCard {
  total2024: number
  total2023: number
  loading23?: boolean
  loading24?: boolean
  name: string
  to23?: string
  to24?: string
}

const CustomCard = ({
  total2024,
  total2023,
  name,
  loading23,
  loading24,
  to23,
  to24,
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
            <Link
              href={`${to24}`}
              target="_blank"
              className="font-bold text-[1.1rem]"
            >
              {Number(total2024.toFixed(2)).toLocaleString()}
            </Link>
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
            <Link
              href={`${to23}`}
              target="_blank"
              className="font-bold text-[1.1rem]"
            >
              {Number(total2023.toFixed(2)).toLocaleString()}
            </Link>
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
    fromDate23,
    toDate23,
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
  const { companys, setCompany }: any = useContextApi()
  const {
    setFromDate: _setFromDate,
    setFromDate23: _setFromDate23,
    setToDate: _setToDate,
    setToDate23: _setToDate23,
    setBranchCode,
    fromDate,
    toDate,
    cmLossRatio,
    loadingLossRatio,
    cmPaidOuts,
    filteredLossRation2,
    unpaidBills,
    loadingUnpaidBills,
    branchCode,
  }: any = useContext(StatisticalContext)

  const [fmDate23, setFmDate23] = useState('')
  const [tDate23, setTdDate23] = useState('')
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
      _setFromDate23(fmDate23), _setToDate23(tDate23)
    }
  }

  const claimPaidRecovery23Report = `http://192.168.1.112:8001/icon/reports?p_module_name=RI_PAID_CESSIONS_SUM&destype=cache&desformat=PDF&rep_param1=&rep_param2=&rep_param3=&rep_param4=&rep_param5=&rep_param6=&rep_param7=&rep_param8=&rep_param9=&rep_doc_index=&rep_doc_org=50&rep_doc_no=&p_role_code=RI.MGR&p_org_code=50&p_menu_code=RI000013&p_grp_code=RI.MGR&p_os_code=01&p_user_code=1000000&p_user_name=ICON,%20Admin%20&p_report_title=PAID%20CESSION%20SUMMARY%20CLASSWISE&P_ORG_CODE=50&P_FM_DT=${fromDate23}&P_TO_DT=${toDate23}`
  const claimPaidRecovery24Report = `http://192.168.1.112:8001/icon/reports?p_module_name=RI_PAID_CESSIONS_SUM&destype=cache&desformat=PDF&rep_param1=&rep_param2=&rep_param3=&rep_param4=&rep_param5=&rep_param6=&rep_param7=&rep_param8=&rep_param9=&rep_doc_index=&rep_doc_org=50&rep_doc_no=&p_role_code=RI.MGR&p_org_code=50&p_menu_code=RI000013&p_grp_code=RI.MGR&p_os_code=01&p_user_code=1000000&p_user_name=ICON,%20Admin%20&p_report_title=PAID%20CESSION%20SUMMARY%20CLASSWISE&P_ORG_CODE=50&P_FM_DT=${fromDate}&P_TO_DT=${toDate}`
  const grossFacPremium23Report = `http://192.168.1.112:8001/icon/reports?p_module_name=RI_CESSIONS&destype=cache&desformat=PDF&rep_param1=&rep_param2=&rep_param3=&rep_param4=&rep_param5=&rep_param6=&rep_param7=&rep_param8=&rep_param9=&rep_doc_index=&rep_doc_org=50&rep_doc_no=&p_role_code=RI.MGR&p_org_code=50&p_menu_code=RI000012&p_grp_code=RI.MGR&p_os_code=01&p_user_code=1000000&p_user_name=ICON,%20Admin%20&p_report_title=RI%20CESSIONS&P_ORG_CODE=50&P_FM_DT=${fromDate23}&P_TO_DT=${toDate23}`
  const grossFacPremium24Report = `http://192.168.1.112:8001/icon/reports?p_module_name=RI_CESSIONS&destype=cache&desformat=PDF&rep_param1=&rep_param2=&rep_param3=&rep_param4=&rep_param5=&rep_param6=&rep_param7=&rep_param8=&rep_param9=&rep_doc_index=&rep_doc_org=50&rep_doc_no=&p_role_code=RI.MGR&p_org_code=50&p_menu_code=RI000012&p_grp_code=RI.MGR&p_os_code=01&p_user_code=1000000&p_user_name=ICON,%20Admin%20&p_report_title=RI%20CESSIONS&P_ORG_CODE=50&P_FM_DT=${fromDate}&P_TO_DT=${toDate}`
  const RIouts23report = `http://192.168.1.112:8001/icon/reports?p_module_name=RI_OUTS_CESSIONS_SUM&destype=cache&desformat=PDF&rep_param1=&rep_param2=&rep_param3=&rep_param4=&rep_param5=&rep_param6=&rep_param7=&rep_param8=&rep_param9=&rep_doc_index=&rep_doc_org=50&rep_doc_no=&p_role_code=RI.MGR&p_org_code=50&p_menu_code=RI000013&p_grp_code=RI.MGR&p_os_code=01&p_user_code=1000000&p_user_name=ICON,%20Admin%20&p_report_title=OUTSTANDING%20CLAIMS%20CESSIONS%20REPORT%20[Reconciliation]&P_ORG_CODE=50&P_CLASS=&P_SUBCLASS=&P_ASATDATE=${toDate23}`
  const RIouts24report = `http://192.168.1.112:8001/icon/reports?p_module_name=RI_OUTS_CESSIONS_SUM&destype=cache&desformat=PDF&rep_param1=&rep_param2=&rep_param3=&rep_param4=&rep_param5=&rep_param6=&rep_param7=&rep_param8=&rep_param9=&rep_doc_index=&rep_doc_org=50&rep_doc_no=&p_role_code=RI.MGR&p_org_code=50&p_menu_code=RI000013&p_grp_code=RI.MGR&p_os_code=01&p_user_code=1000000&p_user_name=ICON,%20Admin%20&p_report_title=OUTSTANDING%20CLAIMS%20CESSIONS%20REPORT%20[Reconciliation]&P_ORG_CODE=50&P_CLASS=&P_SUBCLASS=&P_ASATDATE=${toDate}`
  const ME23Report = `http://192.168.1.112:8001/icon/reports?p_module_name=GL_EXPENSE_ANALYSIS&destype=cache&desformat=PDF&rep_param1=&rep_param2=&rep_param3=&rep_param4=&rep_param5=&rep_param6=&rep_param7=&rep_param8=&rep_param9=&rep_doc_index=&rep_doc_org=50&rep_doc_no=&p_role_code=GL.MGR&p_org_code=50&p_menu_code=GL000040&p_grp_code=GL.MGR&p_os_code=01&p_user_code=1000000&p_user_name=ICON,%20Admin%20&p_report_title=EXPENSE%20ANALYSIS&P_ORG_CODE=50&P_CURRENCY=&P_COL_CODE=ME&P_BRANCH=${branchCode}&P_FM_DT=${fromDate23}&P_TO_DT=${toDate23}`
  const ME24Report = `http://192.168.1.112:8001/icon/reports?p_module_name=GL_EXPENSE_ANALYSIS&destype=cache&desformat=PDF&rep_param1=&rep_param2=&rep_param3=&rep_param4=&rep_param5=&rep_param6=&rep_param7=&rep_param8=&rep_param9=&rep_doc_index=&rep_doc_org=50&rep_doc_no=&p_role_code=GL.MGR&p_org_code=50&p_menu_code=GL000040&p_grp_code=GL.MGR&p_os_code=01&p_user_code=1000000&p_user_name=ICON,%20Admin%20&p_report_title=EXPENSE%20ANALYSIS&P_ORG_CODE=50&P_CURRENCY=&P_COL_CODE=ME&P_BRANCH=${branchCode}&P_FM_DT=${fromDate}&P_TO_DT=${toDate}`
  const grossClaimsOuts23Report = `http://192.168.1.112:8001/icon/reports?p_module_name=CM_AGNANALYS&destype=cache&desformat=PDF&rep_param1=&rep_param2=&rep_param3=&rep_param4=&rep_param5=&rep_param6=&rep_param7=&rep_param8=&rep_param9=&rep_doc_index=&rep_doc_org=50&rep_doc_no=&p_role_code=CM.MGR&p_org_code=50&p_menu_code=CM000030&p_grp_code=CM.MGR&p_os_code=01&p_user_code=1000000&p_user_name=ICON,%20Admin%20&p_report_title=CLAIM%20AGEING%20ANALYSIS%20REPORT&P_ORG_CODE=50&P_RPT_TYPE=S&P_ASATDATE=${toDate23}`
  const grossClaimsOuts24Report = `http://192.168.1.112:8001/icon/reports?p_module_name=CM_AGNANALYS&destype=cache&desformat=PDF&rep_param1=&rep_param2=&rep_param3=&rep_param4=&rep_param5=&rep_param6=&rep_param7=&rep_param8=&rep_param9=&rep_doc_index=&rep_doc_org=50&rep_doc_no=&p_role_code=CM.MGR&p_org_code=50&p_menu_code=CM000030&p_grp_code=CM.MGR&p_os_code=01&p_user_code=1000000&p_user_name=ICON,%20Admin%20&p_report_title=CLAIM%20AGEING%20ANALYSIS%20REPORT&P_ORG_CODE=50&P_RPT_TYPE=S&P_ASATDATE=${toDate}`
  const grossClaimPaid23Report = `http://192.168.1.112:8001/icon/reports?p_module_name=CM_PAID_CLMS_SUMMARY&destype=cache&desformat=PDF&rep_param1=&rep_param2=&rep_param3=&rep_param4=&rep_param5=&rep_param6=&rep_param7=&rep_param8=&rep_param9=&rep_doc_index=&rep_doc_org=50&rep_doc_no=&p_role_code=CM.MGR&p_org_code=50&p_menu_code=CM000032&p_grp_code=CM.MGR&p_os_code=01&p_user_code=1000000&p_user_name=ICON,%20Admin%20&p_report_title=CLAIMS%20PAID%20SUMMARY&P_ORG_CODE=50&P_BRANCH_GROUP=&P_FM_DT=${fromDate23}&P_TO_DT=${toDate23}`
  const grossClaimPaid24Report = `http://192.168.1.112:8001/icon/reports?p_module_name=CM_PAID_CLMS_SUMMARY&destype=cache&desformat=PDF&rep_param1=&rep_param2=&rep_param3=&rep_param4=&rep_param5=&rep_param6=&rep_param7=&rep_param8=&rep_param9=&rep_doc_index=&rep_doc_org=50&rep_doc_no=&p_role_code=CM.MGR&p_org_code=50&p_menu_code=CM000032&p_grp_code=CM.MGR&p_os_code=01&p_user_code=1000000&p_user_name=ICON,%20Admin%20&p_report_title=CLAIMS%20PAID%20SUMMARY&P_ORG_CODE=50&P_BRANCH_GROUP=&P_FM_DT=${fromDate}&P_TO_DT=${toDate}`
  const grossPremComm23report = `http://192.168.1.112:8001/icon/reports?p_module_name=UW_COMP_PROD_SUM&destype=cache&desformat=PDF&rep_param1=&rep_param2=&rep_param3=&rep_param4=&rep_param5=&rep_param6=&rep_param7=&rep_param8=&rep_param9=&rep_doc_index=&rep_doc_org=50&rep_doc_no=&p_role_code=UW.ADF&p_org_code=50&p_menu_code=UW000186&p_grp_code=UW.ADF&p_os_code=01&p_user_code=1000000&p_user_name=ICON,%20Admin%20&p_report_title=COMPANY%20PRODUCTION%20SUMMARY&P_ORG_CODE=50&P_BRANCH_GROUP=&P_BRANCH=${branchCode}&P_FM_DT=${fromDate23}&P_TO_DT=${toDate23}&P_COMESA=Y`
  const grossPremComm24report = `http://192.168.1.112:8001/icon/reports?p_module_name=UW_COMP_PROD_SUM&destype=cache&desformat=PDF&rep_param1=&rep_param2=&rep_param3=&rep_param4=&rep_param5=&rep_param6=&rep_param7=&rep_param8=&rep_param9=&rep_doc_index=&rep_doc_org=50&rep_doc_no=&p_role_code=UW.ADF&p_org_code=50&p_menu_code=UW000186&p_grp_code=UW.ADF&p_os_code=01&p_user_code=1000000&p_user_name=ICON,%20Admin%20&p_report_title=COMPANY%20PRODUCTION%20SUMMARY&P_ORG_CODE=50&P_BRANCH_GROUP=&P_BRANCH=${branchCode}&P_FM_DT=${fromDate}&P_TO_DT=${toDate}&P_COMESA=Y`

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
  const router = useRouter()

  const columns3 = [
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (_: any, item: any) => (
        <p
          onClick={() =>
            router.push(
              `dashboard/statistical/unpaid-bills?category=${
                item.category.split('-')[0]
              }`,
            )
          }
        >
          {item.category}
        </p>
      ),
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

  const lossRatioTotals = filteredLossRation2.reduce(
    (acc: number, ratio: any) => {
      return ratio.total !== null ? acc + Number(ratio.total) : acc
    },
    0,
  )
  const unpaidBillsTotals = unpaidBills.reduce(
    (acc: any, item: any) => acc + item.amountToPay,
    0,
  )

  const totalsByCategory = unpaidBills.reduce((acc: any, bill: any) => {
    const { category, amountToPay } = bill

    // If the category already exists in the accumulator, add the amount
    if (acc[category]) {
      acc[category] += amountToPay
    } else {
      // Otherwise, create a new entry for this category
      acc[category] = amountToPay
    }

    return acc
  }, {})

  const groupedTotals = Object.keys(totalsByCategory).map((category) => ({
    category,
    amountToPay: totalsByCategory[category],
  }))

  return (
    <Suspense>
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
            to23={grossPremComm23report}
            to24={grossPremComm24report}
            loading23={loadingPremiums2023}
            loading24={loadingPremiums2024}
            total2024={totalPremium2024}
          />
          <CustomCard
            name="Gross Commission"
            to23={grossPremComm23report}
            to24={grossPremComm24report}
            total2023={commision2023}
            loading23={loadingPremiums2023}
            loading24={loadingPremiums2024}
            total2024={commision2024}
          />
          <CustomCard
            name="Gross Claim Paid"
            to23={grossClaimPaid23Report}
            to24={grossClaimPaid24Report}
            total2023={totalClaimPaid2023}
            total2024={totalClaimPaid2024}
            loading23={loadingClaims2023}
            loading24={loadingClaims2024}
          />
          <CustomCard
            name="Gross Claim Outstanding"
            to23={grossClaimsOuts23Report}
            to24={grossClaimsOuts24Report}
            total2023={totalOutstanding2023}
            total2024={totalOutstanding2024}
            loading23={loadingOutstandingClaims23}
            loading24={loadingOutstandingClaims24}
          />
          <CustomCard
            name="Management Expenses"
            to23={ME23Report}
            to24={ME24Report}
            total2023={totalME23}
            total2024={totalME24}
            loading23={loadingManagementExpenses23}
            loading24={loadingManagementExpenses24}
          />
          <CustomCard
            name="Gross Fac Out Commision"
            to23={grossFacPremium23Report}
            to24={grossFacPremium24Report}
            total2023={facCommission23}
            total2024={facCommission24}
            loading23={loadingRiCession23}
            loading24={loadingRiCession24}
          />
          <CustomCard
            name="Gross Fac Premium"
            to23={grossFacPremium23Report}
            to24={grossFacPremium24Report}
            total2023={facPremium23}
            total2024={facPremium24}
            loading23={loadingRiCession23}
            loading24={loadingRiCession24}
          />
          <CustomCard
            to23={claimPaidRecovery23Report}
            to24={claimPaidRecovery24Report}
            name="Claim Paid Recovery"
            total2023={claimPaidRecovery23}
            total2024={claimPaidRecovery24}
            loading23={loadingRiPaidCession23}
            loading24={loadingRiPaidCession24}
          />
          <CustomCard
            to23={RIouts23report}
            to24={RIouts24report}
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
              Management Expenses Total:{' '}
              {Math.floor(totalME24).toLocaleString()}{' '}
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
            <p>Loss ratio overall: {lossRatioTotals}% </p>
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
              dataSource={groupedTotals}
              columns={columns3}
              loading={loadingUnpaidBills}
            />
          </ConfigProvider>
        </div>
      </div>
    </Suspense>
  )
}

export default Statistical
