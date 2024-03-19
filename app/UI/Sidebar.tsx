"use client";
import React, { useState } from "react";
import { FaAngleDown, FaAngleRight } from "react-icons/fa6";

const MenuItems = [
  {
    title: "Company Branches",
    icon: "",
    items: [
      { name: "All", org_code: "" },
      { name: "Center Point Branch", org_code: "02" },
      { name: "Eldoret Branch", org_code: "03" },
      { name: "Kisumu  Branch", org_code: "04" },
      { name: "Mombasa  Branch", org_code: "05" },
      { name: "Town Office  Branch", org_code: "06" },
      { name: "Nakuru  Branch", org_code: "07" },
      { name: "Meru  Branch", org_code: "08" },
      { name: "Kitui  Branch", org_code: "01" },
      { name: "Nanyuki  Branch", org_code: "10" },
      { name: "Reinsurance  Branch", org_code: "RI" },
    ],
  },
];

const Sidebar = () => {
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const [menuOpened, setMenuOpened] = useState(false);
  const [active, setActive] = useState(null);

  const handleSubMenuClick = (index: any) => {
    setOpenSubMenu(openSubMenu === index ? null : index);
    setMenuOpened((prevstate) => !prevstate);
  };

  const handleOpenMenu = (index: any) => {
    setActive(index);
  };

  return (
    <div className="flex flex-col   h-full overflow-y-auto text-white">
      <div className="h-[250px]">User here</div>
      <div>
        {MenuItems.map((menu, index) => (
          <div key={index}>
            <div
              onClick={() => handleSubMenuClick(index)}
              className="cursor-pointer flex items-center gap-2"
            >
              {menu.title}{" "}
              {menuOpened ? (
                <FaAngleDown size={20} />
              ) : (
                <FaAngleRight size={20} />
              )}
            </div>
            {openSubMenu === index && (
              <div className="flex flex-col gap-1 w-full ">
                {menu.items.map((item, subIndex) => (
                  <div
                    key={subIndex}
                    className={`${
                      active === subIndex ? "bg-[#cb7529]" : ""
                    }  rounded-sm h-[40px] items-center pl-[20%] flex cursor-pointer`}
                    onClick={() => {
                      handleOpenMenu(subIndex);
                    }}
                  >
                    {item.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
