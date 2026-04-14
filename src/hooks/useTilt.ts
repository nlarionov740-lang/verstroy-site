"use client";

import { useRef, useCallback } from "react";

interface TiltOptions {
  max?: number;
  scale?: number;
  speed?: number;
}

export function useTilt({ max = 8, scale = 1.02, speed = 400 }: TiltOptions = {}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const rotateX = (0.5 - y) * max;
      const rotateY = (x - 0.5) * max;
      el.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`;
    },
    [max, scale]
  );

  const onMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(600px) rotateX(0) rotateY(0) scale3d(1, 1, 1)";
  }, []);

  return { ref, onMouseMove, onMouseLeave, style: { transition: `transform ${speed}ms cubic-bezier(0.03, 0.98, 0.52, 0.99)`, transformStyle: "preserve-3d" as const } };
}
