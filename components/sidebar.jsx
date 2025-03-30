"use client";

import React from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  LogOut,
  ChevronRight,
  X,
  Monitor,
  FileCheck2,
  Settings,
} from "lucide-react";
import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useSidebar } from "@/store/useSidebar";
import { useToggleMenu } from "@/store/useToggleMenu";

const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/" },
  { name: "Channels", icon: Monitor, path: "/channels" },
  { name: "Reports", icon: FileCheck2, path: "/reports" },
];

const MenuLink = ({ item, isActive, isSidebarOpen }) => {
  return (
    <Link
      key={item.path}
      href={item.path}
      className={clsx(
        "flex items-center gap-3 p-3 rounded-lg mb-1 transition-all",
        isActive
          ? "bg-neutral-black text-neutral-white"
          : "text-neutral-grey hover:text-neutral-black"
      )}
    >
      <item.icon size={18} className={`${!isSidebarOpen && "w-full"}`} />
      <motion.span
        animate={{
          opacity: isSidebarOpen ? 1 : 0,
          width: isSidebarOpen ? "auto" : 0,
        }}
        className={clsx(
          "font-normal font-sm overflow-hidden whitespace-nowrap",
          isSidebarOpen ? "block" : "hidden"
        )}
      >
        {item.name}
      </motion.span>
      {isActive && isSidebarOpen && (
        <motion.div
          layoutId="activeTab"
          className="absolute left-0 w-1 h-8 bg-neutral-black rounded-r-full"
        />
      )}
    </Link>
  );
};

const Sidebar = ({}) => {
  const pathname = usePathname();
  const { isSidebarOpen, openSidebar, closeSidebar } = useSidebar();
  const { isMenuOpen, closeMenu } = useToggleMenu();
  const router = useRouter();

  const handleToggleSidebar = () => {
    if (isSidebarOpen) {
      closeSidebar();
    } else {
      openSidebar();
    }
  };
  const handleLogout = async () => {
    try {
      const response = await fetch("/api/admin/logout", {
        method: "POST",
      });
      if (response.ok) {
        router.push("/admin/login");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  // If we're on the login page, return just the children without the admin layout
  if (pathname === "/admin/login") {
    return children;
  }
  return (
    <>
      <motion.aside
        initial={false}
        animate={{ width: isSidebarOpen ? "250px" : "80px" }}
        className={clsx(
          "fixed top-0 left-0 h-full bg-neutral-white text-neutral-black border-r border-neutral-light-grey shadow-sm shadow-neutral-light-grey z-30 transition-all duration-300 ease-in-out",
          isSidebarOpen ? "w-[250px]" : "w-20",
          "overflow-y-scroll hidden-scrollbar hidden lg:flex lg:flex-col"
        )}
      >
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <motion.h1
              animate={{
                opacity: isSidebarOpen ? 1 : 0,
                width: isSidebarOpen ? "auto" : 0,
              }}
              className="text-xl uppercase font-bold text-neutral-black overflow-hidden whitespace-nowrap"
            >
              Actus Logger
            </motion.h1>
          </div>
          <button
            onClick={handleToggleSidebar}
            className="p-2 rounded-lg transition-colors text-neutral-black/80 hover:text-neutral-black bg-transparent cursor-pointer"
          >
            <ChevronRight
              className={clsx(
                "transform transition-transform",
                isSidebarOpen ? "rotate-180" : ""
              )}
              size={18}
            />
          </button>
        </div>
        <nav className="mt-4 px-2">
          {menuItems.map((item, index) => {
            if (item.children) {
              return (
                <div key={index} className="mb-4">
                  <div
                    className={clsx(
                      "flex items-center gap-3 p-3 text-neutral-black",
                      isSidebarOpen ? "block" : "hidden"
                    )}
                  >
                    {/* <item.icon size={16} className="min-w-[20px]" /> */}
                    <motion.span
                      animate={{
                        opacity: isSidebarOpen ? 1 : 0,
                        width: isSidebarOpen ? "auto" : 0,
                      }}
                      className="font-semibold text-sm uppercase overflow-hidden whitespace-nowrap"
                    >
                      {item.name}
                    </motion.span>
                  </div>
                  <div className="ml-3">
                    {item.children.map((child) => {
                      const isActive = pathname === child.path;
                      return (
                        <div key={child.name}>
                          <MenuLink
                            item={child}
                            isActive={isActive}
                            isSidebarOpen={isSidebarOpen}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            }
            const isActive = pathname === item.path;
            return (
              <div key={item.name}>
                <MenuLink
                  item={item}
                  isActive={isActive}
                  isSidebarOpen={isSidebarOpen}
                />
              </div>
            );
          })}
        </nav>
        <div className="justify-end px-2 mt-auto">
          <Link
            href="/settings"
            className="flex items-center gap-3 px-3 py-2 text-primary-grey rounded-lg mt-2 hover:text-primary-black hover:font-medium"
          >
            <Settings size={20} />
            <motion.span
              animate={{
                opacity: isSidebarOpen ? 1 : 0,
                width: isSidebarOpen ? "auto" : 0,
              }}
              className="font-sm overflow-hidden whitespace-nowrap"
            >
              Settings
            </motion.span>
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2 text-red-600 rounded-lg mt-2 bg-transparent cursor-pointer"
          >
            <LogOut size={20} />
            <motion.span
              animate={{
                opacity: isSidebarOpen ? 1 : 0,
                width: isSidebarOpen ? "auto" : 0,
              }}
              className="font-semibold font-sm overflow-hidden whitespace-nowrap"
            >
              Logout
            </motion.span>
          </button>
        </div>
      </motion.aside>
      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => closeMenu()}
              className="fixed inset-0 bg-neutral-black/50 z-40 lg:hidden"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              className="fixed top-0 left-0 h-full w-[280px] bg-neutral-white text-neutral-black z-50 lg:hidden overflow-y-scroll hidden-scrollbar"
            >
              <div className="p-4 flex items-center justify-between">
                <h1 className="text-xl font-bold text-neutral-black">
                  GRAPHIQ.ART
                </h1>
                <button
                  onClick={() => closeMenu()}
                  className="p-2 rounded-lg text-neutral-black/80 hover:text-neutral-black bg-transparent"
                >
                  <X size={20} />
                </button>
              </div>
              <nav className="mt-4 px-2">
                {menuItems.map((item, index) => {
                  if (item.children) {
                    return (
                      <div key={index} className="mb-4">
                        <div className="flex items-center gap-3 p-3 text-neutral-black">
                          {/* <item.icon size={18} /> */}
                          <span className="font-semibold text-sm uppercase overflow-hidden whitespace-nowrap">
                            {item.name}
                          </span>
                        </div>
                        <div className="ml-3">
                          {item.children.map((child) => {
                            const isActive = pathname === child.path;
                            return (
                              <div key={child.name}>
                                <MenuLink
                                  item={child}
                                  isActive={isActive}
                                  isSidebarOpen={isSidebarOpen}
                                />
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  }
                  const isActive = pathname === item.path;
                  return (
                    <div key={item.name}>
                      <MenuLink
                        item={item}
                        isActive={isActive}
                        isSidebarOpen={isSidebarOpen}
                      />
                    </div>
                  );
                })}
              </nav>
              <Link
                href="/settings"
                className="flex items-center gap-3 px-3 py-2 text-primary-grey rounded-lg mt-2 hover:text-primary-black"
              >
                <Settings size={20} />
                <motion.span
                  animate={{
                    opacity: isSidebarOpen ? 1 : 0,
                    width: isSidebarOpen ? "auto" : 0,
                  }}
                  className="font-semibold font-sm overflow-hidden whitespace-nowrap"
                >
                  Settings
                </motion.span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-3 py-2 text-red-600 rounded-lg mt-2 bg-transparent"
              >
                <LogOut size={20} />
                <motion.span
                  animate={{
                    opacity: isSidebarOpen ? 1 : 0,
                    width: isSidebarOpen ? "auto" : 0,
                  }}
                  className="font-semibold font-sm overflow-hidden whitespace-nowrap"
                >
                  Logout
                </motion.span>
              </button>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
