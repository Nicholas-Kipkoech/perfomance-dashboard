'use client'
import { useContextApi } from '@/app/context/Context'
import CustomButton from '@/app/UI/reusableComponents/CustomButton'
import { formatDate } from '@/app/utils/apiLogistics'
import { ConfigProvider, Table } from 'antd'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import CsvDownload from 'react-csv-downloader'
import { calculatePercentage } from '../helpers'
import { ENVIROMENT } from '@/app/context/database-connect'
import { columnsKE, columnsZambia } from '@/app/columns/premium-columns'

export function checkEnviroment() {
  if (ENVIROMENT === 'KENYA') {
    return columnsKE
  } else if (ENVIROMENT === 'ZAMBIA') {
    return columnsZambia
  }
}

const DirectPremiums = () => {
  const { bimaData }: any = useContextApi()

  const [columns, setColumns] = useState<any>([])

  const filteredDirectPremiums = bimaData.filter(
    (data: any) => data.clientCode === '15',
  )
  useEffect(() => {
    const columns = checkEnviroment()
    setColumns(columns)
  }, [])

  const router = useRouter()

  const formattedColumns = columns.map((column: any) => {
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
        <p className="text-[1.6rem] font-bold">Direct Premiums Data Table</p>
        <CsvDownload
          text=""
          datas={filteredDirectPremiums}
          columns={formattedColumns}
          filename={`Premium Register data ${new Date(
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
            },
          },
        }}
      >
        <Table
          columns={columns}
          dataSource={filteredDirectPremiums}
          scroll={{ x: 2500 }}
        />
      </ConfigProvider>
    </div>
  )
}

export default DirectPremiums
