"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const dot = dotRef.current;
    const trail = trailRef.current;
    if (!dot || !trail) return;

    let mouseX = -50;
    let mouseY = -50;
    let trailX = -50;
    let trailY = -50;
    let visible = false;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!visible) {
        visible = true;
        dot.style.opacity = "1";
        trail.style.opacity = "1";
      }
    };

    const onMouseLeave = () => {
      visible = false;
      dot.style.opacity = "0";
      trail.style.opacity = "0";
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive =
        target.closest("a, button, [role='button'], input, textarea, select, [onclick]") ||
        target.tagName === "A" ||
        target.tagName === "BUTTON";
      if (interactive) {
        dot.style.width = "20px";
        dot.style.height = "20px";
        trail.style.width = "36px";
        trail.style.height = "36px";
      }
    };

    const onMouseOut = () => {
      dot.style.width = "14px";
      dot.style.height = "14px";
      trail.style.width = "28px";
      trail.style.height = "28px";
    };

    let raf: number;
    const animate = () => {
      trailX += (mouseX - trailX) * 0.12;
      trailY += (mouseY - trailY) * 0.12;

      dot.style.left = `${mouseX}px`;
      dot.style.top = `${mouseY}px`;
      trail.style.left = `${trailX}px`;
      trail.style.top = `${trailY}px`;

      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseout", onMouseOut);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
    };
  }, []);

  return (
    <>
      {/* Main dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed z-[9999] opacity-0"
        style={{
          width: 14,
          height: 14,
          borderRadius: "50%",
          background: "#D4A843",
          transform: "translate(-50%, -50%)",
          transition: "opacity 0.3s, width 0.2s, height 0.2s",
        }}
      />
      {/* Blurred trail — follows with delay, creates motion blur effect */}
      <div
        ref={trailRef}
        className="pointer-events-none fixed z-[9998] opacity-0"
        style={{
          width: 28,
          height: 28,
          borderRadius: "50%",
          background: "rgba(212, 168, 67, 0.25)",
          filter: "blur(8px)",
          transform: "translate(-50%, -50%)",
          transition: "opacity 0.3s, width 0.25s, height 0.25s",
        }}
      />
    </>
  );
}
