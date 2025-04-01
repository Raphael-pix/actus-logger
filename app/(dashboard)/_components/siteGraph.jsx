"use client";

import { LineChartIcon } from "lucide-react";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

function LineGraph() {
  return (
    <ResponsiveContainer width={"100%"} height={300}>
      <LineChart data={data} margin={{ top: 20 }} accessibilityLayer>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" padding={{ left: 30, right: 30 }} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="pv"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        ></Line>
        <Line type="monotone" dataKey="uv" stroke="#82ca9d"></Line>
      </LineChart>
    </ResponsiveContainer>
  );
}

const SiteGraph = () => {
  return (
    <div className="rounded-2xl p-6 shadow-sm border border-accent overflow-y-auto hidden-scrollbar">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">
          TV/Radio Performance
        </h2>
        <LineChartIcon className="w-5 h-5 text-gray-400" />
      </div>
      <LineGraph/>
    </div>
  );
};
export default SiteGraph;
