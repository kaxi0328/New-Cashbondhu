import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, TrendingUp, TrendingDown, Calendar, Moon, Check, X, Trash2, Edit3 } from "lucide-react";
import type { UserProfile } from "@/pages/AdminPanel";

interface Props {
  user: UserProfile;
  transactions: any[];
  onBack: () => void;
  onActivate: (id: string) => void;
  onDeactivate: (id: string) => void;
  onDelete: (id: string) => void;
  onDeleteTransactions: (id: string) => void;
  onEditBalance: (id: string, type: "income" | "expense", amount: number, title: string) => void;
}

const AdminUserDetail = ({ user: u, transactions, onBack, onActivate, onDeactivate, onDelete, onDeleteTransactions, onEditBalance }: Props) => {
  const income = transactions.filter((t) => t.type === "income").reduce((s, t) => s + Number(t.amount), 0);
  const expense = transactions.filter((t) => t.type === "expense").reduce((s, t) => s + Math.abs(Number(t.amount)), 0);

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [confirmDeleteTx, setConfirmDeleteTx] = useState(false);
  const [showBalanceEdit, setShowBalanceEdit] = useState(false);
  const [balanceType, setBalanceType] = useState<"income" | "expense">("income");
  const [balanceAmount, setBalanceAmount] = useState("");
  const [balanceTitle, setBalanceTitle] = useState("");

  const handleBalanceSubmit = () => {
    const amt = parseFloat(balanceAmount);
    if (!amt || amt <= 0 || !balanceTitle.trim()) return;
    onEditBalance(u.user_id, balanceType, amt, balanceTitle.trim());
    setShowBalanceEdit(false);
    setBalanceAmount("");
    setBalanceTitle("");
  };

  return (
    <div className="pb-24 min-h-screen gradient-hero">
      <div className="max-w-2xl mx-auto px-4 pt-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3 mb-5">
          <button onClick={onBack} className="p-2 rounded-xl bg-card shadow-card">
            <ArrowLeft size={18} className="text-foreground" />
          </button>
          <h1 className="text-lg font-bold text-foreground">ইউজার বিস্তারিত</h1>
        </motion.div>

        {/* Profile Card */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-2xl shadow-card p-5 mb-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center text-primary font-bold text-xl">
              {(u.full_name || "ব")[0].toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-foreground">{u.full_name || "নামহীন"}</h2>
                {u.islamic_mode && <Moon size={14} className="text-emerald-500" />}
              </div>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <Calendar size={11} /> যোগদান: {new Date(u.created_at).toLocaleDateString("bn-BD")}
              </p>
            </div>
          </div>

          {/* Subscription Info */}
          <div className="bg-muted rounded-xl p-3 mb-4">
            <h3 className="text-xs font-semibold text-foreground mb-2">সাবস্ক্রিপশন তথ্য</h3>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div>
                <p className="text-muted-foreground">স্ট্যাটাস</p>
                <p className={`font-semibold ${u.subscription_status === "active" ? "text-success" : u.subscription_status === "trial" ? "text-blue-500" : "text-destructive"}`}>
                  {u.subscription_status === "active" ? "একটিভ" : u.subscription_status === "trial" ? "ট্রায়াল" : u.subscription_status === "expired" ? "মেয়াদোত্তীর্ণ" : "নেই"}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">রোল</p>
                <p className="font-semibold text-foreground capitalize">{u.role}</p>
              </div>
              {u.subscription_started && (
                <div>
                  <p className="text-muted-foreground">শুরু তারিখ</p>
                  <p className="font-semibold text-foreground">{new Date(u.subscription_started).toLocaleDateString("bn-BD")}</p>
                </div>
              )}
              {u.subscription_expires && (
                <div>
                  <p className="text-muted-foreground">মেয়াদ শেষ</p>
                  <p className="font-semibold text-foreground">{new Date(u.subscription_expires).toLocaleDateString("bn-BD")}</p>
                </div>
              )}
            </div>
          </div>

          {/* Financial Summary */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            <div className="bg-success/10 rounded-xl p-3 text-center">
              <TrendingUp size={16} className="text-success mx-auto mb-1" />
              <p className="text-xs font-bold text-success">৳{income.toLocaleString("bn-BD")}</p>
              <p className="text-[9px] text-muted-foreground">মোট আয়</p>
            </div>
            <div className="bg-destructive/10 rounded-xl p-3 text-center">
              <TrendingDown size={16} className="text-destructive mx-auto mb-1" />
              <p className="text-xs font-bold text-destructive">৳{expense.toLocaleString("bn-BD")}</p>
              <p className="text-[9px] text-muted-foreground">মোট ব্যয়</p>
            </div>
            <div className="bg-primary/10 rounded-xl p-3 text-center">
              <p className="text-xs font-bold text-primary mt-1">৳{(income - expense).toLocaleString("bn-BD")}</p>
              <p className="text-[9px] text-muted-foreground mt-1">ব্যালেন্স</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 flex-wrap mb-3">
            <button onClick={() => onActivate(u.user_id)} className="flex-1 py-2.5 rounded-xl bg-success/10 text-success text-xs font-semibold hover:bg-success/20 flex items-center justify-center gap-1">
              <Check size={14} /> একটিভ (১ মাস)
            </button>
            <button onClick={() => onDeactivate(u.user_id)} className="flex-1 py-2.5 rounded-xl bg-destructive/10 text-destructive text-xs font-semibold hover:bg-destructive/20 flex items-center justify-center gap-1">
              <X size={14} /> ডিএকটিভ
            </button>
          </div>

          {/* Admin Power Actions */}
          <div className="flex gap-2 flex-wrap">
            <button onClick={() => setShowBalanceEdit(!showBalanceEdit)} className="py-2 px-3 rounded-xl bg-primary/10 text-primary text-[11px] font-semibold hover:bg-primary/20 flex items-center gap-1">
              <Edit3 size={13} /> ব্যালেন্স এডিট
            </button>
            {!confirmDeleteTx ? (
              <button onClick={() => setConfirmDeleteTx(true)} className="py-2 px-3 rounded-xl bg-amber-500/10 text-amber-600 text-[11px] font-semibold hover:bg-amber-500/20 flex items-center gap-1">
                <Trash2 size={13} /> হিস্ট্রি মুছুন
              </button>
            ) : (
              <div className="flex gap-1">
                <button onClick={() => { onDeleteTransactions(u.user_id); setConfirmDeleteTx(false); }} className="py-2 px-3 rounded-xl bg-amber-600 text-white text-[11px] font-semibold">
                  নিশ্চিত মুছুন?
                </button>
                <button onClick={() => setConfirmDeleteTx(false)} className="py-2 px-3 rounded-xl bg-muted text-muted-foreground text-[11px] font-semibold">
                  বাতিল
                </button>
              </div>
            )}
            {!confirmDelete ? (
              <button onClick={() => setConfirmDelete(true)} className="py-2 px-3 rounded-xl bg-destructive/10 text-destructive text-[11px] font-semibold hover:bg-destructive/20 flex items-center gap-1">
                <Trash2 size={13} /> ইউজার ডিলিট
              </button>
            ) : (
              <div className="flex gap-1">
                <button onClick={() => { onDelete(u.user_id); setConfirmDelete(false); }} className="py-2 px-3 rounded-xl bg-destructive text-white text-[11px] font-semibold">
                  নিশ্চিত ডিলিট?
                </button>
                <button onClick={() => setConfirmDelete(false)} className="py-2 px-3 rounded-xl bg-muted text-muted-foreground text-[11px] font-semibold">
                  বাতিল
                </button>
              </div>
            )}
          </div>

          {/* Balance Edit Form */}
          {showBalanceEdit && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-3 bg-muted rounded-xl p-3 space-y-2">
              <h4 className="text-xs font-semibold text-foreground">ব্যালেন্স সমন্বয়</h4>
              <div className="flex gap-2">
                <button onClick={() => setBalanceType("income")} className={`text-[11px] px-3 py-1.5 rounded-lg font-medium ${balanceType === "income" ? "bg-success text-white" : "bg-card text-muted-foreground"}`}>
                  আয় (+)
                </button>
                <button onClick={() => setBalanceType("expense")} className={`text-[11px] px-3 py-1.5 rounded-lg font-medium ${balanceType === "expense" ? "bg-destructive text-white" : "bg-card text-muted-foreground"}`}>
                  ব্যয় (-)
                </button>
              </div>
              <input
                type="text"
                value={balanceTitle}
                onChange={(e) => setBalanceTitle(e.target.value)}
                placeholder="কারণ লিখুন (যেমন: সমন্বয়)"
                className="w-full px-3 py-2 bg-card rounded-lg text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/30"
              />
              <input
                type="number"
                value={balanceAmount}
                onChange={(e) => setBalanceAmount(e.target.value)}
                placeholder="পরিমাণ (৳)"
                className="w-full px-3 py-2 bg-card rounded-lg text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/30"
              />
              <div className="flex gap-2">
                <button onClick={handleBalanceSubmit} className="flex-1 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-semibold">
                  আপডেট করুন
                </button>
                <button onClick={() => setShowBalanceEdit(false)} className="py-2 px-3 rounded-lg bg-card text-muted-foreground text-xs font-semibold">
                  বাতিল
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Transactions */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <h3 className="text-sm font-semibold text-foreground mb-3">সাম্প্রতিক লেনদেন ({transactions.length})</h3>
          {transactions.length === 0 ? (
            <div className="bg-card rounded-2xl shadow-card p-5 text-center">
              <p className="text-xs text-muted-foreground">কোনো লেনদেন নেই</p>
            </div>
          ) : (
            <div className="space-y-2">
              {transactions.map((tx: any) => {
                const isIncome = tx.type === "income";
                return (
                  <div key={tx.id} className="bg-card rounded-xl shadow-card p-3 flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${isIncome ? "bg-success/15" : "bg-destructive/10"}`}>
                      {isIncome ? <TrendingUp size={14} className="text-success" /> : <TrendingDown size={14} className="text-destructive" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-foreground truncate">{tx.title}</p>
                      <p className="text-[10px] text-muted-foreground">{tx.category} • {new Date(tx.created_at).toLocaleDateString("bn-BD")}</p>
                    </div>
                    <span className={`text-xs font-bold ${isIncome ? "text-success" : "text-destructive"}`}>
                      {isIncome ? "+" : "-"}৳{Math.abs(tx.amount).toLocaleString("bn-BD")}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AdminUserDetail;