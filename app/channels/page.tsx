import React from "react";
import ChannelsTable from "./_components/channelsTable";

export default function DashboardPage() {
  return (
    <div className="p-2 space-y-6 lg:p-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-lg font-bold text-neutral-black lg:text-2xl">
          Reports
        </h1>
      </div>
      <ChannelsTable/>
    </div>
  );
}
