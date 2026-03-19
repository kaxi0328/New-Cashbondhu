import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface SubscriptionState {
  status: "trial" | "active" | "expired" | "loading";
  expiresAt: Date | null;
  daysLeft: number;
  canWrite: boolean;
  showWarning: boolean;
  refetch: () => void;
}

const SubscriptionContext = createContext<SubscriptionState>({
  status: "loading",
  expiresAt: null,
  daysLeft: 0,
  canWrite: false,
  showWarning: false,
  refetch: () => {},
});

export const useSubscription = () => useContext(SubscriptionContext);

export const SubscriptionProvider = ({ children }: { children: ReactNode }) => {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const [status, setStatus] = useState<"trial" | "active" | "expired" | "loading">("loading");
  const [expiresAt, setExpiresAt] = useState<Date | null>(null);
  const [daysLeft, setDaysLeft] = useState(0);

  const fetchSubscription = useCallback(async () => {
    if (authLoading) return;

    if (!user) {
      setStatus("loading");
      return;
    }

    if (isAdmin) {
      setStatus("active");
      setDaysLeft(999);
      return;
    }

    const { data } = await supabase
      .from("subscriptions")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(1);

    if (!data || data.length === 0) {
      setStatus("expired");
      setDaysLeft(0);
      return;
    }

    const sub = data[0];
    const expires = new Date(sub.expires_at);
    const now = new Date();
    const diff = Math.ceil((expires.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    setExpiresAt(expires);
    setDaysLeft(Math.max(0, diff));

    if (diff <= 0) {
      setStatus("expired");
    } else if (sub.status === "trial") {
      setStatus("trial");
    } else {
      setStatus("active");
    }
  }, [user?.id, isAdmin, authLoading]);

  useEffect(() => {
    fetchSubscription();
  }, [fetchSubscription]);

  const canWrite = status === "trial" || status === "active";
  const showWarning = (status === "trial" || status === "active") && daysLeft <= 5 && daysLeft > 0;

  return (
    <SubscriptionContext.Provider value={{ status, expiresAt, daysLeft, canWrite, showWarning, refetch: fetchSubscription }}>
      {children}
    </SubscriptionContext.Provider>
  );
};
