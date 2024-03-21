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
    <div className="w-full border h-[5rem] bg-[#092332] text-white">
      <div className="flex justify-between items-center m-2">
        <span className="justify-start font-[700] text-[25px]">{company}</span>
        <span className="justify-start font-[700] text-[25px]">
          Year {year}
        </span>
        <div className="flex items-center ">
          <CustomButton
            name="Logout"
            className={
              "h-[40px] border w-[200px]   rounded-md text-white bg-[#cb7529]"
            }
            onClick={handleLogout}
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
