"use client";

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


export function SiteGraph({ data }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 20 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" padding={{ left: 30, right: 30 }} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="clearTvChannels" stroke="#82ca9d" name="Clear TV Channels" />
        <Line type="monotone" dataKey="clearRadioChannels" stroke="#ff7300" name="Clear Radio Channels" />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default SiteGraph;
