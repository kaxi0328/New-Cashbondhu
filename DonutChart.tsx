import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

const COLORS = ["#7c3aed", "#ec4899", "#8b5cf6", "#a78bfa", "#c4b5fd", "#f472b6", "#6366f1"];

const DonutChart = () => {
  const { data: categories = [] } = useQuery({
    queryKey: ["transactions", "categories"],
    queryFn: async () => {
      const { data } = await supabase
        .from("transactions")
        .select("category, amount")
        .eq("type", "expense");

      if (data && data.length > 0) {
        const map: Record<string, number> = {};
        data.forEach((t) => {
          map[t.category] = (map[t.category] || 0) + Math.abs(Number(t.amount));
        });
        const total = Object.values(map).reduce((a, b) => a + b, 0);
        return Object.entries(map).map(([name, val]) => ({
          name,
          value: Math.round((val / total) * 100),
        }));
      }
      return [];
    },
  });

  if (categories.length === 0) {
    return (
      <div className="bg-card rounded-2xl shadow-card p-5">
        <h3 className="text-base font-semibold text-foreground mb-4">বাজেটিং</h3>
        <p className="text-sm text-muted-foreground text-center py-4">খরচ যোগ করলে এখানে চার্ট দেখা যাবে।</p>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-2xl shadow-card p-5">
      <h3 className="text-base font-semibold text-foreground mb-4">বাজেটিং</h3>
      <div className="flex items-center gap-4">
        <div className="w-32 h-32 flex-shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={categories} cx="50%" cy="50%" innerRadius={35} outerRadius={55} dataKey="value" stroke="none" animationBegin={200} animationDuration={800}>
                {categories.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-col gap-2">
          {categories.map((cat, i) => (
            <div key={cat.name} className="flex items-center gap-2 text-sm">
              <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
              <span className="text-muted-foreground">{cat.name}</span>
              <span className="font-medium text-foreground ml-auto">{cat.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DonutChart;
