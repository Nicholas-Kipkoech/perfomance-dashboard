"use client";
import { useContextApi } from "@/app/context/Context";
import CustomButton from "@/app/UI/reusableComponents/CustomButton";
import { ConfigProvider, Table } from "antd";
import { useRouter } from "next/navigation";
import React from "react";

const TotalPremiums = () => {
  const { bimaData }: any = useContextApi();
  console.log(bimaData);

  const columns = [
    {
      title: "Branch Name",
      dataIndex: "branchName",
      key: "branchName",
    },
    {
      title: "Class Name",
      dataIndex: "className",
      key: "className",
    },
    {
      title: "New Business",
      dataIndex: "name",
      key: "name",
      render: (_: any, item: any) => (
        <p>KSH {item.newPolicies.toLocaleString()}</p>
      ),
    },
    {
      title: "Renewals",
      dataIndex: "name",
      key: "name",
      render: (_: any, item: any) => (
        <p>KSH {item.renewals.toLocaleString()}</p>
      ),
    },
    {
      title: "Refund",
      dataIndex: "name",
      key: "name",
      render: (_: any, item: any) => <p>KSH {item.refund.toLocaleString()}</p>,
    },
    {
      title: "Additional",
      dataIndex: "name",
      key: "name",
      render: (_: any, item: any) => (
        <p>KSH {item.additional.toLocaleString()}</p>
      ),
    },
    {
      title: "Facin",
      dataIndex: "name",
      key: "name",
      render: (_: any, item: any) => <p>KSH {item.facin.toLocaleString()}</p>,
    },
    {
      title: "Commission",
      dataIndex: "name",
      key: "name",
      render: (_: any, item: any) => (
        <p>KSH {item.commision.toLocaleString()}</p>
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
        <p>Total Premiums Data Table</p>
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
            },
          },
        }}
      >
        <Table columns={columns} dataSource={bimaData} />
      </ConfigProvider>
    </div>
  );
};

export default TotalPremiums;
