"use client";
import React, { useState } from "react";
import CustomInput from "../reusableComponents/CustomInput";
import CustomButton from "../reusableComponents/CustomButton";
import Image from "next/image";
import iconLogo from "../../assets/iconLogo.png";
import { useRouter } from "next/navigation";
import { useContextApi } from "@/app/context/Context";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const { login }: any = useContextApi();

  const handleLogin = async () => {
    setLoading(true);
    const success = await login(username, password);
    if (!success) {
      setError("Invalid username or password");
      setLoading(false);
    } else {
      router.push("/dashboard");
      setLoading(false);
    }
  };
  return (
    <div className="border h-[500px] w-1/3 flex flex-col  justify-center items-center">
      <p className="font-[600] text-[20px]">
        {"Perfomance dashboard".toUpperCase()}
      </p>
      <div className=" flex flex-col gap-[10px] ">
        <div className="flex justify-center">
          <Image src={iconLogo} alt="" className={"h-[150px] w-[160px]"} />
        </div>

        <CustomInput
          name={"Username"}
          type={"text"}
          disabled={loading}
          placeholder="Enter username"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          className={"h-[45px] p-[8px] rounded-md border w-[400px]"}
        />
        <CustomInput
          type={showPassword ? "text" : "password"}
          name={"Password"}
          disabled={loading}
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          className={"h-[45px] p-[8px] rounded-md border w-[400px]"}
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
            "h-[45px] w-[400px] mt-[10px] rounded-md text-white text-[16px] border bg-[#cb7529]"
          }
          onClick={handleLogin}
          disabled={loading}
        />
      </div>
    </div>
  );
};

export default Login;
