import React from "react";
import ChannelsTable from "./_components/channelsTable";

export default async function ChannelsPage({ searchParams }:{searchParams : Promise<{ location?: string }>}) {
  const { location } = await searchParams;
  return (
    <div className="p-2 space-y-6 lg:p-6">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-lg font-bold lg:text-2xl">
          Channels
        </h1>
      </div>
      <ChannelsTable location={location || ""}/>
    </div>
  );
}
