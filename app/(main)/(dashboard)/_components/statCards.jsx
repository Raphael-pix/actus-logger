import React from "react";
import {
  Clock,
  Globe,
  Server,
  ServerCrash,
} from "lucide-react";
import { cookies } from "next/headers";
import { getLocationData } from "@/lib/services";
import { cn } from "@/lib/utils";

const StatCards = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("user_token")?.value;
  const siteData = await getLocationData(token);

  const quickStats = [
    {
      label: "total sites",
      value: siteData.allSitesCount,
      trend: 0,
      icon: Globe,
      bgColor: "bg-blue-50",
      textColor: "text-blue-500",
    },
    {
      label: "active sites",
      value: siteData.activeSitesCount,
      icon: Server,
      trend: 0,
      bgColor: "bg-green-50",
      textColor: "text-green-500",
    },
    {
      label: "inactive sites",
      value: siteData.inactiveSitesCount,
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
          className="rounded-2xl p-6 shadow-sm border border-accent"
        >
          <div className="flex items-center gap-4">
            <div className={`p-2 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`w-5 h-5 ${stat.textColor}`} />
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
            <p className={cn("text-2xl font-semibold", stat.label === "last updated" && "text-xl")}>
                {stat.value}
              </p>
              <h3 className="text-sm capitalize">{stat.label}</h3>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatCards;
