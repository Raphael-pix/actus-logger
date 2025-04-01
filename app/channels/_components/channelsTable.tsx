import React from "react";
import ChannelsTableWrapper from "./channelsTableWrapper";
import { getChannels } from "@/lib/services";

export default async function ChannelsTable({location}:{location:string}) {
  const channels = await getChannels(location);

  return (
    <div className="container mx-auto">
      <ChannelsTableWrapper data={channels} />
    </div>
  );
}
