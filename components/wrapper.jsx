"use client";

import React from "react";
import { useSidebar } from "../store/useSidebar";

const Wrapper = ({ children }) => {
  const { isSidebarOpen } = useSidebar();
  return (
    <div>
      <main
        className={`min-h-screen transition-all duration-300 ease-in-out bg-white 
        ${isSidebarOpen ? "lg:ml-[280px]" : "lg:ml-20"}`}
      >
        {children}
      </main>
    </div>
  );
};

export default Wrapper;
