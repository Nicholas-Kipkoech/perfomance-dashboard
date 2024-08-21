'use client'
import { useContextApi } from '@/app/context/Context'
import CustomButton from '@/app/UI/reusableComponents/CustomButton'
import { formatDate } from '@/app/utils/apiLogistics'
import { ConfigProvider, Table } from 'antd'
import { useRouter } from 'next/navigation'
import React from 'react'
import CsvDownload from 'react-csv-downloader'

const PaidClaims = () => {
  const { claimsData }: any = useContextApi()

  const columns = [
    {
      title: 'Claim No',
      dataIndex: 'claimNo',
      key: 'claimNo',
    },
    {
      title: 'Intimation Date',
      dataIndex: 'intimationDate',
      key: 'intimationDate',
      render: (_: any, item: any) => <p>{formatDate(item.intimationDate)}</p>,
    },
    {
      title: 'Loss Date',
      dataIndex: 'lossDate',
      key: 'lossDate',
      render: (_: any, item: any) => <p>{formatDate(item.lossDate)}</p>,
    },
    {
      title: 'Insured',
      dataIndex: 'insured',
      key: 'insured',
    },
    {
      title: 'Policy No',
      dataIndex: 'policyNo',
      key: 'policyNo',
    },
    {
      title: 'Endorsement',
      dataIndex: 'endNo',
      key: 'endNo',
    },
    {
      title: 'Start',
      dataIndex: 'start',
      key: 'start',
      render: (_: any, item: any) => <p>{formatDate(item.start)}</p>,
    },
    {
      title: 'Expiry',
      dataIndex: 'expiry',
      key: 'expiry',
      render: (_: any, item: any) => <p>{formatDate(item.expiry)}</p>,
    },
    {
      title: 'Sum Insured',
      dataIndex: 'sumInsured',
      key: 'sumInsured',
      render: (_: any, item: any) => (
        <p> {item.sumInsured?.toLocaleString()}</p>
      ),
    },
    {
      title: 'Policy Class',
      dataIndex: 'policyClass',
      key: 'policyClass',
    },
    {
      title: 'Sub Class',
      dataIndex: 'subClass',
      key: 'subClass',
    },
    {
      title: 'Acc Month',
      dataIndex: 'accMonth',
      key: 'accMonth',
      render: (_: any, item: any) => <p>{formatDate(item.accMonth)}</p>,
    },
    {
      title: 'Paymnt Date',
      dataIndex: 'paymentDate',
      key: 'paymentDate',
      render: (_: any, item: any) => <p>{formatDate(item.paymentDate)}</p>,
    },
    {
      title: 'Reserve Type',
      dataIndex: 'reserveType',
      key: 'reserveType',
    },
    {
      title: 'Payment Mode',
      dataIndex: 'paymentMode',
      key: 'paymentMode',
    },
    {
      title: 'Payment No',
      dataIndex: 'paymentNo',
      key: 'paymentNo',
    },
    {
      title: 'Payment Type',
      dataIndex: 'paymentType',
      key: 'paymentType',
    },
    {
      title: 'Paid At',
      dataIndex: 'paidAt',
      key: 'paidAt',
    },
    {
      title: 'Belongs To',
      dataIndex: 'belongsTo',
      key: 'belongsTo',
    },
    {
      title: 'Paid Amount',
      dataIndex: 'paidAmount',
      key: 'paidAmount',
      render: (_: any, item: any) => (
        <p> {item.paidAmount?.toLocaleString()}</p>
      ),
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
          name={'back'}
          className=" bg-[#cb7729]  h-[30px] rounded-md w-[100px]"
          onClick={() => router.back()}
        />
        <p className="text-[1.6rem] font-bold">Paid Claims Data Table</p>
        <CsvDownload
          text=""
          datas={claimsData}
          columns={formattedColumns}
          filename={`Paid Claims data ${new Date(
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
        <Table columns={columns} dataSource={claimsData} scroll={{ x: 3000 }} />
      </ConfigProvider>
    </div>
  )
}

export default PaidClaims
