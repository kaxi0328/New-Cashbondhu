import { useMemo } from "react";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";

// Approximate prayer times for Narsingdi/Dhaka, Bangladesh
// These rotate slightly by season. Using average times.
const getPrayerTimes = () => {
  const month = new Date().getMonth(); // 0-11
  
  // Seasonal adjustments (simplified for Bangladesh)
  const times: Record<string, { name: string; time: string; icon: string }[]> = {
    summer: [
      { name: "ফজর", time: "৪:০০", icon: "🌅" },
      { name: "যোহর", time: "১২:০০", icon: "☀️" },
      { name: "আসর", time: "৪:৩০", icon: "🌤️" },
      { name: "মাগরিব", time: "৬:৩০", icon: "🌇" },
      { name: "ইশা", time: "৮:০০", icon: "🌙" },
    ],
    winter: [
      { name: "ফজর", time: "৫:১৫", icon: "🌅" },
      { name: "যোহর", time: "১২:০০", icon: "☀️" },
      { name: "আসর", time: "৩:৪৫", icon: "🌤️" },
      { name: "মাগরিব", time: "৫:৩০", icon: "🌇" },
      { name: "ইশা", time: "৭:০০", icon: "🌙" },
    ],
    moderate: [
      { name: "ফজর", time: "৪:৩০", icon: "🌅" },
      { name: "যোহর", time: "১২:০০", icon: "☀️" },
      { name: "আসর", time: "৪:০০", icon: "🌤️" },
      { name: "মাগরিব", time: "৬:০০", icon: "🌇" },
      { name: "ইশা", time: "৭:৩০", icon: "🌙" },
    ],
  };

  if (month >= 4 && month <= 8) return times.summer;
  if (month >= 10 || month <= 1) return times.winter;
  return times.moderate;
};

// Determine current waqt
const getCurrentWaqt = (): string => {
  const hour = new Date().getHours();
  if (hour >= 4 && hour < 12) return "ফজর";
  if (hour >= 12 && hour < 15) return "যোহর";
  if (hour >= 15 && hour < 18) return "আসর";
  if (hour >= 18 && hour < 20) return "মাগরিব";
  return "ইশা";
};

const PrayerTimes = () => {
  const prayers = useMemo(() => getPrayerTimes(), []);
  const currentWaqt = getCurrentWaqt();

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      className="bg-card rounded-2xl shadow-card p-4 mb-4 border border-emerald-500/20"
    >
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 rounded-lg bg-emerald-500/15 flex items-center justify-center">
          <Clock size={16} className="text-emerald-500" />
        </div>
        <h3 className="text-sm font-semibold text-foreground">নামাজের সময়সূচী</h3>
        <span className="text-[10px] text-muted-foreground ml-auto">📍 বাংলাদেশ</span>
      </div>

      <div className="grid grid-cols-5 gap-1.5">
        {prayers.map((prayer) => {
          const isActive = prayer.name === currentWaqt;
          return (
            <div
              key={prayer.name}
              className={`flex flex-col items-center p-2 rounded-xl transition-colors ${
                isActive
                  ? "bg-emerald-500/15 border border-emerald-500/30"
                  : "bg-muted/50"
              }`}
            >
              <span className="text-lg">{prayer.icon}</span>
              <span className={`text-[10px] font-semibold mt-1 ${isActive ? "text-emerald-500" : "text-foreground"}`}>
                {prayer.name}
              </span>
              <span className={`text-[10px] ${isActive ? "text-emerald-400" : "text-muted-foreground"}`}>
                {prayer.time}
              </span>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export { getCurrentWaqt };
export default PrayerTimes;
