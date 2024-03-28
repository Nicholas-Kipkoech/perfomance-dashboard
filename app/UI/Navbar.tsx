"use client";
import React, { useEffect, useState } from "react";
import CustomButton from "./reusableComponents/CustomButton";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

const Navbar = () => {
  const [user, setUser] = useState<any>({});
  useEffect(() => {
    const accessToken: any = localStorage.getItem("accessToken");
    const decodedToken = jwtDecode(accessToken);
    setUser(decodedToken);
  }, []);

  const router = useRouter();
  const handleLogout = () => {
    localStorage.clear();
    router.push("/");
  };
  return (
    <div className="w-full border h-[5rem] bg-[#092332] items-center justify-between p-2 flex text-white top-0 sticky">
      <span className="justify-start font-[700] text-[25px] ml-3">
        {user?.orgDesc}
      </span>
      <div className="flex items-center">
        <CustomButton
          name="Logout"
          className={
            "h-[40px] border w-[150px]   rounded-md text-white bg-[#cb7529]"
          }
          onClick={handleLogout}
        />
      </div>
    </div>
  );
};

export default Navbar;
