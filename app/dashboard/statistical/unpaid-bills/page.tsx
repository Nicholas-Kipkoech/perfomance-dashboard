'use client'
import { StatisticalContext } from '@/app/context/StatisticalContext'
import { ConfigProvider, Table } from 'antd'
import { useSearchParams, useRouter } from 'next/navigation'
import React, { useContext, useEffect } from 'react'
import { IoArrowBackOutline } from 'react-icons/io5'

const UnpaidBills = () => {
  const { setCategory, unpaidBills2, loadingUnpaidBills2 }: any = useContext(
    StatisticalContext,
  )
  const totals = unpaidBills2.reduce(
    (acc: any, bill: any) => acc + bill.amountToPay,
    0,
  )

  const params = useSearchParams()
  const category = params.get('category')
  useEffect(() => {
    setCategory(category)
  }, [])
  const router = useRouter()
  const columns = [
    {
      title: 'Payee Name',
      dataIndex: 'payee_name',
      key: 'payee_name',
    },
    {
      title: 'Amount To Pay',
      dataIndex: 'payee_name',
      key: 'payee_name',
      render: (_: any, item: any) => <p>{item.amountToPay.toLocaleString()}</p>,
    },
  ]
  return (
    <div className="mt-2 mx-2">
      <div className="flex justify-between mb-4 items-center">
        <div
          className="flex gap-1 items-center cursor-pointer"
          onClick={() => router.back()}
        >
          <IoArrowBackOutline size={20} />
          <p>Back</p>
        </div>
        <p className="font-bold text-[1.5rem]">Unpaid bills by category</p>
        <p className="font-bold">
          {!loadingUnpaidBills2 ? `Totals ${totals.toLocaleString()}` : 0}{' '}
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
          columns={columns}
          dataSource={loadingUnpaidBills2 ? [] : unpaidBills2}
          loading={loadingUnpaidBills2}
        />
      </ConfigProvider>
    </div>
  )
}

export default UnpaidBills
