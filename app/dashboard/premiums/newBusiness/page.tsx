"use client";
import { useContextApi } from "@/app/context/Context";
import CustomButton from "@/app/UI/reusableComponents/CustomButton";
import { ConfigProvider, Table } from "antd";
import { useRouter } from "next/navigation";
import React from "react";
import CsvDownload from "react-csv-downloader";

const NewBusiness = () => {
  const { productionData }: any = useContextApi();

  const columns = [
    {
      title: "Branch Name",
      dataIndex: "branchName",
      key: "branchName",
    },
    {
      title: "New Business",
      dataIndex: "newBusiness",
      key: "newBusiness",
      render: (_: any, item: any) => (
        <p>KSH {item.newBusiness.toLocaleString()}</p>
      ),
    },
    {
      title: "Renewals",
      dataIndex: "renewals",
      key: "renewals",
      render: (_: any, item: any) => (
        <p>KSH {item.renewals.toLocaleString()}</p>
      ),
    },
    {
      title: "Totals",
      dataIndex: "totals",
      key: "totals",
      render: (_: any, item: any) => (
        <p>KSH {(item.renewals + item.newBusiness).toLocaleString()}</p>
      ),
    },
  ];
  const formattedColumns = columns.map((column) => {
    return {
      id: column.dataIndex,
      displayName: column.title,
    };
  });

  const formattedData = productionData.map((data: any) => {
    return {
      branchName: data.branchName,
      newBusiness: data.newBusiness,
      renewals: data.renewals,
      totals: data.renewals + data.newBusiness,
    };
  });

  const router = useRouter();
  return (
    <div className="mx-2 my-2">
      <div className="flex justify-between my-2">
        <CustomButton
          name={"Back"}
          className=" bg-[#cb7729] text-white h-[30px] rounded-md w-[100px]"
          onClick={() => router.back()}
        />
        <p className="text-[1.6rem] font-bold">New Business Data Table</p>
        <CsvDownload
          text=""
          datas={formattedData}
          columns={formattedColumns}
          filename={`Premium Register data ${new Date(
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
            },
          },
        }}
      >
        <Table columns={columns} dataSource={productionData} />
      </ConfigProvider>
    </div>
  );
};

export default NewBusiness;
