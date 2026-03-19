import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface IslamicModeContextType {
  islamicMode: boolean;
  toggleIslamicMode: () => void;
}

const IslamicModeContext = createContext<IslamicModeContextType>({
  islamicMode: false,
  toggleIslamicMode: () => {},
});

export const useIslamicMode = () => useContext(IslamicModeContext);

export const IslamicModeProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [islamicMode, setIslamicMode] = useState(() => {
    return localStorage.getItem("cashbondhu_islamic_mode") === "true";
  });

  // Load from DB when user changes
  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    const load = async () => {
      const { data } = await supabase
        .from("profiles")
        .select("islamic_mode")
        .eq("user_id", user.id)
        .single();
      if (!cancelled && data) {
        setIslamicMode(data.islamic_mode ?? false);
        localStorage.setItem("cashbondhu_islamic_mode", String(data.islamic_mode ?? false));
      }
    };
    load();
    return () => { cancelled = true; };
  }, [user?.id]);

  const toggleIslamicMode = useCallback(async () => {
    const newValue = !islamicMode;
    setIslamicMode(newValue);
    localStorage.setItem("cashbondhu_islamic_mode", String(newValue));
    if (user) {
      await supabase
        .from("profiles")
        .update({ islamic_mode: newValue })
        .eq("user_id", user.id);
    }
  }, [islamicMode, user]);

  return (
    <IslamicModeContext.Provider value={{ islamicMode, toggleIslamicMode }}>
      {children}
    </IslamicModeContext.Provider>
  );
};
