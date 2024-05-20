"use client";
import { useContextApi } from "@/app/context/Context";
import CustomButton from "@/app/UI/reusableComponents/CustomButton";
import { formatDate } from "@/app/utils/apiLogistics";
import { ConfigProvider, Table } from "antd";
import { useRouter } from "next/navigation";
import React from "react";
import CsvDownload from "react-csv-downloader";

const UndebitedPolicies = () => {
  const { undebitedPolicies }: any = useContextApi();

  const columns = [
    {
      title: "Req By",
      dataIndex: "regBy",
      key: "regBy",
    },
    {
      title: "Mod By",
      dataIndex: "modBy",
      key: "modBy",
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
      title: "Client",
      dataIndex: "client",
      key: "client",
    },
    {
      title: "Intermediary",
      dataIndex: "intermediary",
      key: "intermediary",
    },
    {
      title: "Branch",
      dataIndex: "branchName",
      key: "branchName",
    },
    {
      title: "Commence",
      dataIndex: "commence",
      key: "commence",
      render: (_: any, item: any) => <p>{formatDate(item.commence)}</p>,
    },
    {
      title: "Expiry",
      dataIndex: "expiry",
      render: (_: any, item: any) => <p>{formatDate(item.expiry)}</p>,
    },
    {
      title: "Sub Class",
      dataIndex: "subClass",
      key: "subClass",
    },
    {
      title: "Sum Insured",
      dataIndex: "sumInsured",
      key: "sumInsured",
    },
    {
      title: "Premium",
      dataIndex: "totalPremium",
      key: "totalPremium",
    },
    {
      title: "Created On",
      dataIndex: "createdOn",
      key: "createdOn",
      render: (_: any, item: any) => <p>{formatDate(item.createdOn)}</p>,
    },
    {
      title: "Ageing",
      dataIndex: "ageing",
      key: "ageing",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
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
        <p className="text-[1.6rem] font-bold">Undebited Policies Data Table</p>
        <CsvDownload
          text=""
          datas={undebitedPolicies}
          columns={formattedColumns}
          filename={`Undebited Policies data ${new Date(
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
        <Table
          columns={columns}
          dataSource={undebitedPolicies}
          scroll={{ x: 3000 }}
        />
      </ConfigProvider>
    </div>
  );
};

export default UndebitedPolicies;
