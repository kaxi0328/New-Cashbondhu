import { useState } from "react";
import { X, ArrowDownLeft, ArrowUpRight, FileText, Lock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useSubscription } from "@/contexts/SubscriptionContext";

interface AddActionModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

type Tab = "income" | "expense" | "note";

const tabs: { key: Tab; label: string; icon: React.ElementType }[] = [
  { key: "income", label: "আয়", icon: ArrowDownLeft },
  { key: "expense", label: "খরচ", icon: ArrowUpRight },
  { key: "note", label: "নোট", icon: FileText },
];

const quickCategories: Record<string, string[]> = {
  income: ["বেতন", "ফ্রিল্যান্স", "উপহার"],
  expense: ["খাবার", "যাতায়াত", "শপিং", "বিল"],
};

const AddActionModal = ({ open, onClose, onSuccess }: AddActionModalProps) => {
  const [tab, setTab] = useState<Tab>("income");
  const [submitted, setSubmitted] = useState(false);
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const { toast } = useToast();
  const { canWrite } = useSubscription();

  const resetForm = () => {
    setAmount(""); setCategory(""); setDescription("");
    setNoteTitle(""); setNoteContent("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (tab === "note") {
        const { error } = await supabase.from("notes").insert({
          title: noteTitle,
          content: noteContent,
          color: ["bg-secondary", "bg-accent", "bg-muted"][Math.floor(Math.random() * 3)],
        });
        if (error) throw error;
      } else {
        const { error } = await supabase.from("transactions").insert({
          title: category,
          category: category,
          amount: Number(amount),
          type: tab,
          description: description || null,
        });
        if (error) throw error;
      }

      setSubmitted(true);
      resetForm();
      setTimeout(() => {
        setSubmitted(false);
        onSuccess?.();
      }, 800);
    } catch {
      toast({ title: "ত্রুটি", description: "সংরক্ষণ করা যায়নি। আবার চেষ্টা করুন।", variant: "destructive" });
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] bg-foreground/30 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 60, scale: 0.97 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="fixed inset-x-4 bottom-20 z-[70] max-w-md mx-auto bg-card rounded-2xl shadow-card-hover p-5"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">নতুন যোগ করুন</h2>
              <motion.button whileTap={{ scale: 0.8, rotate: 90 }} onClick={onClose} className="p-1 rounded-full hover:bg-muted transition-colors">
                <X size={20} className="text-muted-foreground" />
              </motion.button>
            </div>

            <div className="flex gap-1 bg-muted rounded-xl p-1 mb-5">
              {tabs.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setTab(t.key)}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm font-medium transition-all relative ${
                    tab === t.key ? "bg-card shadow-card text-primary" : "text-muted-foreground"
                  }`}
                >
                  <t.icon size={16} />
                  {t.label}
                </button>
              ))}
            </div>

            {!canWrite ? (
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="py-8 text-center">
                <div className="w-12 h-12 rounded-full bg-destructive/20 flex items-center justify-center mx-auto mb-3">
                  <Lock size={24} className="text-destructive" />
                </div>
                <p className="text-foreground font-medium mb-1">সাবস্ক্রিপশন নেই</p>
                <p className="text-xs text-muted-foreground">নতুন কিছু যোগ করতে সাবস্ক্রিপশন নবায়ন করুন।</p>
              </motion.div>
            ) : submitted ? (
              <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="py-8 text-center">
                <div className="w-12 h-12 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">✓</span>
                </div>
                <p className="text-foreground font-medium">সফলভাবে যোগ হয়েছে!</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                {tab === "note" ? (
                  <>
                    <input value={noteTitle} onChange={e => setNoteTitle(e.target.value)} placeholder="শিরোনাম" required className="w-full px-4 py-3 bg-muted rounded-xl text-foreground placeholder:text-muted-foreground text-sm outline-none focus:ring-2 focus:ring-primary/30" />
                    <textarea value={noteContent} onChange={e => setNoteContent(e.target.value)} placeholder="বিস্তারিত..." required rows={3} className="w-full px-4 py-3 bg-muted rounded-xl text-foreground placeholder:text-muted-foreground text-sm outline-none focus:ring-2 focus:ring-primary/30 resize-none" />
                  </>
                ) : (
                  <>
                    <div>
                      <label className="text-xs text-muted-foreground mb-1 block">পরিমাণ (৳)</label>
                      <input value={amount} onChange={e => setAmount(e.target.value)} placeholder="0.00" type="number" required className="w-full px-4 py-3 bg-muted rounded-xl text-foreground placeholder:text-muted-foreground text-sm outline-none focus:ring-2 focus:ring-primary/30" />
                    </div>

                    <div>
                      <label className="text-xs text-muted-foreground mb-1.5 block">উৎস/বিবরণ</label>
                      <div className="flex gap-2 flex-wrap mb-2">
                        {(quickCategories[tab] || []).map((cat) => (
                          <button
                            key={cat}
                            type="button"
                            onClick={() => setCategory(cat)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                              category === cat
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted text-muted-foreground hover:bg-secondary"
                            }`}
                          >
                            {cat}
                          </button>
                        ))}
                      </div>
                      <input value={category} onChange={e => setCategory(e.target.value)} placeholder={tab === "income" ? "আয়ের উৎস" : "কোথায় খরচ হয়েছে"} required className="w-full px-4 py-3 bg-muted rounded-xl text-foreground placeholder:text-muted-foreground text-sm outline-none focus:ring-2 focus:ring-primary/30" />
                    </div>

                    <input value={description} onChange={e => setDescription(e.target.value)} placeholder="বিস্তারিত (ঐচ্ছিক)" className="w-full px-4 py-3 bg-muted rounded-xl text-foreground placeholder:text-muted-foreground text-sm outline-none focus:ring-2 focus:ring-primary/30" />
                  </>
                )}
                <motion.button whileTap={{ scale: 0.97 }} type="submit" className="w-full py-3 rounded-xl gradient-card-accent text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity">
                  {tab === "note" ? "নোট সংরক্ষণ করুন" : "নিশ্চিত করুন"}
                </motion.button>
              </form>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AddActionModal;
