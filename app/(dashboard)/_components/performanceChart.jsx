"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { LineChartIcon } from "lucide-react";

const SiteGraph = dynamic(() => import("./siteGraph"), {
  ssr: false,
});

const PerformanceChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/channel-status",{
            method: "GET"
        });
        const result = await res.json();

        setData(
          result.map((item) => ({
            date: new Date(item.date).toLocaleDateString(),
            clearTvChannels: item.clearTvChannels,
            unclearTvChannels: item.unclearTvChannels,
            clearRadioChannels: item.clearRadioChannels,
            unclearRadioChannels: item.unclearRadioChannels,
          }))
        );
      } catch (error) {
        console.error("Error fetching channel status:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="rounded-2xl p-6 shadow-sm border border-accent overflow-y-auto hidden-scrollbar">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">TV/Radio Performance</h2>
        <LineChartIcon className="w-5 h-5 text-gray-400" />
      </div>
      <SiteGraph data={data}/>
    </div>
  );
};

export default PerformanceChart;
