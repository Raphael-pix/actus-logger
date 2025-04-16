"use client";

import React, { useState } from "react";
import ProfileTab from "./profile";
import ChannelsTab from "./channels";
import ReportsTab from "./reports";
import AdminTab from "./admin";
import clsx from "clsx";
import { useRouter, useSearchParams } from "next/navigation";

const ProfileWrapper = ({ profile }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const tab = searchParams.get("tab") || "profile";

  const handleTabChange = (newTab) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.set("tab", newTab);
    router.replace(`?${current.toString()}`);
  };

  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div>
      <div className="border-b border-input mb-6">
        <nav className="flex -mb-px">
          {["profile", "channels", "reports", "controls"].map((item) => (
            <button
              key={item}
              onClick={() => handleTabChange(item)}
              className={clsx(
                "mr-8 py-4 px-1 font-medium text-sm capitalize cursor-pointer",
                profile.role !== "Admin" && item === "controls"
                  ? "hidden"
                  : "block",
                tab === item
                  ? "border-b-2 border-primary-purple-dark text-primary-purple"
                  : "border-b-2 border-transparent text-muted-foreground hover:text-secondary-foreground hover:border-muted-foreground"
              )}
            >
              {item}
            </button>
          ))}
        </nav>
      </div>

      {tab === "profile" && <ProfileTab profile={profile} />}

      {tab === "channels" && <ChannelsTab />}

      {tab === "reports" && <ReportsTab />}

      {tab === "controls" && <AdminTab />}
    </div>
  );
};

export default ProfileWrapper;
