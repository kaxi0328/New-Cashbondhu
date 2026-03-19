import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import { useSubscription } from "@/contexts/SubscriptionContext";
import { useNavigate } from "react-router-dom";

const SubscriptionBanner = () => {
  const { status } = useSubscription();
  const navigate = useNavigate();

  if (status !== "expired") return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-destructive/10 border border-destructive/30 rounded-2xl p-4 mb-4"
    >
      <div className="flex items-start gap-3">
        <Lock size={20} className="text-destructive mt-0.5 flex-shrink-0" />
        <div>
          <p className="text-sm font-semibold text-foreground">
            আপনার {" "}সাবস্ক্রিপশন শেষ হয়ে গেছে!
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            আগের হিসাব দেখতে পারবেন কিন্তু নতুন কিছু যোগ করতে পারবেন না। সাবস্ক্রিপশন নবায়ন করুন।
          </p>
          <button
            onClick={() => navigate("/profile")}
            className="mt-2 text-xs px-4 py-1.5 rounded-lg gradient-card-accent text-primary-foreground font-medium"
          >
            পেমেন্ট করুন
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default SubscriptionBanner;
