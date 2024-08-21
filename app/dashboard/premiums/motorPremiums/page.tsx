'use client'
import { columnsKE } from '@/app/columns/premium-columns'
import { useContextApi } from '@/app/context/Context'
import CustomButton from '@/app/UI/reusableComponents/CustomButton'
import { formatDate } from '@/app/utils/apiLogistics'
import { ConfigProvider, Table } from 'antd'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import CsvDownload from 'react-csv-downloader'

const MotorPremiums = () => {
  const { bimaData }: any = useContextApi()

  const filteredMotorPremiums = bimaData.filter(
    (data: any) => data.motorCode === '070' || data.clientCode === '080',
  )

  const formattedColumns = columnsKE.map((column: any) => {
    return {
      id: column.dataIndex,
      displayName: column.title,
    }
  })
  const router = useRouter()
  return (
    <div className="mx-2 my-2">
      <div className="flex justify-between my-2">
        <CustomButton
          name={'Back'}
          className=" bg-[#cb7729] text-white  h-[30px] rounded-md w-[100px]"
          onClick={() => router.back()}
        />
        <p className="text-[1.6rem] font-bold"> Motor Premiums Data Table</p>
        <CsvDownload
          text=""
          datas={filteredMotorPremiums}
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
          columns={columnsKE}
          dataSource={filteredMotorPremiums}
          scroll={{ x: 2500 }}
        />
      </ConfigProvider>
    </div>
  )
}

export default MotorPremiums
