import React from "react";
import Sidebar from "../UI/Sidebar";

interface Data {
  user: string;
  age: number;
}

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-[auto] flex justify-center">
      <div className="w-5/6">{children}</div>
    </div>
  );
};

export default Layout;
