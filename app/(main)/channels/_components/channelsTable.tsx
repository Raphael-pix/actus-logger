import React from "react";
import ChannelsTableWrapper from "./channelsTableWrapper";
import { getChannels } from "@/lib/services";
import { cookies } from "next/headers";

export default async function ChannelsTable({location}:{location:string}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("user_token")?.value;
  const channels = await getChannels(token,location);

  return (
    <div className="container mx-auto">
      <ChannelsTableWrapper channels={channels} />
    </div>
  );
}
