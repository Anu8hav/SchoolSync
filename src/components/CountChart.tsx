"use client";

import Image from "next/image";
import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
  PolarAngleAxis,
} from "recharts";

const data = [
  {
    name: "Boys",
    count: 55, // percentage
    fill: "#C3EBFA", // pastel blue
  },
  {
    name: "Girls",
    count: 45, // percentage
    fill: "#FAE27C", // pastel yellow
  },
];

const CountChart = () => {
  return (
    <div className="bg-white rounded-xl w-full min-h-[350px] p-4 shadow-sm flex flex-col justify-between">
      {/* TITLE */}
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-lg font-semibold text-gray-700">Students</h1>
        <Image src="/moreDark.png" alt="options" width={20} height={20} />
      </div>

      {/* CHART */}
      <div className="relative w-full h-[250px] flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="60%"
            outerRadius="100%"
            barSize={25}
            data={data}
            startAngle={90}
            endAngle={-270} // makes it a full circle
          >
            <PolarAngleAxis
              type="number"
              domain={[0, 100]}
              angleAxisId={0}
              tick={false}
            />
            <RadialBar background dataKey="count" cornerRadius={10} />
          </RadialBarChart>
        </ResponsiveContainer>

        {/* Center Icon */}
        <Image
          src="/maleFemale.png"
          alt="gender ratio"
          width={50}
          height={50}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      </div>

      {/* BOTTOM LEGEND */}
      <div className="flex justify-center gap-16 mt-3">
        <div className="flex flex-col items-center gap-1">
          <div className="w-5 h-5 bg-[#C3EBFA] rounded-full" />
          <h1 className="font-bold text-gray-800">1,234</h1>
          <h2 className="text-xs text-gray-400">Boys (55%)</h2>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="w-5 h-5 bg-[#FAE27C] rounded-full" />
          <h1 className="font-bold text-gray-800">1,234</h1>
          <h2 className="text-xs text-gray-400">Girls (45%)</h2>
        </div>
      </div>
    </div>
  );
};

export default CountChart;
