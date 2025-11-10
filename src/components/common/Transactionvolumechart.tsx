import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Line,
} from "recharts";

const Transactionvolumechart: React.FC = () => {
  interface DataPoint {
    month: string;
    volume: number;
  }

  const data: DataPoint[] = [
    { month: "Jan", volume: 150000 },
    { month: "Feb", volume: 165000 },
    { month: "Mar", volume: 180000 },
    { month: "Apr", volume: 210000 },
    { month: "May", volume: 245000 },
    { month: "Jun", volume: 295000 },
    { month: "Jul", volume: 335000 },
    { month: "Aug", volume: 385000 },
    { month: "Sep", volume: 425000 },
    { month: "Oct", volume: 0 },
    { month: "Nov", volume: 0 },
    { month: "Dec", volume: 0 },
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            padding: "10px",
            border: "1px solid #a8b92d",
            borderRadius: "4px",
          }}
        >
          <p style={{ color: "#fff", margin: 0, fontSize: "14px" }}>
            {payload[0].payload.month}: {payload[0].value.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };
  return (
    <ResponsiveContainer width="100%" height="100%" className="!h-[300px] pt-4">
      <LineChart
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="0" stroke="#333333" vertical={false} />
        <XAxis
          dataKey="month"
          stroke="#666666"
          tick={{ fill: "#888888", fontSize: 12 }}
          axisLine={{ stroke: "#333333" }}
        />
        <YAxis
          stroke="#666666"
          tick={{ fill: "#888888", fontSize: 12 }}
          axisLine={{ stroke: "#333333" }}
          tickFormatter={(value) => value.toLocaleString()}
        />
        <Tooltip content={<CustomTooltip />} />
        <Line
          type="monotone"
          dataKey="volume"
          stroke="#a8b92d"
          strokeWidth={2.5}
          dot={{
            fill: "#a8b92d",
            strokeWidth: 2,
            r: 5,
            stroke: "#a8b92d",
          }}
          activeDot={{
            r: 7,
            fill: "#a8b92d",
            stroke: "#1a1a1a",
            strokeWidth: 2,
          }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Transactionvolumechart;
