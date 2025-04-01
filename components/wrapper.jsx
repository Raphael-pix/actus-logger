"use client";

import React from "react";
import { useSidebar } from "../store/useSidebar";

const Wrapper = ({ children }) => {
  const { isSidebarOpen } = useSidebar();
  return (
    <div>
      <main
        className={`min-h-screen transition-all duration-300 ease-in-out bg-background text-foreground
        ${isSidebarOpen ? "lg:ml-[250px]" : "lg:ml-20"}`}
      >
        {children}
      </main>
    </div>
  );
};

export default Wrapper;
