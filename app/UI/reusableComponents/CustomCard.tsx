"use client";
import React from "react";

export interface IBimaData {
  name: string;
  total: number;
  year?: number;
  onClick?: () => void;
  currency?: boolean;
  totalNumber?: number;
  title1?: string;
  title2?: string;
  total2?: number;
  color?: string;
  textColor?: string;
}

const CustomCard = ({
  name,
  total,
  total2,
  onClick,
  currency,
  totalNumber,
  title1,
  title2,
  textColor,
  color,
}: IBimaData) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };
  const formattedTotal = currency
    ? `KES ${total?.toLocaleString()}`
    : Number(total).toLocaleString();
  const formattedTotal2 = currency
    ? `KES ${total2?.toLocaleString()}`
    : Number(total2).toLocaleString();
  return (
    <div
      style={{ backgroundColor: color }}
      className={`h-[120px] w-[300px] border cursor-pointer  rounded-md p-[20px]`}
      onClick={handleClick}
    >
      <div className="flex flex-col gap-2" style={{ color: textColor }}>
        <p className="text-[18px] flex justify-center font-bold">{name}</p>
        <div className="flex justify-between">
          <p>{title1}</p>
          <p>{title2}</p>
        </div>
        <div
          style={{ color: textColor }}
          className={`font-[700]  text-[14px] ${
            totalNumber ? "justify-between" : ""
          } flex ${total2 ? "justify-between" : "justify-center"}`}
        >
          {totalNumber ? <p>{totalNumber.toLocaleString()}</p> : ""}
          <p>{formattedTotal}</p>
          <p>{total2 && formattedTotal2}</p>
        </div>
      </div>
    </div>
  );
};

export default CustomCard;
