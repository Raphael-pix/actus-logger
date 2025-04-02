"use client";

import React from "react";
import { PieChart, Pie, Cell } from "recharts";

const COLORS = ["#FFD700", "#FF4500", "#8B0000", "#32CD32"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const TvChart = ({count}) => {
  const data = [
    { name: "Less glitches", value: count.lessGlitches },
    { name: "Excessive glitches", value: count.excessiveGlitches},
    { name: "No live view", value: count.noLiveView },
    { name: "Clear/OK", value: count.clear },
  ];
  return (
    <div className="space-y-1">
      <PieChart width={180} height={180}>
        <Pie
          data={data}
          cx={80}
          cy={80}
          labelLine={false}
          outerRadius={85}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
      <h3 className="text-center text-base text-neutral-black font-semibold font-outfit">
        TV
      </h3>
    </div>
  );
};
export default TvChart;
