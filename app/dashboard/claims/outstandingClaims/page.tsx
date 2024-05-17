"use client";
import { useContextApi } from "@/app/context/Context";
import CustomButton from "@/app/UI/reusableComponents/CustomButton";
import { formatDate } from "@/app/utils/apiLogistics";
import { ConfigProvider, Table } from "antd";
import { useRouter } from "next/navigation";
import React from "react";

const OutStandingClaims = () => {
  const { outstandingClaims }: any = useContextApi();

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
      title: "Agent",
      dataIndex: "agent",
      key: "agent",
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
      title: "Start",
      dataIndex: "name",
      key: "name",
      render: (_: any, item: any) => <p>{formatDate(item.start)}</p>,
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
      render: (_: any, item: any) => (
        <p>KSH {item.sumInsured?.toLocaleString()}</p>
      ),
    },
    {
      title: "Sub Class",
      dataIndex: "subClass",
      key: "subClass",
    },
    {
      title: "Branch",
      dataIndex: "branch",
      key: "branch",
    },
    {
      title: "Provision Month",
      dataIndex: "provisionMonth",
      key: "provisionMonth",
    },
    {
      title: "Total Provision",
      dataIndex: "policyCover",
      key: "policyCover",
      render: (_: any, item: any) => (
        <p>KSH {item.totalProvision.toLocaleString()}</p>
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
        <p className="text-[1.6rem] font-bold">Outstanding Claims Data Table</p>
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
          dataSource={outstandingClaims}
          scroll={{ x: 3000 }}
        />
      </ConfigProvider>
    </div>
  );
};

export default OutStandingClaims;
