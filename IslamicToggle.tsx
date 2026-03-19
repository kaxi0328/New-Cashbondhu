import { motion } from "framer-motion";
import { useIslamicMode } from "@/contexts/IslamicModeContext";

const IslamicToggle = () => {
  const { islamicMode, toggleIslamicMode } = useIslamicMode();

  return (
    <motion.button
      whileTap={{ scale: 0.85, rotate: 10 }}
      whileHover={{ scale: 1.1 }}
      onClick={toggleIslamicMode}
      className={`p-2 rounded-xl shadow-card hover:shadow-card-hover transition-shadow ${
        islamicMode ? "bg-emerald-600" : "bg-card"
      }`}
      aria-label="ইসলামিক মোড"
      title={islamicMode ? "ইসলামিক মোড বন্ধ করুন" : "ইসলামিক মোড চালু করুন"}
    >
      <span className="text-lg leading-none">☪️</span>
    </motion.button>
  );
};

export default IslamicToggle;
