"use client";

import { useRef, useEffect, useCallback } from "react";

interface TerrainDividerProps {
  amplitude?: number;
  speed?: number;
  lines?: number;
  height?: number;
}

export default function TerrainDivider({
  amplitude = 40,
  speed = 0.4,
  lines = 7,
  height = 180,
}: TerrainDividerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const timeRef = useRef<number>(0);
  const scrollRef = useRef<number>(0);
  const lastFrameRef = useRef<number>(0);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    const t = timeRef.current;
    const scroll = scrollRef.current * 0.002;

    ctx.clearRect(0, 0, w, h);

    for (let i = 0; i < lines; i++) {
      // Progress from 0 (first/top line) to 1 (last/dimmest)
      const progress = i / Math.max(lines - 1, 1);

      // Alpha and lineWidth decrease with each subsequent line
      const alpha = 0.7 - progress * 0.55; // 0.7 → 0.15
      const lineWidth = 2 - progress * 1.6; // 2 → 0.4

      // Vertical position — distribute lines in the upper-mid area of canvas
      const baseY = (h * 0.2) + progress * (h * 0.65);

      const amp = amplitude * (1 - progress * 0.4);

      // Build wave path
      ctx.beginPath();

      const steps = Math.ceil(w);
      for (let px = 0; px <= steps; px++) {
        const nx = px / w;
        const y =
          baseY +
          Math.sin(nx * 6 + t * speed + scroll + i * 0.5) * amp +
          Math.sin(nx * 12 + t * speed * 0.7 + i * 0.3) * amp * 0.25 +
          Math.cos(nx * 3 - t * speed * 0.5 + i * 0.2) * amp * 0.15;

        if (px === 0) {
          ctx.moveTo(px, y);
        } else {
          ctx.lineTo(px, y);
        }
      }

      // For the first line — fill with gradient below
      if (i === 0) {
        // Close path to bottom and fill
        const endNx = 1;
        const endY =
          baseY +
          Math.sin(endNx * 6 + t * speed + scroll + i * 0.5) * amp +
          Math.sin(endNx * 12 + t * speed * 0.7 + i * 0.3) * amp * 0.25 +
          Math.cos(endNx * 3 - t * speed * 0.5 + i * 0.2) * amp * 0.15;

        ctx.lineTo(w, endY);
        ctx.lineTo(w, h);
        ctx.lineTo(0, h);

        const startY =
          baseY +
          Math.sin(0 + t * speed + scroll + i * 0.5) * amp +
          Math.sin(0 + t * speed * 0.7 + i * 0.3) * amp * 0.25 +
          Math.cos(0 - t * speed * 0.5 + i * 0.2) * amp * 0.15;

        ctx.lineTo(0, startY);
        ctx.closePath();

        const grad = ctx.createLinearGradient(0, baseY - amp, 0, h);
        grad.addColorStop(0, "rgba(228, 190, 106, 0.1)");
        grad.addColorStop(1, "rgba(228, 190, 106, 0)");
        ctx.fillStyle = grad;
        ctx.fill();

        // Redraw the stroke path for first line
        ctx.beginPath();
        for (let px = 0; px <= steps; px++) {
          const nx = px / w;
          const y =
            baseY +
            Math.sin(nx * 6 + t * speed + scroll + i * 0.5) * amp +
            Math.sin(nx * 12 + t * speed * 0.7 + i * 0.3) * amp * 0.25 +
            Math.cos(nx * 3 - t * speed * 0.5 + i * 0.2) * amp * 0.15;

          if (px === 0) {
            ctx.moveTo(px, y);
          } else {
            ctx.lineTo(px, y);
          }
        }
      }

      ctx.strokeStyle = `rgba(228, 190, 106, ${alpha})`;
      ctx.lineWidth = Math.max(lineWidth, 0.4);
      ctx.stroke();

      // Draw glow dots at wave peaks — only for the first 3 lines
      if (i < 3) {
        const dotAlpha = 0.6 - progress * 0.4;
        const dotStep = Math.floor(w / 12);

        for (let px = 0; px <= w; px += dotStep) {
          // Derivative check for local max: compare y with neighbors
          const nx = px / w;
          const nxL = Math.max(0, (px - 3)) / w;
          const nxR = Math.min(w, px + 3) / w;

          const calcY = (nv: number) =>
            baseY +
            Math.sin(nv * 6 + t * speed + scroll + i * 0.5) * amp +
            Math.sin(nv * 12 + t * speed * 0.7 + i * 0.3) * amp * 0.25 +
            Math.cos(nv * 3 - t * speed * 0.5 + i * 0.2) * amp * 0.15;

          const yC = calcY(nx);
          const yL = calcY(nxL);
          const yR = calcY(nxR);

          // A peak is where y is lower than neighbors (canvas y axis is inverted)
          if (yC <= yL && yC <= yR) {
            const glowRadius = 14 - i * 3;
            const radGrad = ctx.createRadialGradient(px, yC, 0, px, yC, glowRadius);
            radGrad.addColorStop(0, `rgba(228, 190, 106, ${dotAlpha})`);
            radGrad.addColorStop(0.4, `rgba(228, 190, 106, ${dotAlpha * 0.4})`);
            radGrad.addColorStop(1, "rgba(228, 190, 106, 0)");

            ctx.beginPath();
            ctx.arc(px, yC, glowRadius, 0, Math.PI * 2);
            ctx.fillStyle = radGrad;
            ctx.fill();
          }
        }
      }
    }
  }, [amplitude, speed, lines]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio ?? 1, 2);

    const resize = () => {
      const container = canvas.parentElement;
      if (!container) return;
      const w = container.clientWidth;
      const h = height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      const ctx = canvas.getContext("2d");
      if (ctx) ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });

    const handleScroll = () => {
      scrollRef.current = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    const loop = (timestamp: number) => {
      const delta = timestamp - lastFrameRef.current;
      if (delta >= 16) {
        lastFrameRef.current = timestamp;
        timeRef.current += 0.008;
        draw();
      }
      animRef.current = requestAnimationFrame(loop);
    };

    animRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [draw, height]);

  return (
    <div
      style={{
        position: "relative",
        zIndex: 2,
        overflow: "hidden",
        height: `${height}px`,
        width: "100%",
      }}
    >
      <canvas ref={canvasRef} />
    </div>
  );
}
