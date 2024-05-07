import React from "react";
import Sidebar from "../UI/Sidebar";
import Navbar from "../UI/Navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen flex">
      <div className="w-[250px] h-full bg-[#092332] sm:hidden md:block">
        <Sidebar />
      </div>
      <div className="w-full h-full overflow-y-auto bg-white">
        <Navbar />
        {children}
      </div>
    </div>
  );
};

export default Layout;
