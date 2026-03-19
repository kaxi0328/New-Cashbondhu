import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface GaugeChartProps {
  spent: number;
  limit: number;
}

const GaugeChart = ({ spent, limit }: GaugeChartProps) => {
  const pct = Math.min((spent / limit) * 100, 100);
  const data = [
    { value: pct },
    { value: 100 - pct },
  ];

  return (
    <div className="flex flex-col items-center">
      <div className="w-48 h-28 overflow-hidden">
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="100%"
              startAngle={180}
              endAngle={0}
              innerRadius={60}
              outerRadius={85}
              dataKey="value"
              stroke="none"
              animationBegin={200}
              animationDuration={800}
            >
              <Cell fill="hsl(262, 60%, 42%)" />
              <Cell fill="hsl(270, 20%, 90%)" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="text-center -mt-2">
        <p className="text-2xl font-bold text-foreground">৳{spent.toLocaleString("bn-BD")}</p>
        <p className="text-xs text-muted-foreground">৳{limit.toLocaleString("bn-BD")} সীমার মধ্যে</p>
      </div>
    </div>
  );
};

export default GaugeChart;
