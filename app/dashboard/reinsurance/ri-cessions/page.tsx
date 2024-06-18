'use client'
import { useContextApi } from '@/app/context/Context'
import CustomButton from '@/app/UI/reusableComponents/CustomButton'
import { formatDate } from '@/app/utils/apiLogistics'
import { ConfigProvider, Table } from 'antd'
import { useRouter } from 'next/navigation'
import React from 'react'
import CsvDownload from 'react-csv-downloader'

const RICessions = () => {
  const { riCessionReport }: any = useContextApi()

  console.log(riCessionReport)

  const columns = [
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
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
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
      title: 'Insured',
      dataIndex: 'insured',
      key: 'insured',
    },
    {
      title: 'Product',
      dataIndex: 'product',
      key: 'product',
    },
    {
      title: 'Hazard',
      dataIndex: 'hazard',
      key: 'hazard',
    },
    {
      title: '100%(si)',
      dataIndex: '100%(si)',
      key: '100%(si)',
      render: (_: any, item: any) => (
        <p>KSH {item['100%(si)']?.toLocaleString()}</p>
      ),
    },
    {
      title: '100%(prem)',
      dataIndex: '100%(prem)',
      key: '100%(prem)',
      render: (_: any, item: any) => (
        <p>KSH {item['100%(prem)']?.toLocaleString()}</p>
      ),
    },
    {
      title: 'Retention Si',
      dataIndex: 'retentionSi',
      key: 'retentionSi',
      render: (_: any, item: any) => (
        <p>KSH {item.retentionSi.toLocaleString()}</p>
      ),
    },
    {
      title: 'Retention Premium',
      dataIndex: 'retentionPrem',
      key: 'retentionPrem',
      render: (_: any, item: any) => (
        <p>KSH {item.retentionPrem.toLocaleString()}</p>
      ),
    },
    {
      title: 'CQS si',
      dataIndex: 'cqsSi',
      key: 'cqsSi',
      render: (_: any, item: any) => <p>KSH {item.cqsSi.toLocaleString()}</p>,
    },
    {
      title: 'CQS prem',
      dataIndex: 'cqsPrem',
      key: 'cqsPrem',
      render: (_: any, item: any) => <p>KSH {item.cqsPrem.toLocaleString()}</p>,
    },
    {
      title: 'Surp 1 Prem',
      dataIndex: 'surp1Si',
      key: 'surp1Si',
      render: (_: any, item: any) => <p>KSH {item.surp1Si.toLocaleString()}</p>,
    },
    {
      title: 'Surp 1 Prem',
      dataIndex: 'surp1Prem',
      key: 'surp1Prem',
      render: (_: any, item: any) => (
        <p>KSH {item.surp1Prem.toLocaleString()}</p>
      ),
    },
    {
      title: 'Surp 1 Comm',
      dataIndex: 'surp1Comm',
      key: 'surp1Comm',
      render: (_: any, item: any) => (
        <p>KSH {item.surp1Comm.toLocaleString()}</p>
      ),
    },
    {
      title: 'Surp 2 Si',
      dataIndex: 'surp2Si',
      key: 'surp2Si',
    },
    {
      title: 'Surp 1 Prem',
      dataIndex: 'surp2Prem',
      key: 'surp2Prem',
    },
    {
      title: 'Surp 2 Comm',
      dataIndex: 'surp2Comm',
      key: 'surp2Comm',
    },
    {
      title: 'QS Si',
      dataIndex: 'qsSi',
      key: 'qsSi',
    },
    {
      title: 'QS Prem',
      dataIndex: 'qsPrem',
      key: 'qsPrem',
    },
    {
      title: 'QS Comm',
      dataIndex: 'qsComm',
      key: 'qsComm',
    },
    {
      title: 'Fac Out si',
      dataIndex: 'facOutSi',
      key: 'facOutSi',
    },
    {
      title: 'Fac Out Prem',
      dataIndex: 'facOutPrem',
      key: 'facOutPrem',
    },
    {
      title: 'Fac Out Comm',
      dataIndex: 'facOutComm',
      key: 'facOutComm',
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
        <p className="text-[1.6rem] font-bold">RI Cessions Data Table</p>
        <CsvDownload
          text=""
          datas={riCessionReport}
          columns={formattedColumns}
          filename={`RI Cessions ${new Date(Date.now()).toLocaleDateString()}`}
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
          dataSource={riCessionReport}
          scroll={{ x: 3000 }}
        />
      </ConfigProvider>
    </div>
  )
}

export default RICessions
