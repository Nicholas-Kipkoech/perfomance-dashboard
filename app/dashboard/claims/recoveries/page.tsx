"use client";
import { useContextApi } from "@/app/context/Context";
import CustomButton from "@/app/UI/reusableComponents/CustomButton";
import { formatDate } from "@/app/utils/apiLogistics";
import { ConfigProvider, Table } from "antd";
import { useRouter } from "next/navigation";
import React from "react";
import CsvDownload from "react-csv-downloader";

const Recoveries = () => {
  const { recovery }: any = useContextApi();

  const columns = [
    {
      title: "Class Of Business",
      dataIndex: "classOfBusiness",
      key: "classOfBusiness",
    },
    {
      title: "100% Amount",
      dataIndex: "paidAmount",
      key: "paidAmount",
      render: (_: any, item: any) => <p> {item.paidAmount.toLocaleString()}</p>,
    },
    {
      title: "Retention Amount",
      dataIndex: "treatyAmount",
      key: "treatyAmount",
      render: (_: any, item: any) => (
        <p> {item.retentionAmount.toLocaleString()}</p>
      ),
    },
    {
      title: "Treaty Amount",
      dataIndex: "treatyAmount",
      key: "treatyAmount",
      render: (_: any, item: any) => (
        <p>{item.treatyAmount.toLocaleString()}</p>
      ),
    },
    {
      title: "Fac Amount",
      dataIndex: "facAmount",
      key: "facAmount",
      render: (_: any, item: any) => <p> {item.facAmount.toLocaleString()}</p>,
    },
    {
      title: "XOL Amount",
      dataIndex: "xolAmount",
      key: "xolAmount",
      render: (_: any, item: any) => <p> {item.xolAmount.toLocaleString()}</p>,
    },
  ];
  const router = useRouter();

  const formattedColumns = columns.map((column) => {
    return {
      id: column.dataIndex,
      displayName: column.title,
    };
  });
  return (
    <div className="mx-2 my-2">
      <div className="flex justify-between my-2">
        <CustomButton
          name={"back"}
          className=" bg-[#cb7729]  h-[30px] rounded-md w-[100px]"
          onClick={() => router.back()}
        />
        <p className="text-[1.6rem] font-bold">Recovery Data Table</p>
        <CsvDownload
          text=""
          datas={recovery}
          columns={formattedColumns}
          filename={`Salvages data ${new Date(
            Date.now()
          ).toLocaleDateString()}`}
          extension=".csv"
          className="bg-[#cb7529] h-[2.3rem]  rounded-sm text-white border w-[8rem] p-2 flex justify-center items-center"
        />
      </div>
      <ConfigProvider
        theme={{
          components: {
            Table: {
              headerBg: "#092332",
              headerColor: "white",
              colorBgContainer: "whitesmoke",
              rowHoverBg: "#cb7529",
              padding: 8,
            },
          },
        }}
      >
        <Table columns={columns} dataSource={recovery} />
      </ConfigProvider>
    </div>
  );
};

export default Recoveries;
