"use client";

import { useEffect, useRef } from "react";
import type { MotionValue } from "framer-motion";

interface Props {
  scrollProgress?: MotionValue<number>;
}

export default function WeldingSparks({ scrollProgress }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const isVisibleRef = useRef(true);
  const spawnMultiplierRef = useRef(scrollProgress ? 0 : 1);
  const emittersRef = useRef<Array<{ x: number; y: number }>>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0, h = 0;

    // Эмиттеры — координаты в долях от 0..1 (правая часть Hero)
    const computeEmitters = () => {
      const mobile = window.innerWidth < 768;
      emittersRef.current = mobile
        ? [
            { x: 0.5, y: 0.5 },
            { x: 0.8, y: 0.7 },
          ]
        : [
            { x: 0.55, y: 0.65 },
            { x: 0.72, y: 0.45 },
            { x: 0.88, y: 0.7 },
          ];
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      computeEmitters();
    };
    resize();
    window.addEventListener("resize", resize);

    const observer = new IntersectionObserver(
      ([entry]) => {
        const wasVisible = isVisibleRef.current;
        isVisibleRef.current = entry.isIntersecting;
        if (!wasVisible && entry.isIntersecting && !prefersReducedMotion) {
          animRef.current = requestAnimationFrame(draw);
        }
      },
      { threshold: 0 }
    );
    observer.observe(canvas);

    type Particle = {
      x: number; y: number;
      vx: number; vy: number;
      life: number; maxLife: number;
      size: number; gold: boolean;
    };

    const particles: Particle[] = [];
    let frame = 0;

    function spawn() {
      const emitters = emittersRef.current;
      const em = emitters[Math.floor(Math.random() * emitters.length)];
      const gold = Math.random() < 0.4;
      particles.push({
        x: em.x * w + (Math.random() - 0.5) * 10,
        y: em.y * h,
        vx: (Math.random() - 0.5) * 2.5,
        vy: -(1.5 + Math.random() * 3),
        life: 50 + Math.random() * 40,
        maxLife: 90,
        size: 1 + Math.random() * 1.5,
        gold,
      });
    }

    function draw() {
      if (!isVisibleRef.current || prefersReducedMotion) return;
      ctx!.clearRect(0, 0, w, h);

      // Спаун: каждые 2-3 кадра, с учётом scrollProgress (mobile)
      if (frame % 3 === 0 && Math.random() < spawnMultiplierRef.current) spawn();
      frame++;

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.08; // гравитация
        p.life--;

        if (p.life <= 0 || p.y > h + 20) {
          particles.splice(i, 1);
          continue;
        }

        const alpha = p.life / p.maxLife;
        const radius = p.size * (p.life / p.maxLife);

        ctx!.beginPath();
        ctx!.arc(p.x, p.y, Math.max(0.3, radius), 0, Math.PI * 2);
        ctx!.fillStyle = p.gold
          ? `rgba(212, 168, 67, ${alpha})`
          : `rgba(255, 255, 255, ${alpha * 0.8})`;
        ctx!.fill();

        // Glow для золотых
        if (p.gold && alpha > 0.3) {
          ctx!.beginPath();
          ctx!.arc(p.x, p.y, radius * 3, 0, Math.PI * 2);
          ctx!.fillStyle = `rgba(212, 168, 67, ${alpha * 0.1})`;
          ctx!.fill();
        }
      }

      animRef.current = requestAnimationFrame(draw);
    }

    if (!prefersReducedMotion) {
      animRef.current = requestAnimationFrame(draw);
    }

    // Подписка на scrollProgress (только если передан)
    let unsubscribe: (() => void) | undefined;
    if (scrollProgress) {
      unsubscribe = scrollProgress.on("change", (v) => {
        // 0..0.3 → 0, 0.3..0.6 → нарастает до 1, далее 1
        spawnMultiplierRef.current = Math.max(0, Math.min(1, (v - 0.3) / 0.3));
      });
    }

    return () => {
      cancelAnimationFrame(animRef.current);
      observer.disconnect();
      window.removeEventListener("resize", resize);
      unsubscribe?.();
    };
  }, [scrollProgress]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
