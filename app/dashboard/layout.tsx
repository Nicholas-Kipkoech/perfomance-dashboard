import React from "react";
import Sidebar from "../UI/Sidebar";
import Navbar from "../UI/Navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen flex">
      <div className="w-1/5 h-full bg-[#092332]">
        <Sidebar />
      </div>
      <div className="w-4/5 h-full overflow-y-auto bg-white">
        <Navbar />
        {children}
      </div>
    </div>
  );
};

export default Layout;
