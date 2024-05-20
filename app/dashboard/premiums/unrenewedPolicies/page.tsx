"use client";
import { useContextApi } from "@/app/context/Context";
import CustomButton from "@/app/UI/reusableComponents/CustomButton";
import { ConfigProvider, Table } from "antd";
import { useRouter } from "next/navigation";
import React from "react";
import CsvDownload from "react-csv-downloader";

const UnrenewedPolicies = () => {
  const { unrenewedPolicies }: any = useContextApi();

  const columns = [
    {
      title: "Branch Name",
      dataIndex: "branchName",
      key: "branchName",
    },
    {
      title: "Motor",
      dataIndex: "motorAmount",
      key: "motorAmount",
      render: (_: any, item: any) => (
        <p>KSH {item.motorAmount.toLocaleString()}</p>
      ),
    },
    {
      title: "Non Motor",
      dataIndex: "nonMotorAmount",
      key: "nonMotorAmount",
      render: (_: any, item: any) => (
        <p>KSH {item.nonMotorAmount.toLocaleString()}</p>
      ),
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
          name={"Back"}
          className=" bg-[#cb7729] text-white h-[30px] rounded-md w-[100px]"
          onClick={() => router.back()}
        />
        <p className="text-[1.6rem] font-bold">Unrenewed Policies Data Table</p>
        <CsvDownload
          text=""
          datas={unrenewedPolicies}
          columns={formattedColumns}
          filename={`Unrenewed Policies data ${new Date(
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
        <Table columns={columns} dataSource={unrenewedPolicies} />
      </ConfigProvider>
    </div>
  );
};

export default UnrenewedPolicies;
