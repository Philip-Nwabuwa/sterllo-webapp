import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface DataPoint {
  day: string;
  pending: number;
  resolved: number;
}

const DisputeResolutionChart: React.FC = () => {
  // Mock data based on the chart in the image
  const data: DataPoint[] = [
    { day: "MON", pending: 10, resolved: 22 },
    { day: "TUE", pending: 1, resolved: 35 },
    { day: "WED", pending: 23, resolved: 26 },
    { day: "THU", pending: 0, resolved: 8 },
    { day: "FRI", pending: 5, resolved: 38 },
    { day: "SAT", pending: 17, resolved: 25 },
    { day: "SUN", pending: 6, resolved: 2 },
  ];

  // Custom tooltip component
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.9)",
            padding: "12px",
            border: "1px solid #444",
            borderRadius: "6px",
          }}
        >
          <p
            style={{
              color: "#fff",
              margin: "0 0 8px 0",
              fontSize: "13px",
              fontWeight: "600",
            }}
          >
            {payload[0].payload.day}
          </p>
          {payload.map((entry: any, index: number) => (
            <p
              key={index}
              style={{
                color: entry.color,
                margin: "4px 0",
                fontSize: "12px",
              }}
            >
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // Custom legend
  const CustomLegend = () => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "24px",
          marginTop: "20px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              backgroundColor: "#f59e42",
            }}
          />
          <span style={{ color: "#888", fontSize: "13px" }}>Pending</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              backgroundColor: "#2dd4bf",
            }}
          />
          <span style={{ color: "#888", fontSize: "13px" }}>Resolved</span>
        </div>
      </div>
    );
  };

  return (
    <div
      style={{
        backgroundColor: "#1a1a1a",
        padding: "10px",
        borderRadius: "12px",
        width: "100%",
        height: "250px",
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 5, right: 5, left: -30, bottom: -30 }}
          barGap={4}
        >
          <CartesianGrid
            strokeDasharray="0"
            stroke="#2a2a2a"
            vertical={true}
            horizontal={true}
          />
          <XAxis
            dataKey="day"
            stroke="#666666"
            tick={{ fill: "#666666", fontSize: 12 }}
            axisLine={{ stroke: "#333333" }}
          />
          <YAxis
            stroke="#666666"
            tick={{ fill: "#666666", fontSize: 12 }}
            axisLine={{ stroke: "#333333" }}
            domain={[0, 40]}
            ticks={[0, 10, 20, 30, 40]}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: "rgba(255, 255, 255, 0.05)" }}
          />
          <Bar
            dataKey="resolved"
            fill="#2dd4bf"
            radius={[4, 4, 0, 0]}
            maxBarSize={40}
          />
          <Bar
            dataKey="pending"
            fill="#f59e42"
            radius={[4, 4, 0, 0]}
            maxBarSize={40}
          />
        </BarChart>
      </ResponsiveContainer>
      <CustomLegend />
    </div>
  );
};

export default DisputeResolutionChart;
