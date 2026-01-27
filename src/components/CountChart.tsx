"use client";
import Image from "next/image";
import { RadialBarChart, RadialBar, ResponsiveContainer } from "recharts";

const CountChart = ({ boys, girls }: { boys: number; girls: number }) => {
  const data = [
    {
      name: "Total",
      count: boys + girls,
      fill: "white",
    },
    {
      name: "Girls",
      count: girls,
      fill: "#FAE27C",
    },
    {
      name: "Boys",
      count: boys,
      fill: "#C3EBFA",
    },
  ];
  return (
    <div className="relative w-full h-[260px]">
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          cx="50%"
          cy="50%"
          innerRadius="55%"
          outerRadius="90%"
          data={data}
          startAngle={90}
          endAngle={-270}
        >
          <RadialBar dataKey="count" cornerRadius={50} background />
        </RadialBarChart>
      </ResponsiveContainer>

      {/* center icon */}
      <Image
        src="/maleFemale.png"
        alt=""
        width={42}
        height={42}
        className="absolute top-1/2 left-1/2
        -translate-x-1/2 -translate-y-1/2"
      />
    </div>
  );
};

export default CountChart;
