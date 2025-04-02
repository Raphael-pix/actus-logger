"use client";

import React from "react";
import { PieChart, Pie, Cell } from "recharts";

const COLORS = ["#D3D3D3", "#808080", "#FB2C36", "#32CD32", "#4682B4"];

const RadioChart = ({count}) => {
  const data = [
    { name: "White noise", value: count.whiteNoise },
    { name: "No modulation", value: count.noModulation },
    { name: "Static", value: count.static },
    { name: "Clear/OK", value: count.clear },
    {name:"Clear/Low power", value:count.lowPower}
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
      <h3 className="text-center text-base font-semibold font-outfit">Radio</h3>
    </div>
  );
};
export default RadioChart;
