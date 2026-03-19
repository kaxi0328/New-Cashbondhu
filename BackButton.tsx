import React from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

interface BackButtonProps {
  to?: string;
}

const BackButton = React.forwardRef<HTMLButtonElement, BackButtonProps>(({ to }, ref) => {
  const navigate = useNavigate();

  return (
    <motion.button
      ref={ref}
      whileTap={{ scale: 0.85 }}
      onClick={() => (to ? navigate(to) : navigate(-1))}
      className="absolute top-4 left-4 p-2 rounded-xl bg-card/80 backdrop-blur-sm shadow-card hover:shadow-card-hover transition-shadow z-10"
    >
      <ArrowLeft size={20} className="text-foreground" />
    </motion.button>
  );
});

BackButton.displayName = "BackButton";

export default BackButton;
