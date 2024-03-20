"use client";
import React, { useState } from "react";

export interface IBimaData {
  name: string;
  total: number | string;
  year?: number;
  onClick?: () => void;
  active?: boolean;
  currency?: boolean;
}

const CustomCard = ({ name, total, onClick, active, currency }: IBimaData) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };
  const displayTotal = currency
    ? `KES ${total.toLocaleString()}`
    : total.toLocaleString();

  return (
    <div
      className={`h-[120px] w-[280px] border cursor-pointer rounded-md p-[20px] ${
        active ? "bg-[#cb7529] text-white" : "bg-white"
      } `}
      onClick={handleClick}
    >
      <div className="flex flex-col gap-2">
        <p className="text-[18px]">{name}</p>
        <p className="font-[700] text-slate-500 text-[16px]">{displayTotal}</p>
      </div>
    </div>
  );
};

export default CustomCard;
