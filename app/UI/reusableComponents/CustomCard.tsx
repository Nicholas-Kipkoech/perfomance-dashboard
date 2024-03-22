"use client";
import React, { useState } from "react";

export interface IBimaData {
  name: string;
  total: number;
  year?: number;
  onClick?: () => void;
  currency?: boolean;
  totalNumber?: number;
}

const CustomCard = ({
  name,
  total,
  onClick,
  currency,
  totalNumber,
}: IBimaData) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };
  const formattedTotal = currency
    ? `KES ${total?.toLocaleString()}`
    : Number(total).toLocaleString();

  return (
    <div
      className={`h-[120px] w-[280px] border cursor-pointer bg-slate-100 rounded-md p-[20px]`}
      onClick={handleClick}
    >
      <div className="flex flex-col gap-2">
        <p className="text-[18px]">{name}</p>
        <div className="font-[700] text-slate-500 text-[14px] flex justify-between">
          {totalNumber ? <p>{totalNumber.toLocaleString()}</p> : ""}
          <p>{formattedTotal}</p>
        </div>
      </div>
    </div>
  );
};

export default CustomCard;
