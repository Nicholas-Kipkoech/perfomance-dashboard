"use client";
import { useContextApi } from "@/app/context/Context";
import CustomButton from "@/app/UI/reusableComponents/CustomButton";
import { formatDate } from "@/app/utils/apiLogistics";
import { ConfigProvider, Table } from "antd";
import { useRouter } from "next/navigation";
import React from "react";

const Salvages = () => {
  const { salvages }: any = useContextApi();

  const columns = [
    {
      title: "Recovery Type",
      dataIndex: "recoveryType",
      key: "recoveryType",
    },
    {
      title: "Receipt No",
      dataIndex: "receiptNo",
      key: "receiptNo",
    },
    {
      title: "Date",
      dataIndex: "name",
      key: "name",
      render: (_: any, item: any) => <p>{formatDate(item.date)}</p>,
    },
    {
      title: "Recieved From",
      dataIndex: "receievedFrom",
      key: "receievedFrom",
    },
    {
      title: "Insured",
      dataIndex: "insured",
      key: "insured",
    },
    {
      title: "Intermediary",
      dataIndex: "intermediary",
      key: "intermediary",
    },
    {
      title: "Claim No",
      dataIndex: "claimNo",
      key: "claimNo",
    },
    {
      title: "Policy No",
      dataIndex: "policyNo",
      key: "policyNo",
    },
    {
      title: "Loss Date",
      dataIndex: "lossDate",
      key: "lossDate",
      render: (_: any, item: any) => <p>{formatDate(item.lossDate)}</p>,
    },
    {
      title: "Intimation Date",
      dataIndex: "intimationDate",
      key: "intimationDate",
      render: (_: any, item: any) => <p>{formatDate(item.intimationDate)}</p>,
    },
    {
      title: "Commence",
      dataIndex: "subClass",
      key: "subClass",
      render: (_: any, item: any) => <p>{formatDate(item.commence)}</p>,
    },
    {
      title: "Expiry",
      dataIndex: "branch",
      key: "branch",
      render: (_: any, item: any) => <p>{formatDate(item.expiry)}</p>,
    },

    {
      title: "Receipt Amount",
      dataIndex: "policyCover",
      key: "policyCover",
      render: (_: any, item: any) => (
        <p>KSH {item.receiptAmount.toLocaleString()}</p>
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
        <p className="text-[1.6rem] font-bold">Salvages Data Table</p>
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
        <Table columns={columns} dataSource={salvages} scroll={{ x: 3000 }} />
      </ConfigProvider>
    </div>
  );
};

export default Salvages;
