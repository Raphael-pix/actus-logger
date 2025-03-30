import React from "react";
import { BarChart3 } from "lucide-react";
import TvChart from "./tvCharts"
import RadioChart from "./radioCharts"

const ChannelCharts = () => {
  const channelClarityColors = [
    // TV clarity
    { title: "Minimal Glitches", color: "#FFD700", background:"bg-[#FFD700]" }, 
    { title: "Excessive Glitches", color: "#FF4500", background:"bg-[#FF4500]" },
    { title: "No Live View", color: "#8B0000", background:"bg-[#8B0000]" }, 
    { title: "Clear/OK", color: "#32CD32", background:"bg-[#32CD32]" },
  
    // Radio clarity
    { title: "White Noise", color: "#D3D3D3", background:"bg-[#D3D3D3]" },
    { title: "No Modulation ", color: "#808080", background:"bg-[#808080]" }, 
    { title: "Static", color: "#FB2C36",  background:"bg-[#FB2C36]" },
    { title: "Clear/Low Power", color: "#4682B4", background:"bg-[#4682B4]" }
  ];
  
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 overflow-y-auto hidden-scrollbar">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg text-neutral-black font-semibold">TV/Radio Performance</h2>
        <BarChart3 className="w-5 h-5 text-gray-400" />
      </div>
      <div className="flex flex-col gap-2 items-center justify-between mb-6 lg:flex-row">
        <TvChart/>
        <RadioChart/>
      </div>
      <div className="w-full flex flex-wrap gap-2 gap-y-4">
        {
          channelClarityColors.map((item)=>(
            <div key={item.title} className="flex gap-1 items-center">
                <div className={`w-4 h-4 ${item.background}`}/>
                <span className="text-xs text-neutral-black">{item.title}</span>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default ChannelCharts;
