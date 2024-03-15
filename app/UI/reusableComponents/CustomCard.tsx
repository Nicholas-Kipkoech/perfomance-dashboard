"use client";
import React, { useState } from "react";

export interface IBimaData {
  name: string;
  total: number;
  year?: number;
  onClick?: () => void;
  active?: boolean;
}

const CustomCard = ({ name, total, onClick, active }: IBimaData) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <div
      className={`h-[120px] w-[280px] cursor-pointer rounded-[14px] p-[20px] ${
        active ? "bg-[#cb7529] text-white" : "bg-white"
      } `}
      onClick={handleClick}
    >
      <div className="flex flex-col gap-2">
        <p className="text-[18px]">{name}</p>
        <p className="font-[700] text-slate-500 text-[16px]">
          KES {total.toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default CustomCard;
