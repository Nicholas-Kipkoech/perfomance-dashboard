'use client'
import Link from 'next/link'
import React from 'react'

export interface IBimaData {
  name: string
  total: number
  year?: number
  onClick?: () => void
  currency?: boolean
  totalNumber?: number
  title1?: string
  title2?: string
  total2?: number
  color?: string
  textColor?: string
  link?: string
}

const CustomCard = ({
  name,
  total,
  onClick,
  textColor,
  color,
  link,
}: IBimaData) => {
  const handleClick = () => {
    if (onClick) {
      onClick()
    }
  }
  const formattedTotal = Number(total.toFixed(2)).toLocaleString()

  return (
    <Link
      href={`${link}`}
      className={`md:h-[130px]  sm:h-[130px] w-[330px] border cursor-pointer  rounded-md p-[20px]`}
      onClick={handleClick}
    >
      <div className="flex flex-col gap-2" style={{ color: textColor }}>
        <p className="text-[20px] font-bold flex justify-start items-start">
          {formattedTotal}
        </p>
        <p className="text-[16px] flex justify-center ">{name.toUpperCase()}</p>
      </div>
    </Link>
  )
}

export default CustomCard
