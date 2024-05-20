"use client";
import { useContextApi } from "@/app/context/Context";
import CustomButton from "@/app/UI/reusableComponents/CustomButton";
import { formatDate } from "@/app/utils/apiLogistics";
import { ConfigProvider, Table } from "antd";
import { useRouter } from "next/navigation";
import React from "react";
import CsvDownload from "react-csv-downloader";

export const calculatePercentage = (item: any) => {
  const withholdingTax = item.withholdingTax;
  const brokerComm = item.brokerComm;

  if (
    brokerComm === 0 ||
    brokerComm == null ||
    withholdingTax == null ||
    withholdingTax == 0
  ) {
    return 0;
  }

  const result = (withholdingTax / brokerComm) * 100;

  return isNaN(result) ? 0 : result;
};

const NonMotorPremiums = () => {
  const { bimaData }: any = useContextApi();

  const filteredNonMotorPremiums = bimaData.filter(
    (data: any) => data.motorCode !== "070" || data.clientCode !== "080"
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
      dataIndex: "issueDate",
      key: "issueDate",
      render: (_: any, item: any) => <p> {formatDate(item.issueDate)}</p>,
    },
    {
      title: "Start Date",
      dataIndex: "start",
      key: "start",
      render: (_: any, item: any) => <p> {formatDate(item.start)}</p>,
    },
    {
      title: "Expiry Date",
      dataIndex: "expiry",
      key: "expiry",
      render: (_: any, item: any) => <p> {formatDate(item.expiry)}</p>,
    },
    {
      title: "Premiums",
      dataIndex: "premiums",
      key: "premiums",
      render: (_: any, item: any) => (
        <p>KSH {item.premiums?.toLocaleString()}</p>
      ),
    },
    {
      title: "EarthQuake",
      dataIndex: "earthQuake",
      key: "earthQuake",
      render: (_: any, item: any) => (
        <p>KSH {item.earthQuake?.toLocaleString()}</p>
      ),
    },
    {
      title: "PVT Premium",
      dataIndex: "PVTPremium",
      key: "PVTPremium",
      render: (_: any, item: any) => (
        <p>KSH {item.PVTPremium.toLocaleString()}</p>
      ),
    },
    {
      title: "Stamp Duty",
      dataIndex: "stampDuty",
      key: "stampDuty",
      render: (_: any, item: any) => (
        <p>KSH {item.stampDuty.toLocaleString()}</p>
      ),
    },
    {
      title: "PHC Fund",
      dataIndex: "PHCFund",
      key: "PHCFund",
      render: (_: any, item: any) => <p>KSH {item.PHCFund.toLocaleString()}</p>,
    },
    {
      title: "Training Levt",
      dataIndex: "trainingLevy",
      key: "trainingLevy",
      render: (_: any, item: any) => (
        <p>KSH {item.trainingLevy.toLocaleString()}</p>
      ),
    },
    {
      title: "PTA Charge",
      dataIndex: "PTACharge",
      key: "PTACharge",
      render: (_: any, item: any) => (
        <p>KSH {item.PTACharge.toLocaleString()}</p>
      ),
    },
    {
      title: "AA Charge",
      dataIndex: "AACharge",
      key: "AACharge",
      render: (_: any, item: any) => (
        <p>KSH {item.AACharge.toLocaleString()}</p>
      ),
    },
    {
      title: "Broker Comm",
      dataIndex: "brokerComm",
      key: "brokerComm",
      render: (_: any, item: any) => (
        <p>KSH {item.brokerComm.toLocaleString()}</p>
      ),
    },
    {
      title: "Withholding Tax",
      dataIndex: "witholdingTax",
      key: "witholdingTax",
      render: (_: any, item: any) => (
        <p>KSH {item.witholdingTax.toLocaleString()}</p>
      ),
    },
    {
      title: "Rate",
      dataIndex: "rate",
      key: "rate",
      render: (_: any, item: any) => <p> {calculatePercentage(item)}%</p>,
    },
    {
      title: "Net Premium",
      dataIndex: "netPrem",
      key: "netPrem",
      render: (_: any, item: any) => <p>KSH {item.netPrem.toLocaleString()}</p>,
    },
  ];

  const formattedColumns = columns.map((column) => {
    return {
      id: column.dataIndex,
      displayName: column.title,
    };
  });
  const router = useRouter();
  return (
    <div className="mx-2 my-2">
      <div className="flex justify-between my-2">
        <CustomButton
          name={"Back"}
          className=" bg-[#cb7729] text-white  h-[30px] rounded-md w-[100px]"
          onClick={() => router.back()}
        />
        <p className="text-[1.6rem] font-bold">
          {" "}
          Non Motor Premiums Data Table
        </p>
        <CsvDownload
          text=""
          datas={filteredNonMotorPremiums}
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
        <Table
          columns={columns}
          dataSource={filteredNonMotorPremiums}
          scroll={{ x: 2500 }}
        />
      </ConfigProvider>
    </div>
  );
};

export default NonMotorPremiums;
