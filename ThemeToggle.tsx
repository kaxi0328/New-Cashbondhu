import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <motion.button
      whileTap={{ scale: 0.85, rotate: 15 }}
      whileHover={{ scale: 1.1 }}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-xl bg-card shadow-card hover:shadow-card-hover transition-shadow"
      aria-label="থিম পরিবর্তন"
    >
      {theme === "dark" ? (
        <Sun size={20} className="text-warning" />
      ) : (
        <Moon size={20} className="text-primary" />
      )}
    </motion.button>
  );
};

export default ThemeToggle;
