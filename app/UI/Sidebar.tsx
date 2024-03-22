"use client";
import React from "react";
import { useContextApi } from "../context/Context";

const Sidebar = () => {
  const { setComponent, component }: any = useContextApi();
  const menuItems = [
    {
      name: "Pages",
      items: [
        {
          name: "Premiums",
        },
        {
          name: "Claims",
        },
      ],
    },
  ];
  return (
    <div className="flex flex-col   h-full overflow-y-auto text-white">
      <div className="h-[300px]">user here</div>
      <div className="gap-2 flex flex-col">
        {menuItems.map((item, key) => (
          <div key={key} className="text-[20px]">
            {item.name}
            <div>
              {item.items.map((item, key) => (
                <div
                  onClick={() => setComponent(item.name)}
                  className={`h-[35px] text-[14px] ${
                    component === item.name
                      ? "bg-[#cb7529] text-white"
                      : "bg-white text-black"
                  }   cursor-pointer mt-[5px] flex items-center justify-center`}
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
