"use client";

import { useRef, useCallback } from "react";

interface MagneticOptions {
  strength?: number;
}

export function useMagnetic<T extends HTMLElement = HTMLElement>({ strength = 0.3 }: MagneticOptions = {}) {
  const ref = useRef<T>(null);

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    },
    [strength]
  );

  const onMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate(0, 0)";
  }, []);

  return { ref, onMouseMove, onMouseLeave, style: { transition: "transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)" } };
}
