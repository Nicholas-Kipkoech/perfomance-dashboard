'use client'
import { useContextApi } from '@/app/context/Context'
import CustomButton from '@/app/UI/reusableComponents/CustomButton'
import { formatDate } from '@/app/utils/apiLogistics'
import { ConfigProvider, Table } from 'antd'
import { useRouter } from 'next/navigation'
import React from 'react'
import CsvDownload from 'react-csv-downloader'

const RIPaidCessions = () => {
  const { riPaidCessionReport }: any = useContextApi()

  const columns = [
    {
      title: 'Claim No',
      dataIndex: 'claimNo',
      key: 'claimNo',
    },
    {
      title: 'Policy No',
      dataIndex: 'policyNo',
      key: 'policyNo',
    },
    {
      title: 'End No',
      dataIndex: 'endNo',
      key: 'endNo',
    },
    {
      title: 'From Date',
      dataIndex: 'fromDate',
      key: 'fromDate',
      render: (_: any, item: any) => <p>{formatDate(item.fromDate)}</p>,
    },
    {
      title: 'To Date',
      dataIndex: 'toDate',
      key: 'toDate',
      render: (_: any, item: any) => <p>{formatDate(item.toDate)}</p>,
    },
    {
      title: 'D.O.I',
      dataIndex: 'toDate',
      key: 'toDate',
      render: (_: any, item: any) => <p>{formatDate(item.DOI)}</p>,
    },
    {
      title: 'D.O.L',
      dataIndex: 'toDate',
      key: 'toDate',
      render: (_: any, item: any) => <p>{formatDate(item.DOL)}</p>,
    },
    {
      title: 'Insured',
      dataIndex: 'insured',
      key: 'insured',
    },
    {
      title: 'Intermediary',
      dataIndex: 'intermediary',
      key: 'intermediary',
    },
    {
      title: 'Product Name',
      dataIndex: 'productName',
      key: 'productName',
    },
    {
      title: 'Sub Class',
      dataIndex: 'subClass',
      key: 'subClass',
    },
    {
      title: 'UW year',
      dataIndex: 'UWyear',
      key: 'UWyear',
    },
    {
      title: 'Nature of Loss',
      dataIndex: 'natureOfLosss',
      key: 'natureOfLosss',
    },
    {
      title: '100% si',
      dataIndex: '100%si',
      key: '100%si',
      render: (_: any, item: any) => (
        <p>KSH {item['100%si'].toLocaleString()}</p>
      ),
    },
    {
      title: '100% Amount',
      dataIndex: '100%amt',
      key: '100%amt',
      render: (_: any, item: any) => (
        <p>KSH {item['100%amt'].toLocaleString()}</p>
      ),
    },
    {
      title: 'CQS Amount',
      dataIndex: 'cqsAmt',
      key: 'cqsAmt',
      render: (_: any, item: any) => <p>KSH {item.cqsAmt.toLocaleString()}</p>,
    },
    {
      title: 'CQS Perc',
      dataIndex: 'cqsPerc',
      key: 'cqsPerc',
      render: (_: any, item: any) => <p> {item.cqsPerc}%</p>,
    },
    {
      title: 'Retention Amount',
      dataIndex: 'retentionAmt',
      key: 'retentionAmt',
      render: (_: any, item: any) => (
        <p>KSH {item.retentionAmt.toLocaleString()}</p>
      ),
    },
    {
      title: 'Retention Perc',
      dataIndex: 'retentionPerc',
      key: 'retentionPerc',
      render: (_: any, item: any) => <p> {item.retentionPerc}</p>,
    },
    {
      title: '1st Surp Perc',
      dataIndex: '1stSurpPerc',
      key: '1stSurpPerc',
      render: (_: any, item: any) => <p>{item['1stSurpPerc']}%</p>,
    },
    {
      title: '2nd Surp Perc',
      dataIndex: '2ndSurpPerc',
      key: '2ndSurpPerc',
      render: (_: any, item: any) => <p>{item['2ndSurpPerc']}%</p>,
    },
    {
      title: 'QS amount',
      dataIndex: 'qsAmt',
      key: 'qsAmt',
      render: (_: any, item: any) => <p> {item.qsAmt}</p>,
    },
    {
      title: 'QS Perc',
      dataIndex: 'qsPerc',
      key: 'qsPerc',
      render: (_: any, item: any) => <p> {item.qsPerc}</p>,
    },

    {
      title: 'Fac Out amount',
      dataIndex: 'facOutAmt',
      key: 'facOutAmt',
      render: (_: any, item: any) => <p> {item.facOutAmt.toLocaleString()}</p>,
    },
    {
      title: 'Fac Out Perc',
      dataIndex: 'facOutPerc',
      key: 'facOutPerc',
      render: (_: any, item: any) => <p> {item.facOutPerc}%</p>,
    },
    {
      title: 'XOL amount',
      dataIndex: 'xolAmt',
      key: 'xolAmt',
      render: (_: any, item: any) => <p> {item.xolAmt.toLocaleString()}</p>,
    },
  ]
  const router = useRouter()

  const formattedColumns = columns.map((column) => {
    return {
      id: column.dataIndex,
      displayName: column.title,
    }
  })
  return (
    <div className="mx-2 my-2">
      <div className="flex justify-between my-2">
        <CustomButton
          name={'Back'}
          className=" bg-[#cb7729] text-white  h-[30px] rounded-md w-[100px]"
          onClick={() => router.back()}
        />
        <p className="text-[1.6rem] font-bold">RI Paid Cessions Data Table</p>
        <CsvDownload
          text=""
          datas={riPaidCessionReport}
          columns={formattedColumns}
          filename={`RI Paid Cessions ${new Date(
            Date.now(),
          ).toLocaleDateString()}`}
          extension=".csv"
          className="bg-[#cb7529] h-[2.3rem]  rounded-sm text-white border w-[8rem] p-2 flex justify-center items-center"
        />
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
          columns={columns}
          dataSource={riPaidCessionReport}
          scroll={{ x: 3800 }}
        />
      </ConfigProvider>
    </div>
  )
}

export default RIPaidCessions
