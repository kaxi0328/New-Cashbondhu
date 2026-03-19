import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Smartphone, Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useSubscription } from "@/contexts/SubscriptionContext";

interface PaymentModalProps {
  open: boolean;
  onClose: () => void;
}

const methods = [
  { id: "bkash", name: "বিকাশ", color: "bg-pink-500" },
  { id: "nagad", name: "নগদ", color: "bg-orange-500" },
  { id: "upay", name: "উপায়", color: "bg-emerald-500" },
];

const PaymentModal = ({ open, onClose }: PaymentModalProps) => {
  const [method, setMethod] = useState("bkash");
  const [phone, setPhone] = useState("");
  const [txnId, setTxnId] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { refetch } = useSubscription();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || !txnId) return;
    setLoading(true);

    const { error } = await supabase.from("payment_requests").insert({
      method,
      phone_number: phone,
      transaction_id: txnId,
      amount: 20,
    });

    setLoading(false);
    if (error) {
      toast({ title: "ত্রুটি", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "পেমেন্ট রিকোয়েস্ট পাঠানো হয়েছে!", description: "অ্যাডমিন অনুমোদন করলে একাউন্ট একটিভ হবে।" });
      setPhone("");
      setTxnId("");
      refetch();
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-card rounded-2xl shadow-card p-6 w-full max-w-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-foreground">পেমেন্ট করুন</h3>
              <button onClick={onClose}><X size={20} className="text-muted-foreground" /></button>
            </div>

            <div className="bg-muted rounded-xl p-3 mb-4">
              <p className="text-xs text-muted-foreground mb-1">মাসিক সাবস্ক্রিপশন ফি</p>
              <p className="text-2xl font-bold text-foreground">৳২০</p>
              <p className="text-xs text-muted-foreground mt-1">
                নিচের যেকোনো মাধ্যমে <span className="font-semibold text-primary">01862713595</span> নম্বরে সেন্ড মানি করুন
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="flex gap-2">
                {methods.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setMethod(m.id)}
                    className={`flex-1 py-2 rounded-xl text-xs font-medium transition-all ${
                      method === m.id
                        ? `${m.color} text-white shadow-md`
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {m.name}
                  </button>
                ))}
              </div>

              <div className="relative">
                <Smartphone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="আপনার নম্বর (যেটা দিয়ে পাঠিয়েছেন)"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-muted rounded-xl text-foreground placeholder:text-muted-foreground text-sm outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>

              <div className="relative">
                <Send size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="ট্রানজেকশন আইডি"
                  value={txnId}
                  onChange={(e) => setTxnId(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-muted rounded-xl text-foreground placeholder:text-muted-foreground text-sm outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 rounded-xl gradient-card-accent text-primary-foreground font-semibold text-sm disabled:opacity-50"
              >
                {loading ? "পাঠানো হচ্ছে..." : "সাবমিট করুন"}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PaymentModal;
