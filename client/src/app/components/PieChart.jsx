"use client";

import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Completed",
    value: 40,
  },
  {
    name: "In Progress",
    value: 30,
  },
  {
    name: "Pending",
    value: 20,
  },
  {
    name: "Cancelled",
    value: 10,
  },
];

const COLORS = ["#22c55e", "#3b82f6", "#f59e0b", "#ef4444"];

export default function PieChart() {
  return (
    <div className="h-[390px] w-full rounded-2xl border border-white/10 bg-[#15183a]/90 p-6 shadow-2xl backdrop-blur-xl">

      <div>
        <h2 className="text-xl font-semibold text-white">
          Task Overview
        </h2>

        <p className="mt-1 text-sm text-slate-400">
          Current task distribution
        </p>
      </div>

      <div className="mt-2 h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsPieChart>

            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={105}
              paddingAngle={4}
              dataKey="value"
              stroke="none"
              cornerRadius={8}
            >
              {data.map((entry, index) => (
                <Cell
                  key={entry.name}
                  fill={COLORS[index]}
                  className="rounded"
                />
              ))}
            </Pie>

            <Tooltip
              contentStyle={{
                backgroundColor: "#15183a",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "12px",
                color: "#fff",
              }}
            />

            <Legend
              verticalAlign="bottom"
              height={30}
              iconType="circle"
            />

          </RechartsPieChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}