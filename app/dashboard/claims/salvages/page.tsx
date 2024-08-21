'use client'
import { useContextApi } from '@/app/context/Context'
import CustomButton from '@/app/UI/reusableComponents/CustomButton'
import { formatDate } from '@/app/utils/apiLogistics'
import { ConfigProvider, Table } from 'antd'
import { useRouter } from 'next/navigation'
import React from 'react'
import CsvDownload from 'react-csv-downloader'

const Salvages = () => {
  const { salvages }: any = useContextApi()

  const columns = [
    {
      title: 'Recovery Type',
      dataIndex: 'recoveryType',
      key: 'recoveryType',
    },
    {
      title: 'Receipt No',
      dataIndex: 'receiptNo',
      key: 'receiptNo',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (_: any, item: any) => <p>{formatDate(item.date)}</p>,
    },
    {
      title: 'Recieved From',
      dataIndex: 'receievedFrom',
      key: 'receievedFrom',
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
      title: 'Loss Date',
      dataIndex: 'lossDate',
      key: 'lossDate',
      render: (_: any, item: any) => <p>{formatDate(item.lossDate)}</p>,
    },
    {
      title: 'Intimation Date',
      dataIndex: 'intimationDate',
      key: 'intimationDate',
      render: (_: any, item: any) => <p>{formatDate(item.intimationDate)}</p>,
    },
    {
      title: 'Commence',
      dataIndex: 'commence',
      key: 'commence',
      render: (_: any, item: any) => <p>{formatDate(item.commence)}</p>,
    },
    {
      title: 'Expiry',
      dataIndex: 'expiry',
      key: 'expiry',
      render: (_: any, item: any) => <p>{formatDate(item.expiry)}</p>,
    },

    {
      title: 'Receipt Amount',
      dataIndex: 'receiptAmount',
      key: 'receiptAmount',
      render: (_: any, item: any) => (
        <p> {item.receiptAmount.toLocaleString()}</p>
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
          name={'Back'}
          className=" bg-[#cb7729] text-white  h-[30px] rounded-md w-[100px]"
          onClick={() => router.back()}
        />
        <p className="text-[1.6rem] font-bold">Salvages Data Table</p>
        <CsvDownload
          text=""
          datas={salvages}
          columns={formattedColumns}
          filename={`Salvages data ${new Date(
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
        <Table columns={columns} dataSource={salvages} scroll={{ x: 3000 }} />
      </ConfigProvider>
    </div>
  )
}

export default Salvages
