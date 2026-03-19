import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, Check, X, Moon, Trash2, Calendar } from "lucide-react";
import type { UserProfile } from "@/pages/AdminPanel";

interface Props {
  user: UserProfile;
  onActivate: (id: string) => void;
  onDeactivate: (id: string) => void;
  onView: (user: UserProfile) => void;
  onDelete: (id: string) => void;
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case "trial": return <span className="text-[10px] px-2 py-0.5 rounded-lg bg-blue-500/10 text-blue-500 font-medium">ট্রায়াল</span>;
    case "active": return <span className="text-[10px] px-2 py-0.5 rounded-lg bg-success/10 text-success font-medium">একটিভ</span>;
    case "expired": return <span className="text-[10px] px-2 py-0.5 rounded-lg bg-destructive/10 text-destructive font-medium">মেয়াদোত্তীর্ণ</span>;
    default: return <span className="text-[10px] px-2 py-0.5 rounded-lg bg-muted text-muted-foreground font-medium">নেই</span>;
  }
};

const AdminUserCard = ({ user: u, onActivate, onDeactivate, onView, onDelete }: Props) => {
  const [confirmDelete, setConfirmDelete] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-2xl shadow-card p-4"
    >
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-primary font-bold text-sm flex-shrink-0">
          {(u.full_name || "ব")[0].toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold text-foreground truncate">{u.full_name || "নামহীন"}</p>
            {u.islamic_mode && <Moon size={12} className="text-emerald-500 flex-shrink-0" />}
          </div>
          <p className="text-[10px] text-muted-foreground flex items-center gap-1">
            <Calendar size={10} />
            যোগদান: {new Date(u.created_at).toLocaleDateString("bn-BD")}
          </p>
        </div>
        {getStatusBadge(u.subscription_status || "none")}
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-2 mb-2 ml-[52px]">
        <div className="bg-muted rounded-lg p-1.5 text-center">
          <p className="text-[9px] text-muted-foreground">আয়</p>
          <p className="text-[11px] font-semibold text-success">৳{(u.total_income || 0).toLocaleString("bn-BD")}</p>
        </div>
        <div className="bg-muted rounded-lg p-1.5 text-center">
          <p className="text-[9px] text-muted-foreground">ব্যয়</p>
          <p className="text-[11px] font-semibold text-destructive">৳{(u.total_expense || 0).toLocaleString("bn-BD")}</p>
        </div>
        <div className="bg-muted rounded-lg p-1.5 text-center">
          <p className="text-[9px] text-muted-foreground">লেনদেন</p>
          <p className="text-[11px] font-semibold text-foreground">{u.transaction_count || 0}</p>
        </div>
      </div>

      {/* Subscription dates */}
      {u.subscription_started && (
        <div className="ml-[52px] mb-2 text-[10px] text-muted-foreground space-y-0.5">
          <p>শুরু: {new Date(u.subscription_started).toLocaleDateString("bn-BD")}</p>
          {u.subscription_expires && (
            <p>মেয়াদ: {new Date(u.subscription_expires).toLocaleDateString("bn-BD")}
              {u.subscription_status !== "expired" && (() => {
                const days = Math.ceil((new Date(u.subscription_expires).getTime() - Date.now()) / 86400000);
                return days > 0 ? ` (${days} দিন বাকি)` : " (মেয়াদ শেষ)";
              })()}
            </p>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-2 ml-[52px] flex-wrap">
        <button onClick={() => onView(u)} className="text-[10px] px-2.5 py-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors font-medium flex items-center gap-1">
          <Eye size={12} /> বিস্তারিত
        </button>
        <button onClick={() => onActivate(u.user_id)} className="text-[10px] px-2.5 py-1.5 rounded-lg bg-success/10 text-success hover:bg-success/20 transition-colors font-medium">
          একটিভ (১ মাস)
        </button>
        <button onClick={() => onDeactivate(u.user_id)} className="text-[10px] px-2.5 py-1.5 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors font-medium">
          ডিএকটিভ
        </button>
        {!confirmDelete ? (
          <button onClick={() => setConfirmDelete(true)} className="text-[10px] px-2.5 py-1.5 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors font-medium flex items-center gap-1">
            <Trash2 size={12} /> ডিলিট
          </button>
        ) : (
          <div className="flex gap-1">
            <button onClick={() => { onDelete(u.user_id); setConfirmDelete(false); }} className="text-[10px] px-2.5 py-1.5 rounded-lg bg-destructive text-white hover:bg-destructive/90 transition-colors font-medium">
              নিশ্চিত?
            </button>
            <button onClick={() => setConfirmDelete(false)} className="text-[10px] px-2.5 py-1.5 rounded-lg bg-muted text-muted-foreground hover:bg-muted/80 transition-colors font-medium">
              বাতিল
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default AdminUserCard;