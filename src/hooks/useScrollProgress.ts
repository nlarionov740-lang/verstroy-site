"use client";

import { useScroll, useSpring, MotionValue } from "framer-motion";
import { useRef } from "react";

interface ScrollProgressOptions {
  offset?: [string, string];
  springConfig?: { stiffness: number; damping: number; mass: number };
}

export function useScrollProgress(options: ScrollProgressOptions = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const { offset = ["start end", "end start"], springConfig } = options;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: offset as ["start end", "end start"],
  });

  // useSpring must be called unconditionally (Rules of Hooks)
  const defaultConfig = { stiffness: 100, damping: 30, mass: 1 };
  const springed = useSpring(scrollYProgress, springConfig ?? defaultConfig);

  const progress: MotionValue<number> = springConfig ? springed : scrollYProgress;

  return { ref, progress, rawProgress: scrollYProgress };
}
