"use client";

import { useSyncExternalStore } from "react";
import { useInView } from "framer-motion";
import type { RefObject } from "react";

const HOVER_QUERY = "(hover: hover)";

function subscribeHover(callback: () => void) {
  const mq = window.matchMedia(HOVER_QUERY);
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getHoverSnapshot() {
  return window.matchMedia(HOVER_QUERY).matches;
}

function getServerHoverSnapshot() {
  return false;
}

/**
 * На мобиле (no hover): true когда элемент виден в viewport (threshold)
 * На десктопе (hover): всегда false — там работает реальный hover
 */
export function useMobileActive(
  ref: RefObject<HTMLElement | null>,
  options: { threshold?: number | "some" | "all"; margin?: string } = {}
): boolean {
  const canHover = useSyncExternalStore(
    subscribeHover,
    getHoverSnapshot,
    getServerHoverSnapshot
  );

  const inView = useInView(ref, {
    amount: options.threshold ?? 0.6,
    margin: options.margin as `${number}${"px" | "%"}` | undefined,
  });

  return !canHover && inView;
}
