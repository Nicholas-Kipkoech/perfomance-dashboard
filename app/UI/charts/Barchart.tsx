"use client";
import { BarChart } from "@mui/x-charts";
import { useEffect, useState } from "react";

interface IChartData {
  data: number[];
  label: string;
}

const BarChartComponent = ({
  title,
  total,
}: {
  title: string;
  total: number;
}) => {
  const [chartData, setChartData] = useState<IChartData[]>([]);

  useEffect(() => {
    const generateData = () => {
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
      setChartData(data);
    };
    generateData();
  }, [title, total]);
  return <BarChart series={chartData} width={1200} height={600} />;
};

export default BarChartComponent;
