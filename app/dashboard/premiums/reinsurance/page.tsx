"use client";
import { useContextApi } from "@/app/context/Context";
import CustomButton from "@/app/UI/reusableComponents/CustomButton";
import { formatDate } from "@/app/utils/apiLogistics";
import { ConfigProvider, Table } from "antd";
import { useRouter } from "next/navigation";
import React from "react";
import CsvDownload from "react-csv-downloader";

const Reinsurance = () => {
  const { reinsurance }: any = useContextApi();

  const columns = [
    {
      title: "Policy No",
      dataIndex: "policyNo",
      key: "policyNo",
    },
    {
      title: "Endorsment No",
      dataIndex: "endNo",
      key: "endNo",
    },
    {
      title: "Slip No",
      dataIndex: "slipNo",
      key: "slipNo",
    },
    {
      title: "Insured",
      dataIndex: "insured",
      key: "insured",
    },
    {
      title: "Class",
      dataIndex: "class",
      key: "class",
    },
    {
      title: "Issue Date",
      dataIndex: "issueDate",
      key: "issueDate",
      render: (_: any, item: any) => <p> {formatDate(item.issueDate)}</p>,
    },
    {
      title: "Commence",
      dataIndex: "commence",
      key: "commence",
      render: (_: any, item: any) => <p> {formatDate(item.commence)}</p>,
    },
    {
      title: "Expiry",
      dataIndex: "expiry",
      key: "expiry",
      render: (_: any, item: any) => <p> {formatDate(item.expiry)}</p>,
    },
    {
      title: "Ceding Company",
      dataIndex: "cedingCompany",
      key: "cedingCompany",
    },
    {
      title: "Cedant Company",
      dataIndex: "cedantCompany",
      key: "cedantCompany",
    },
    {
      title: "Original SI",
      dataIndex: "originalSI",
      key: "originalSI",
    },
    {
      title: "Premium",
      dataIndex: "premium",
      key: "premium",
    },
    {
      title: "Share",
      dataIndex: "share",
      key: "share",
    },
    {
      title: "Gross Premium",
      dataIndex: "grossPremium",
      key: "grossPremium",
    },
    {
      title: "FAC Re Comm",
      dataIndex: "FACrecomm",
      key: "FACrecomm",
    },
    {
      title: "Net Premim",
      dataIndex: "netPremium",
      key: "netPremium",
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
        <p className="text-[1.6rem] font-bold">
          Reinsurance Premiums Data Table
        </p>
        <CsvDownload
          text=""
          datas={reinsurance}
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
              padding: 5,
            },
          },
        }}
      >
        <Table
          columns={columns}
          dataSource={reinsurance}
          scroll={{ x: 3000 }}
        />
      </ConfigProvider>
    </div>
  );
};

export default Reinsurance;
