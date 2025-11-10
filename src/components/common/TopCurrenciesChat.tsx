import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface CurrencyData {
  name: string;
  value: number;
  percentage: number;
  color: string;
  [key: string]: string | number;
}

const TopCurrenciesChart: React.FC = () => {
  // Mock data based on the chart in the image
  const data: CurrencyData[] = [
    { name: "EUR", value: 10, percentage: 10, color: "#ef4444" },
    { name: "GBP", value: 15, percentage: 15, color: "#3b82f6" },
    { name: "USD", value: 30, percentage: 30, color: "#10b981" },
    { name: "NGN", value: 45, percentage: 45, color: "#bef264" },
  ];

  // Custom legend component
  const CustomLegend = () => {
    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "12px",
          marginTop: "12px",
          maxWidth: "100%",
          margin: "12px auto 0",
        }}
      >
        {data.map((entry, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <div
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                backgroundColor: entry.color,
                flexShrink: 0,
              }}
            />
            <span
              style={{
                color: entry.color,
                fontSize: "14px",
                fontWeight: "500",
                fontFamily: "system-ui, -apple-system, sans-serif",
              }}
            >
              {entry.name} ({entry.percentage}%)
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div
      style={{
        backgroundColor: "#181818",
        padding: "10px 8px",
        borderRadius: "12px",
        width: "100%",
        maxWidth: "400px",
        margin: "0 auto",
      }}
    >
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            startAngle={90}
            endAngle={450}
            dataKey="value"
            stroke="none"
            paddingAngle={2}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      <CustomLegend />
    </div>
  );
};

export default TopCurrenciesChart;
