"use client";

import React, { useEffect, useState } from "react";
import { BarChart3 } from "lucide-react";
import dynamic from "next/dynamic";

const TvChart = dynamic(() => import("./tvCharts"), {
  ssr: false,
});
const RadioChart = dynamic(() => import("./radioCharts"), {
  ssr: false,
});

const ChannelCharts = () => {
  const [data, setData] = useState({
    tv: {
        all: 0,
        lessGlitches: 0,
        excessiveGlitches: 0,
        clear: 0,
        noLiveView: 0
    },
    radio: {
        all: 0,
        whiteNoise: 0,
        lowPower: 0,
        noModulation: 0,
        clear: 0,
        static:0
    }
});

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/channel-data");
        const result = await res.json();

        setData(result);
      } catch (error) {
        console.error("Error fetching channel status:", error);
      }
    }

    fetchData();
  }, []);

  const tvData = data.tv;
  const radioData = data.radio;

  const channelClarityColors = [
    // TV clarity
    { title: "Minimal Glitches", color: "#FFD700", background: "bg-[#FFD700]" },
    {
      title: "Excessive Glitches",
      color: "#FF4500",
      background: "bg-[#FF4500]",
    },
    { title: "No Live View", color: "#8B0000", background: "bg-[#8B0000]" },
    { title: "Clear/OK", color: "#32CD32", background: "bg-[#32CD32]" },

    // Radio clarity
    { title: "White Noise", color: "#D3D3D3", background: "bg-[#D3D3D3]" },
    { title: "No Modulation ", color: "#808080", background: "bg-[#808080]" },
    { title: "Static", color: "#FB2C36", background: "bg-[#FB2C36]" },
    { title: "Clear/Low Power", color: "#4682B4", background: "bg-[#4682B4]" },
  ];

  return (
    <div className="rounded-2xl p-6 shadow-sm border border-accent overflow-y-auto hidden-scrollbar">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">TV/Radio Performance</h2>
        <BarChart3 className="w-5 h-5 text-gray-400" />
      </div>
      <div className="flex flex-col gap-2 items-center justify-between mb-6 lg:flex-row">
        <TvChart count={tvData} />
        <RadioChart count={radioData} />
      </div>
      <div className="w-full flex flex-wrap gap-2 gap-y-4">
        {channelClarityColors.map((item) => (
          <div key={item.title} className="flex gap-1 items-center">
            <div className={`w-4 h-4 ${item.background}`} />
            <span className="text-xs">{item.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChannelCharts;
