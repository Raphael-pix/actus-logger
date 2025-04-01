import React from "react";
import ChannelsTable from "./_components/channelsTable";

export default function ChannelsPage({ searchParams }:{searchParams : {location?:string}}) {
  const location = searchParams?.location || "";
  return (
    <div className="p-2 space-y-6 lg:p-6">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-lg font-bold text-neutral-black lg:text-2xl">
          Channels
        </h1>
      </div>
      <ChannelsTable location={location}/>
    </div>
  );
}
