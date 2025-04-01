"use client";

import React from "react";
import { PieChart, Pie, Cell } from "recharts";

const COLORS = ["#D3D3D3", "#808080", "#FB2C36", "#32CD32", "#4682B4"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
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

const RadioChart = ({count}) => {
  const data = [
    { name: "White noise", value: count.whiteNoiseCount },
    { name: "No modulation", value: count.noModulationCount },
    { name: "Static", value: count.staticCount },
    { name: "Clear/OK", value: count.okCount },
    {name:"Clear/Low power", value:count.lowPowerCount}
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
      <h3 className="text-center text-base text-neutral-black font-semibold font-outfit">Radio</h3>
    </div>
  );
};
export default RadioChart;
