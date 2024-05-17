"use client";
import { useContextApi } from "@/app/context/Context";
import CustomButton from "@/app/UI/reusableComponents/CustomButton";
import { formatDate } from "@/app/utils/apiLogistics";
import { ConfigProvider, Table } from "antd";
import { useRouter } from "next/navigation";
import React from "react";

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
      render: (_: any, item: any) => (
        <p>KSH {item.paidAmount.toLocaleString()}</p>
      ),
    },
    {
      title: "Retention Amount",
      dataIndex: "name",
      key: "name",
      render: (_: any, item: any) => (
        <p>KSH {item.retentionAmount.toLocaleString()}</p>
      ),
    },
    {
      title: "Treaty Amount",
      dataIndex: "receievedFrom",
      key: "receievedFrom",
      render: (_: any, item: any) => (
        <p>KSH {item.treatyAmount.toLocaleString()}</p>
      ),
    },
    {
      title: "Fac Amount",
      dataIndex: "insured",
      key: "insured",
      render: (_: any, item: any) => (
        <p>KSH {item.facAmount.toLocaleString()}</p>
      ),
    },
    {
      title: "XOL Amount",
      dataIndex: "intermediary",
      key: "intermediary",
      render: (_: any, item: any) => (
        <p>KSH {item.xolAmount.toLocaleString()}</p>
      ),
    },
  ];
  const router = useRouter();
  return (
    <div className="mx-2 my-2">
      <div className="flex justify-between my-2">
        <CustomButton
          name={"back"}
          className=" bg-[#cb7729]  h-[30px] rounded-md w-[100px]"
          onClick={() => router.back()}
        />
        <p className="text-[1.6rem] font-bold">Recovery Data Table</p>
        <p></p>
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
