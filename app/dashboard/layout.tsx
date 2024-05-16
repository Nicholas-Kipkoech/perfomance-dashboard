import React from "react";
import Sidebar from "../UI/Sidebar";
import Navbar from "../UI/Navbar";
import ContextProvider from "../context/Context";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ContextProvider>
      <div className="h-screen flex">
        <div className="w-[250px] h-full bg-[#092332] sm:hidden md:block">
          <Sidebar />
        </div>
        <div className="w-full h-full overflow-y-auto">
          <Navbar />
          {children}
        </div>
      </div>
    </ContextProvider>
  );
};

export default Layout;
