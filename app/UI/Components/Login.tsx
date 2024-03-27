"use client";
import React, { useEffect, useState } from "react";
import CustomInput from "../reusableComponents/CustomInput";
import CustomButton from "../reusableComponents/CustomButton";
import Image from "next/image";
import iconLogo from "../../assets/iconLogo.png";
import { useRouter } from "next/navigation";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleLogin = () => {
    setLoading(true);
    if (username === "icon" && password === "Bima123") {
      localStorage.setItem("user", "icon admin");
      router.push("/dashboard");
    } else {
      setLoading(false); // Reset loading state
    }
  };
  return (
    <div className="border h-[550px] w-1/3 flex flex-col  justify-center items-center">
      <p className="font-[600] text-[20px]">
        {"Perfomance dashboard".toUpperCase()}
      </p>
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
          className={"h-[55px] p-[8px] rounded-md border w-[450px]"}
        />

        <CustomInput
          type={showPassword ? "text" : "password"}
          name={"Password"}
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          className={"h-[55px] p-[8px] rounded-md border w-[450px]"}
        />
        <div className="flex gap-1">
          <input
            type="checkbox"
            name="check"
            onClick={() => setShowPassword((prev) => !prev)}
          />
          <label htmlFor="check">Show password</label>
        </div>
      </div>
      <div>
        <CustomButton
          name={loading ? "Logging in..." : "Login"}
          className={
            "h-[55px] w-[450px] mt-[20px] rounded-md text-white text-[16px] border bg-[#cb7529]"
          }
          onClick={handleLogin}
          disabled={loading}
        />
      </div>
    </div>
  );
};

export default Login;
