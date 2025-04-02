import React from "react";
import ChannelsTableWrapper from "./channelsTableWrapper";
import { getChannels } from "@/lib/services";
import { cookies } from "next/headers";

export default async function ChannelsTable({location}:{location:string}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;
  const channels = await getChannels(token,location);

  return (
    <div className="container mx-auto">
      <ChannelsTableWrapper data={channels} />
    </div>
  );
}
