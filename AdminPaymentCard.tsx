import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import type { PaymentRequest } from "@/pages/AdminPanel";

interface Props {
  payment: PaymentRequest;
  onApprove: (payment: PaymentRequest) => void;
  onReject: (id: string) => void;
}

const AdminPaymentCard = ({ payment: p, onApprove, onReject }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-2xl shadow-card p-4"
    >
      <div className="flex items-start justify-between mb-2">
        <div>
          <p className="text-sm font-semibold text-foreground">{p.user_name}</p>
          <p className="text-[10px] text-muted-foreground">{new Date(p.created_at).toLocaleString("bn-BD")}</p>
        </div>
        <span className={`text-[10px] px-2 py-0.5 rounded-lg font-medium ${
          p.status === "pending" ? "bg-amber-500/10 text-amber-500" :
          p.status === "approved" ? "bg-success/10 text-success" :
          "bg-destructive/10 text-destructive"
        }`}>
          {p.status === "pending" ? "পেন্ডিং" : p.status === "approved" ? "অনুমোদিত" : "বাতিল"}
        </span>
      </div>
      <div className="grid grid-cols-3 gap-2 text-xs mb-3">
        <div className="bg-muted rounded-lg p-2">
          <p className="text-[9px] text-muted-foreground">মাধ্যম</p>
          <p className="font-medium text-foreground capitalize text-[11px]">{p.method}</p>
        </div>
        <div className="bg-muted rounded-lg p-2">
          <p className="text-[9px] text-muted-foreground">নম্বর</p>
          <p className="font-medium text-foreground text-[11px]">{p.phone_number}</p>
        </div>
        <div className="bg-muted rounded-lg p-2">
          <p className="text-[9px] text-muted-foreground">TxN ID</p>
          <p className="font-medium text-foreground truncate text-[11px]">{p.transaction_id}</p>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-sm font-bold text-primary">৳{p.amount}</p>
        {p.status === "pending" && (
          <div className="flex gap-2">
            <button onClick={() => onApprove(p)} className="py-1.5 px-4 rounded-xl bg-success/10 text-success text-[11px] font-semibold hover:bg-success/20 flex items-center gap-1">
              <Check size={13} /> অনুমোদন
            </button>
            <button onClick={() => onReject(p.id)} className="py-1.5 px-4 rounded-xl bg-destructive/10 text-destructive text-[11px] font-semibold hover:bg-destructive/20 flex items-center gap-1">
              <X size={13} /> বাতিল
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default AdminPaymentCard;
