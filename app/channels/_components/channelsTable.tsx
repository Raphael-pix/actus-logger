import React from "react";
import { Channel } from "@/components/ui/columns";
import ChannelsTableWrapper from "./channelsTableWrapper";

async function getData(): Promise<Channel[]> {
  // Fetch data from your API here.
  return [
    {
      id: "1",
      name: "Citizen TV",
      frequency: "530 MHz",
      type: "tv",
      comment: "clear/OK",
    },
    {
      id: "2",
      name: "KTN News",
      frequency: "490 MHz",
      type: "tv",
      comment: "less glitches",
    },
    {
      id: "3",
      name: "NTV Kenya",
      frequency: "570 MHz",
      type: "tv",
      comment: "clear/Low power",
    },
    {
      id: "4",
      name: "KBC Channel 1",
      frequency: "520 MHz",
      type: "tv",
      comment: "clear/OK",
    },
    {
      id: "5",
      name: "Inooro TV",
      frequency: "560 MHz",
      type: "tv",
      comment: "excessive glitches",
    },
    {
      id: "6",
      name: "Radio Citizen",
      frequency: "106.7 FM",
      type: "radio",
      comment: "clear/OK",
    },
    {
      id: "7",
      name: "Classic 105",
      frequency: "105.2 FM",
      type: "radio",
      comment: "clear/OK",
    },
    {
      id: "8",
      name: "Kiss 100",
      frequency: "100.3 FM",
      type: "radio",
      comment: "less glitches",
    },
    {
      id: "9",
      name: "Radio Jambo",
      frequency: "97.5 FM",
      type: "radio",
      comment: "static",
    },
    {
      id: "10",
      name: "Hope FM",
      frequency: "93.3 FM",
      type: "radio",
      comment: "clear/Low power",
    }
  ];
}
export default async function ChannelsTable() {
  const data = await getData();

  return (
    <div className="container mx-auto">
      <ChannelsTableWrapper data={data} />
    </div>
  );
}
