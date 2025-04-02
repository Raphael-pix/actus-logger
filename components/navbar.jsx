"use client";

import React, { useState } from "react";
import { Menu, Moon, Search, Sun } from "lucide-react";
import Notifications from "./notifications";
import { useToggleMenu } from "@/store/useToggleMenu";
import AdminProfile from "./adminProfile";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const { openMenu } = useToggleMenu();

  function toggleTheme() {
    setDarkMode((prev) => !prev);
    document.documentElement.classList.toggle('dark');
  }
  
  return (
    <div className="relative">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-light-grey"
              size={20}
            />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-neutral-light-grey placeholder-neutral-light-grey focus:outline-none focus:ring-2 focus:ring-neutral-grey focus:border-transparent"
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Notifications />
          <button
          onClick={toggleTheme}
          className="p-2 rounded-lg transition-colors relative cursor-pointer"
          >
            {!darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <div className="max-lg:hidden">
            <AdminProfile size="sm" />
          </div>
          <button
            onClick={() => openMenu()}
            className="p-2 rounded-lg transition-colors relative bg-transparent cursor-pointer lg:hidden"
          >
            <Menu size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
