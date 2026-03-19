import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface SalamPopupProps {
  name: string;
}

const SalamPopup = ({ name }: SalamPopupProps) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const key = `cashbondhu_salam_${new Date().toDateString()}`;
    const shown = sessionStorage.getItem(key);
    if (!shown) {
      setShow(true);
      sessionStorage.setItem(key, "true");
    }
  }, []);

  if (!show) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
          onClick={() => setShow(false)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 30 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="bg-card rounded-2xl shadow-card-hover p-6 max-w-sm w-full text-center relative border border-border"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={() => setShow(false)} className="absolute top-3 right-3 text-muted-foreground hover:text-foreground">
              <X size={18} />
            </button>
            <div className="text-4xl mb-3">🕌</div>
            <h2 className="text-xl font-bold text-foreground mb-2">
              আসসালামু আলাইকুম!
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              প্রিয় <span className="text-primary font-semibold">{name}</span>, কেমন আছেন? 
              আল্লাহ আপনাকে ভালো রাখুন। আজকের দিনটি বরকতময় হোক। 🤲
            </p>
            <button
              onClick={() => setShow(false)}
              className="mt-4 px-6 py-2.5 rounded-xl bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 transition-colors"
            >
              ওয়া আলাইকুমুস সালাম 💚
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SalamPopup;
