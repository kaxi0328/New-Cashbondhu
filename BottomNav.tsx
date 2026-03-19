import { Home, BarChart3, Target, StickyNote, Plus } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

interface BottomNavProps {
  onAddClick: () => void;
}

const navItems = [
  { path: "/dashboard", icon: Home, label: "হোম" },
  { path: "/reports", icon: BarChart3, label: "রিপোর্ট" },
  { path: "/goals", icon: Target, label: "লক্ষ্য" },
  { path: "/notes", icon: StickyNote, label: "নোট" },
];

const BottomNav = ({ onAddClick }: BottomNavProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-xl shadow-nav border-t border-border">
      <div className="max-w-lg mx-auto flex items-center justify-around px-2 py-2 relative">
        {navItems.slice(0, 2).map((item) => {
          const active = location.pathname === item.path;
          return (
            <motion.button
              key={item.path}
              whileTap={{ scale: 0.85 }}
              onClick={() => navigate(item.path)}
              className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-colors relative"
            >
              {active && (
                <motion.div
                  layoutId="navIndicator"
                  className="absolute -top-1 w-6 h-1 rounded-full gradient-card-accent"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <motion.div animate={active ? { y: -2 } : { y: 0 }} transition={{ type: "spring", stiffness: 300 }}>
                <item.icon size={22} className={active ? "text-primary" : "text-muted-foreground"} />
              </motion.div>
              <span className={`text-[10px] font-medium ${active ? "text-primary" : "text-muted-foreground"}`}>
                {item.label}
              </span>
            </motion.button>
          );
        })}

        <div className="relative -mt-8">
          <motion.button
            whileTap={{ scale: 0.85, rotate: 90 }}
            whileHover={{ scale: 1.12 }}
            onClick={onAddClick}
            className="w-14 h-14 rounded-full gradient-card-accent shadow-fab flex items-center justify-center text-primary-foreground"
          >
            <Plus size={28} strokeWidth={2.5} />
          </motion.button>
        </div>

        {navItems.slice(2).map((item) => {
          const active = location.pathname === item.path;
          return (
            <motion.button
              key={item.path}
              whileTap={{ scale: 0.85 }}
              onClick={() => navigate(item.path)}
              className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-colors relative"
            >
              {active && (
                <motion.div
                  layoutId="navIndicator"
                  className="absolute -top-1 w-6 h-1 rounded-full gradient-card-accent"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <motion.div animate={active ? { y: -2 } : { y: 0 }} transition={{ type: "spring", stiffness: 300 }}>
                <item.icon size={22} className={active ? "text-primary" : "text-muted-foreground"} />
              </motion.div>
              <span className={`text-[10px] font-medium ${active ? "text-primary" : "text-muted-foreground"}`}>
                {item.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
