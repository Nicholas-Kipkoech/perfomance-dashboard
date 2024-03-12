"use client";

import React from "react";
import { Table } from "antd";

const TableComponent = ({ total }: { total: number }) => {
  const data = [
    { data: [Math.floor(Math.random() * total)], label: "Jan" },
    { data: [Math.floor(Math.random() * total)], label: "Feb" },
    { data: [Math.floor(Math.random() * total)], label: "Mar" },
    { data: [Math.floor(Math.random() * total)], label: "Apr" },
    { data: [Math.floor(Math.random() * total)], label: "May" },
    { data: [Math.floor(Math.random() * total)], label: "Jun" },
    { data: [Math.floor(Math.random() * total)], label: "July" },
    { data: [Math.floor(Math.random() * total)], label: "Aug" },
    { data: [Math.floor(Math.random() * total)], label: "Sept" },
    { data: [Math.floor(Math.random() * total)], label: "Oct" },
    { data: [Math.floor(Math.random() * total)], label: "Nov" },
    { data: [Math.floor(Math.random() * total)], label: "Dec" },
  ];

  const columns = [
    {
      title: "Month",
      dataIndex: "label",
      key: "label",
    },
    {
      title: "Value",
      dataIndex: "data",
      render: (_: { _: any }, item: { data: number[] }) => (
        <div>KES {item.data.toLocaleString()}</div>
      ),
    },
  ];

  return (
    <div className="h-auto w-[1200px] border">
      <Table dataSource={data} columns={columns} />
    </div>
  );
};

export default TableComponent;
