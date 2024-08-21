'use client'
import { StatisticalContext } from '@/app/context/StatisticalContext'
import { ConfigProvider, Table } from 'antd'
import { useSearchParams, useRouter } from 'next/navigation'
import React, { Suspense, useContext, useEffect } from 'react'
import { IoArrowBackOutline } from 'react-icons/io5'

// Ensure the component is wrapped with Suspense to handle async data
const UnpaidBills = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UnpaidBillsContent />
    </Suspense>
  )
}

const UnpaidBillsContent = () => {
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
    if (category) {
      setCategory(category)
    }
  }, [category, setCategory])

  const router = useRouter()
  const columns = [
    {
      title: 'Index',
      dataIndex: 'payee_name',
      key: 'payee_name',
      render: (_: any, item: any, index: number) => <p>{index + 1}</p>,
    },
    {
      title: 'Payee Name',
      dataIndex: 'payee_name',
      key: 'payee_name',
    },
    {
      title: 'Amount To Pay',
      dataIndex: 'amountToPay',
      key: 'amountToPay',
      render: (amountToPay: number) => <p>{amountToPay.toLocaleString()}</p>,
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
          pagination={{ pageSize: 30 }}
        />
      </ConfigProvider>
    </div>
  )
}

export default UnpaidBills
