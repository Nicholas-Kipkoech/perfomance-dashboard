"use client";
import React from "react";
import CustomButton from "../UI/reusableComponents/CustomButton";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const handleLogout = () => {
    router.push("/");
  };
  return (
    <div className="w-full border h-[5rem] bg-[#092332] text-white">
      <div className="flex justify-end mt-2">
        <CustomButton
          name="Logout"
          className={
            "h-[50px] border w-[200px] rounded-md text-white bg-[#cb7529]"
          }
          onClick={handleLogout}
        />
      </div>
    </div>
  );
};

export default Navbar;
