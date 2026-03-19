import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/contexts/AuthContext";
import { IslamicModeProvider } from "@/contexts/IslamicModeContext";
import { SubscriptionProvider } from "@/contexts/SubscriptionContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Reports from "./pages/Reports";
import Goals from "./pages/Goals";
import Notes from "./pages/Notes";
import Profile from "./pages/Profile";
import AdminPanel from "./pages/AdminPanel";
import NotFound from "./pages/NotFound";
import BottomNav from "./components/BottomNav";
import AddActionModal from "./components/AddActionModal";

const queryClient = new QueryClient();

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <ProtectedRoute>
      {children}
      <BottomNav onAddClick={() => setModalOpen(true)} />
      <AddActionModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={() => {
          setModalOpen(false);
          queryClient.invalidateQueries();
        }}
      />
    </ProtectedRoute>
  );
};

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Landing />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/dashboard" element={<ProtectedLayout><Dashboard /></ProtectedLayout>} />
    <Route path="/reports" element={<ProtectedLayout><Reports /></ProtectedLayout>} />
    <Route path="/goals" element={<ProtectedLayout><Goals /></ProtectedLayout>} />
    <Route path="/notes" element={<ProtectedLayout><Notes /></ProtectedLayout>} />
    <Route path="/profile" element={<ProtectedLayout><Profile /></ProtectedLayout>} />
    <Route path="/admin" element={<ProtectedLayout><AdminPanel /></ProtectedLayout>} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <IslamicModeProvider>
              <SubscriptionProvider>
                <AppRoutes />
              </SubscriptionProvider>
            </IslamicModeProvider>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
