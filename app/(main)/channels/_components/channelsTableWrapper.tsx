"use client";

import { useSearchParams } from "next/navigation";
import { ChannelsDataTable } from "@/components/ui/channels-table";
import { Channel, getChannelsColumns } from "@/components/ui/columns";

export default function ChannelsTableWrapper({ data }: { data: Channel[] }) {
  const searchParams = useSearchParams();
  const editMode = searchParams.get("editMode") === "true";
  const location = searchParams.get("location");
  console.log(location);

  return <ChannelsDataTable columns={getChannelsColumns(editMode)} data={data} />;
}
