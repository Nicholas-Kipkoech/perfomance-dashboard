"use client";
import React, { useState } from "react";
import CustomInput from "../reusableComponents/CustomInput";
import CustomButton from "../reusableComponents/CustomButton";
import Image from "next/image";
import iconLogo from "../../assets/iconLogo.png";
import { useRouter } from "next/navigation";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      router.push("/dashboard");
      setLoading(false);
    }, 2000);
  };
  return (
    <div className="border h-[550px] w-full flex flex-col justify-center items-center">
      <div className=" flex flex-col gap-[10px] ">
        <div className="flex justify-center">
          <Image src={iconLogo} alt="" className={"h-[200px] w-[200px]"} />
        </div>
        <CustomInput
          name={"Username"}
          type={"text"}
          placeholder="Enter username"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          className={"h-[50px] p-[6px] rounded-md border w-[450px]"}
        />
        <CustomInput
          type={"password"}
          name={"Password"}
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          className={"h-[50px] p-[6px] rounded-md border w-[450px]"}
        />
      </div>
      <div>
        <CustomButton
          name={loading ? "Logging in..." : "Login"}
          className={
            "h-[40px] w-[450px] mt-[20px] rounded-md text-white text-[16px] border bg-[#cb7529]"
          }
          onClick={handleLogin}
          disabled={loading}
        />
      </div>
    </div>
  );
};

export default Login;
