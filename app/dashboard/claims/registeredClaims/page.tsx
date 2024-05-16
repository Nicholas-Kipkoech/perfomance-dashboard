"use client";
import { useContextApi } from "@/app/context/Context";
import CustomButton from "@/app/UI/reusableComponents/CustomButton";
import { formatDate } from "@/app/utils/apiLogistics";
import { ConfigProvider, Table } from "antd";
import { useRouter } from "next/navigation";
import React from "react";

const RegisteredClaims = () => {
  const { registeredClaims }: any = useContextApi();

  const columns = [
    {
      title: "Claim No",
      dataIndex: "claimNo",
      key: "claimNo",
    },
    {
      title: "Reported On",
      dataIndex: "className",
      key: "className",
      render: (_: any, item: any) => <p>{formatDate(item.reportedOn)}</p>,
    },
    {
      title: "Loss Date",
      dataIndex: "name",
      key: "name",
      render: (_: any, item: any) => <p>{formatDate(item.lossDate)}</p>,
    },
    {
      title: "Insured",
      dataIndex: "insured",
      key: "insured",
    },
    {
      title: "Policy No",
      dataIndex: "policyNo",
      key: "policyNo",
    },
    {
      title: "Endorsement",
      dataIndex: "endNo",
      key: "endNo",
    },
    {
      title: "Commence",
      dataIndex: "name",
      key: "name",
      render: (_: any, item: any) => <p>{formatDate(item.commence)}</p>,
    },
    {
      title: "Expiry",
      dataIndex: "name",
      key: "name",
      render: (_: any, item: any) => <p>{formatDate(item.expiry)}</p>,
    },
    {
      title: "Sum Insured",
      dataIndex: "name",
      key: "name",
      render: (_: any, item: any) => <p>{item.sumInsured?.toLocaleString()}</p>,
    },
    {
      title: "Policy Class",
      dataIndex: "policyClass",
      key: "policyClass",
    },
    {
      title: "Sub Class",
      dataIndex: "subClass",
      key: "subClass",
    },
    {
      title: "Intermediary",
      dataIndex: "intermediary",
      key: "intermediary",
    },
    {
      title: "Policy Cover",
      dataIndex: "policyCover",
      key: "policyCover",
    },
    {
      title: "Belongs To",
      dataIndex: "belongsTo",
      key: "belongsTo",
    },
    {
      title: "Registered At",
      dataIndex: "registeredAt",
      key: "registeredAt",
    },
    {
      title: "Total Provision",
      dataIndex: "totalProvision",
      key: "totalProvision",
      render: (_: any, item: any) => (
        <p>{item.totalProvision?.toLocaleString()}</p>
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
        <p className="text-[1.6rem] font-bold">Registered Claims Data Table</p>
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
        <Table
          columns={columns}
          dataSource={registeredClaims}
          scroll={{ x: 3000 }}
        />
      </ConfigProvider>
    </div>
  );
};

export default RegisteredClaims;
