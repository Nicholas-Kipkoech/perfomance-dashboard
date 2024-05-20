"use client";
import { useContextApi } from "@/app/context/Context";
import CustomButton from "@/app/UI/reusableComponents/CustomButton";
import { formatDate } from "@/app/utils/apiLogistics";
import { ConfigProvider, Table } from "antd";
import { useRouter } from "next/navigation";
import React from "react";
import { calculatePercentage } from "../nonMotorPremiums/page";

const DirectPremiums = () => {
  const { bimaData }: any = useContextApi();

  const filteredDirectPremiums = bimaData.filter(
    (data: any) => data.clientCode === "15"
  );

  const columns = [
    {
      title: "Policy No",
      dataIndex: "policyNo",
      key: "policyNo",
    },
    {
      title: "Endorsement No",
      dataIndex: "endNo",
      key: "endNo",
    },
    {
      title: "Insured",
      dataIndex: "insured",
      key: "insured",
    },
    {
      title: "Sum Insured",
      dataIndex: "sumInsured",
      key: "sumInsured",
    },
    {
      title: "Issue Date",
      dataIndex: "name",
      key: "name",
      render: (_: any, item: any) => <p> {formatDate(item.issueDate)}</p>,
    },
    {
      title: "Start Date",
      dataIndex: "name",
      key: "name",
      render: (_: any, item: any) => <p> {formatDate(item.start)}</p>,
    },
    {
      title: "Expiry Date",
      dataIndex: "name",
      key: "name",
      render: (_: any, item: any) => <p> {formatDate(item.expiry)}</p>,
    },
    {
      title: "Premiums",
      dataIndex: "name",
      key: "name",
      render: (_: any, item: any) => (
        <p>KSH {item.premiums?.toLocaleString()}</p>
      ),
    },
    {
      title: "EarthQuake",
      dataIndex: "name",
      key: "name",
      render: (_: any, item: any) => (
        <p>KSH {item.earthQuake?.toLocaleString()}</p>
      ),
    },
    {
      title: "PVT Premium",
      dataIndex: "name",
      key: "name",
      render: (_: any, item: any) => (
        <p>KSH {item.PVTPremium.toLocaleString()}</p>
      ),
    },
    {
      title: "Stamp Duty",
      dataIndex: "name",
      key: "name",
      render: (_: any, item: any) => (
        <p>KSH {item.stampDuty.toLocaleString()}</p>
      ),
    },
    {
      title: "PHC Fund",
      dataIndex: "name",
      key: "name",
      render: (_: any, item: any) => <p>KSH {item.PHCFund.toLocaleString()}</p>,
    },
    {
      title: "Training Levt",
      dataIndex: "name",
      key: "name",
      render: (_: any, item: any) => (
        <p>KSH {item.trainingLevy.toLocaleString()}</p>
      ),
    },
    {
      title: "PTA Charge",
      dataIndex: "name",
      key: "name",
      render: (_: any, item: any) => (
        <p>KSH {item.PTACharge.toLocaleString()}</p>
      ),
    },
    {
      title: "AA Charge",
      dataIndex: "name",
      key: "name",
      render: (_: any, item: any) => (
        <p>KSH {item.AACharge.toLocaleString()}</p>
      ),
    },
    {
      title: "Broker Comm",
      dataIndex: "name",
      key: "name",
      render: (_: any, item: any) => (
        <p>KSH {item.brokerComm.toLocaleString()}</p>
      ),
    },
    {
      title: "Withholding Tax",
      dataIndex: "name",
      key: "name",
      render: (_: any, item: any) => (
        <p>KSH {item.witholdingTax.toLocaleString()}</p>
      ),
    },
    {
      title: "Rate",
      dataIndex: "name",
      key: "name",
      render: (_: any, item: any) => <p> {calculatePercentage(item)}%</p>,
    },
    {
      title: "Net Premium",
      dataIndex: "name",
      key: "name",
      render: (_: any, item: any) => <p>KSH {item.netPrem.toLocaleString()}</p>,
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
        <p className="text-[1.6rem] font-bold">Direct Premiums Data Table</p>
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
        <Table
          columns={columns}
          dataSource={filteredDirectPremiums}
          scroll={{ x: 2500 }}
        />
      </ConfigProvider>
    </div>
  );
};

export default DirectPremiums;
