"use client";
import React from "react";
import CustomButton from "../UI/reusableComponents/CustomButton";
import { useRouter } from "next/navigation";
import { useContextApi } from "../context/Context";

const Navbar = () => {
  const { company, year } = useContextApi();
  const router = useRouter();
  const handleLogout = () => {
    router.push("/");
  };
  return (
    <div className="w-full border h-[5rem] bg-[#092332] items-center justify-between p-2 flex text-white top-0 sticky">
      <span className="justify-start font-[700] text-[25px] ml-3">
        {company}
      </span>
      <span className="justify-start font-[700] text-[25px]">Year {year}</span>

      <div className="flex items-center">
        <CustomButton
          name="Logout"
          className={
            "h-[40px] border w-[200px]   rounded-md text-white bg-[#cb7529]"
          }
          onClick={handleLogout}
        />
      </div>
    </div>
  );
};

export default Navbar;
