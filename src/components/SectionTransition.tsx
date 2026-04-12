"use client";

import { motion, useTransform } from "framer-motion";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { ReactNode } from "react";

interface SectionTransitionProps {
  children: ReactNode;
  className?: string;
}

export default function SectionTransition({ children, className = "" }: SectionTransitionProps) {
  const { ref, progress } = useScrollProgress({
    offset: ["start end", "end start"],
  });

  const y = useTransform(progress, [0, 0.3, 0.7, 1], [60, 0, 0, -30]);
  const opacity = useTransform(progress, [0, 0.15, 0.85, 1], [0.4, 1, 1, 0.6]);
  const scale = useTransform(progress, [0, 0.2, 0.8, 1], [0.97, 1, 1, 0.98]);

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity, scale }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
