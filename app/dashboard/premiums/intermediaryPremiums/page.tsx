'use client'
import { columnsKE } from '@/app/columns/premium-columns'
import { useContextApi } from '@/app/context/Context'
import CustomButton from '@/app/UI/reusableComponents/CustomButton'
import { ConfigProvider, Table } from 'antd'
import { useRouter } from 'next/navigation'
import React from 'react'

import CsvDownload from 'react-csv-downloader'

const IntermediaryPremiums = () => {
  const { bimaData }: any = useContextApi()

  const filteredIntermediaryPremiums = bimaData.filter(
    (data: any) => data.clientCode === '25' || data.clientCode === '70',
  )

  const router = useRouter()
  const formattedColumns = columnsKE.map((column: any) => {
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
          className=" bg-[#cb7729]  h-[30px] rounded-md w-[100px]"
          onClick={() => router.back()}
        />
        <p className="text-[1.6rem] font-bold">
          Intermediary Premiums Data Table
        </p>
        <CsvDownload
          text=""
          datas={filteredIntermediaryPremiums}
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
          dataSource={filteredIntermediaryPremiums}
          scroll={{ x: 2500 }}
        />
      </ConfigProvider>
    </div>
  )
}

export default IntermediaryPremiums
