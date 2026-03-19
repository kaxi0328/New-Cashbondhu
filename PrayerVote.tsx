import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, ThumbsUp } from "lucide-react";
import { getCurrentWaqt } from "./PrayerTimes";

const congratsMessages = [
  "মাশাআল্লাহ! আল্লাহ আপনার নামাজ কবুল করুন। 🤲",
  "সুবহানাল্লাহ! আপনি সঠিক পথে আছেন। জান্নাতের দরজা খোলা। 💚",
  "আলহামদুলিল্লাহ! নামাজই সফলতার চাবি। আল্লাহ আপনাকে বরকত দিন। ✨",
  "মাশাআল্লাহ! নামাজ পড়ে আপনি আল্লাহর নৈকট্য অর্জন করছেন। 🕌",
];

const motivateMessages = [
  "নামাজ হলো জান্নাতের চাবি। এখনও সময় আছে, তাড়াতাড়ি পড়ে নিন! 🕌",
  "আল্লাহ ক্ষমাশীল। এখনই নামাজে দাঁড়ান, আল্লাহ আপনার জন্য অপেক্ষা করছেন। 💚",
  "নামাজ ছাড়া কোনো আমলই কবুল হয় না। এখনই আদায় করে নিন। 🤲",
  "রাসূল (সা.) বলেছেন: নামাজ মুমিনের মিরাজ। আসুন, আল্লাহর সাথে কথা বলি। ✨",
];

const PrayerVote = () => {
  const [currentWaqt, setCurrentWaqt] = useState(getCurrentWaqt());
  const [popup, setPopup] = useState<{ type: "yes" | "no"; message: string } | null>(null);
  const [voted, setVoted] = useState<string | null>(null);

  useEffect(() => {
    // Check if already voted for this waqt today
    const key = `cashbondhu_prayer_${new Date().toDateString()}_${currentWaqt}`;
    const v = localStorage.getItem(key);
    setVoted(v);
  }, [currentWaqt]);

  const handleVote = (answer: "yes" | "no") => {
    const key = `cashbondhu_prayer_${new Date().toDateString()}_${currentWaqt}`;
    localStorage.setItem(key, answer);
    setVoted(answer);

    const messages = answer === "yes" ? congratsMessages : motivateMessages;
    const msg = messages[Math.floor(Math.random() * messages.length)];
    setPopup({ type: answer, message: msg });
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-card rounded-2xl shadow-card p-4 mb-4 border border-emerald-500/20"
      >
        <div className="text-center">
          <p className="text-sm font-semibold text-foreground mb-1">
            🕌 আপনি কি <span className="text-emerald-500">{currentWaqt}</span> নামাজ পড়েছেন?
          </p>
          
          {voted ? (
            <div className="flex items-center justify-center gap-2 mt-2">
              <ThumbsUp size={14} className="text-emerald-500" />
              <span className="text-xs text-muted-foreground">
                {voted === "yes" ? "আলহামদুলিল্লাহ! ✅" : "ইনশাআল্লাহ পরের বার 🤲"}
              </span>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-3 mt-3">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => handleVote("yes")}
                className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 transition-colors"
              >
                <Check size={16} /> হ্যাঁ
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => handleVote("no")}
                className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-muted text-foreground text-sm font-semibold hover:bg-muted/80 transition-colors"
              >
                <X size={16} /> না
              </motion.button>
            </div>
          )}
        </div>
      </motion.div>

      {/* Popup */}
      <AnimatePresence>
        {popup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
            onClick={() => setPopup(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="bg-card rounded-2xl shadow-card-hover p-6 max-w-sm w-full text-center border border-border"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-4xl mb-3">
                {popup.type === "yes" ? "🎉" : "🤲"}
              </div>
              <p className="text-sm text-foreground leading-relaxed">{popup.message}</p>
              <button
                onClick={() => setPopup(null)}
                className="mt-4 px-5 py-2 rounded-xl bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 transition-colors"
              >
                ঠিক আছে
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PrayerVote;
