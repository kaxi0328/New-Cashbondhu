import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, X } from "lucide-react";
import { useSubscription } from "@/contexts/SubscriptionContext";

const SubscriptionWarning = () => {
  const { showWarning, daysLeft, status } = useSubscription();
  const [dismissed, setDismissed] = useState(false);

  if (!showWarning || dismissed) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="bg-amber-500/15 border border-amber-500/30 rounded-2xl p-4 mb-4 relative"
      >
        <button onClick={() => setDismissed(true)} className="absolute top-3 right-3 text-muted-foreground">
          <X size={16} />
        </button>
        <div className="flex items-start gap-3">
          <AlertTriangle size={20} className="text-amber-500 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-semibold text-foreground">
              {status === "trial" ? "ফ্রি ট্রায়াল" : "সাবস্ক্রিপশন"} শেষ হতে {daysLeft} দিন বাকি!
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              মেয়াদ শেষ হলে নতুন হিসাব যোগ করতে পারবেন না। প্রোফাইল পেইজ থেকে পেমেন্ট করে সাবস্ক্রিপশন নবায়ন করুন।
            </p>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SubscriptionWarning;
