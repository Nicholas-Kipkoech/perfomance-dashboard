"use client";
import React from "react";
import { useContextApi } from "../context/Context";
import Image from "next/image";
import iconLogo from "../assets/iconLogo.png";

const Sidebar = () => {
  const { setComponent, component }: any = useContextApi();
  const menuItems = [
    {
      name: "Modules",
      items: [
        {
          name: "Underwriting",
        },
        {
          name: "Claims",
        },
      ],
    },
  ];
  return (
    <div className="flex flex-col   h-full overflow-y-auto text-white">
      <Image
        src={iconLogo}
        alt="logo"
        className={"h-[80px] object-contain "}
        style={{ background: "white" }}
      />
      <div className="gap-2 flex flex-col">
        {menuItems.map((item, key) => (
          <div key={key} className="text-[16px]">
            {item.name}
            <div>
              {item.items.map((item, key) => (
                <div
                  onClick={() => setComponent(item.name)}
                  className={`h-[30px] text-[12px] ${
                    component === item.name
                      ? "bg-white text-black"
                      : "text-white"
                  }   cursor-pointer mt-[2px] flex items-center justify-center`}
                  key={key}
                >
                  {item.name}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
