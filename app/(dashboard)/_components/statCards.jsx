import React from "react";
import { stringToColor } from "@/lib/utils";
import {
  ArrowDownRight,
  ArrowUpRight,
  Clock,
  Globe,
  Server,
  ServerCrash,
} from "lucide-react";

const StatCards = () => {
  const quickStats = [
    {
      label: "total sites",
      value: 74,
      trend: 0,
      icon: Globe,
      bgColor: "bg-blue-50",
      textColor: "text-blue-500",
    },
    {
      label: "active sites",
      value: 42,
      icon: Server,
      trend: 0,
      bgColor: "bg-green-50",
      textColor: "text-green-500",
    },
    {
      label: "inactive sites",
      value: 32,
      icon: ServerCrash,
      trend: 0,
      bgColor: "bg-red-50",
      textColor: "text-red-500",
    },
    {
      label: "last updated",
      value: new Date().toLocaleTimeString(),
      icon: Clock,
      trend: 0,
      bgColor: "bg-yellow-50",
      textColor: "text-yellow-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {quickStats.map((stat, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        >
          <div className="flex items-center gap-4">
            <div className={`p-2 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`w-6 h-6 ${stat.textColor}`} />
            </div>
            {/*  
            <div
              className={`flex items-center gap-1 text-sm ${
                stat.trend > 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {stat.trend > 0 ? (
                <ArrowUpRight className="w-4 h-4" />
              ) : stat.trend > 0 ? (
                <ArrowDownRight className="w-4 h-4" />
              ) : null
              }
              {
              stat.trend !== 0  &&  <span>{Math.abs(stat.trend).toFixed(1)}%</span>
              }
            </div>
            */}
            <div className="space-y-1">
            <p className="text-2xl text-neutral-black font-semibold">
                {stat.value}
              </p>
              <h3 className="text-neutral-grey text-sm">{stat.label}</h3>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatCards;
