"use client";

import { useSearchParams } from "next/navigation";
import { ChannelsDataTable } from "@/components/ui/channels-table";
import { Channel, getChannelsColumns } from "@/components/ui/columns";
import { useEffect, useState } from "react";

export default function ChannelsTableWrapper({ channels }: { channels: Channel[] }) {
  const searchParams = useSearchParams();
  const editMode = searchParams.get("editMode") === "true";
  const [data,setData] = useState(channels);
  useEffect(() => {
    setData(channels);
  }, [channels]);


  const updateComment = (id: string, value: string) => {
    setData((prevData) =>
      prevData.map((row) =>
        row.id === id ? { ...row, comment: value } : row
      )
    );
  };
  

  return <ChannelsDataTable columns={getChannelsColumns(editMode,updateComment)} data={data} />;
}
