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
  const formattedTotal = Number(total.toFixed(2)).toLocaleString();

  return (
    <div
      style={{ backgroundColor: color }}
      className={`h-[130px] w-[330px] border cursor-pointer  rounded-md p-[20px]`}
      onClick={handleClick}
    >
      <div className="flex flex-col gap-2" style={{ color: textColor }}>
        <p className="text-[20px] font-bold flex justify-start items-start">
          {formattedTotal}
        </p>
        <p className="text-[16px] flex justify-center ">{name.toUpperCase()}</p>
      </div>
    </div>
  );
};

export default CustomCard;
