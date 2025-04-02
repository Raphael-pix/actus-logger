"use client";

import React, { useState } from "react";
import ProfileTab from "./profile";
import ChannelsTab from "./channels";
import ReportsTab from "./reports";

const ProfileWrapper = ({profile}) => {
  const [activeTab, setActiveTab] = useState("profile");
  return (
    <div>
      <div className="border-b border-input mb-6">
        <nav className="flex -mb-px">
          {["profile", "channels", "reports"].map((item) => (
            <button
              key={item}
              onClick={() => setActiveTab(item)}
              className={`mr-8 py-4 px-1 font-medium text-sm capitalize cursor-pointer ${
                activeTab === item
                  ? "border-b-2 border-primary-purple-dark text-primary-purple"
                  : "border-b-2 border-transparent text-muted-foreground hover:text-secondary-foreground hover:border-muted-foreground"
              }`}
            >
              {item}
            </button>
          ))}
        </nav>
      </div>

      {activeTab === "profile" && <ProfileTab profile={profile}/>}

      {activeTab === "channels" && <ChannelsTab />}

      {activeTab === "reports" && <ReportsTab />}
    </div>
  );
};

export default ProfileWrapper;
