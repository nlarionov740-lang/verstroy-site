"use client";

import { useEffect, useRef } from "react";

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    // ─── Draw functions for construction icons ────────────────────────

    function drawCrane(ctx: CanvasRenderingContext2D, size: number) {
      const s = size;
      ctx.beginPath();
      // Vertical mast
      ctx.moveTo(0, s * 0.5);
      ctx.lineTo(0, -s * 0.4);
      // Horizontal jib
      ctx.moveTo(-s * 0.15, -s * 0.4);
      ctx.lineTo(s * 0.5, -s * 0.4);
      // Counter-jib
      ctx.moveTo(0, -s * 0.4);
      ctx.lineTo(-s * 0.25, -s * 0.4);
      // Cable from jib tip
      ctx.moveTo(s * 0.4, -s * 0.4);
      ctx.lineTo(s * 0.4, -s * 0.1);
      // Hook
      ctx.moveTo(s * 0.35, -s * 0.1);
      ctx.lineTo(s * 0.45, -s * 0.1);
      // Support wire to top
      ctx.moveTo(0, -s * 0.5);
      ctx.lineTo(s * 0.5, -s * 0.4);
      ctx.moveTo(0, -s * 0.5);
      ctx.lineTo(-s * 0.25, -s * 0.4);
      // Base
      ctx.moveTo(-s * 0.15, s * 0.5);
      ctx.lineTo(s * 0.15, s * 0.5);
      ctx.stroke();
    }

    function drawMixer(ctx: CanvasRenderingContext2D, size: number) {
      const s = size;
      // Truck body
      ctx.beginPath();
      ctx.rect(-s * 0.4, s * 0.1, s * 0.8, s * 0.2);
      ctx.stroke();
      // Drum (ellipse)
      ctx.beginPath();
      ctx.ellipse(0, -s * 0.1, s * 0.3, s * 0.22, -0.2, 0, Math.PI * 2);
      ctx.stroke();
      // Drum stripes
      ctx.beginPath();
      ctx.moveTo(-s * 0.15, -s * 0.25);
      ctx.lineTo(s * 0.1, s * 0.05);
      ctx.moveTo(s * 0.05, -s * 0.28);
      ctx.lineTo(s * 0.25, 0);
      ctx.stroke();
      // Wheels
      ctx.beginPath();
      ctx.arc(-s * 0.25, s * 0.35, s * 0.06, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(s * 0.25, s * 0.35, s * 0.06, 0, Math.PI * 2);
      ctx.stroke();
    }

    function drawBrick(ctx: CanvasRenderingContext2D, size: number) {
      const s = size;
      // 3D brick
      ctx.beginPath();
      // Front face
      ctx.rect(-s * 0.3, -s * 0.1, s * 0.5, s * 0.25);
      ctx.stroke();
      // Top face
      ctx.beginPath();
      ctx.moveTo(-s * 0.3, -s * 0.1);
      ctx.lineTo(-s * 0.15, -s * 0.22);
      ctx.lineTo(s * 0.35, -s * 0.22);
      ctx.lineTo(s * 0.2, -s * 0.1);
      ctx.stroke();
      // Right face
      ctx.beginPath();
      ctx.moveTo(s * 0.2, -s * 0.1);
      ctx.lineTo(s * 0.35, -s * 0.22);
      ctx.lineTo(s * 0.35, s * 0.03);
      ctx.lineTo(s * 0.2, s * 0.15);
      ctx.stroke();
      // Mortar line
      ctx.beginPath();
      ctx.moveTo(-s * 0.05, -s * 0.1);
      ctx.lineTo(-s * 0.05, s * 0.15);
      ctx.stroke();
    }

    function drawHammer(ctx: CanvasRenderingContext2D, size: number) {
      const s = size;
      // Handle
      ctx.beginPath();
      ctx.moveTo(0, s * 0.4);
      ctx.lineTo(0, -s * 0.15);
      ctx.stroke();
      // Head
      ctx.beginPath();
      ctx.rect(-s * 0.2, -s * 0.3, s * 0.4, s * 0.15);
      ctx.stroke();
      // Claw
      ctx.beginPath();
      ctx.moveTo(-s * 0.2, -s * 0.3);
      ctx.lineTo(-s * 0.28, -s * 0.42);
      ctx.moveTo(-s * 0.2, -s * 0.3);
      ctx.lineTo(-s * 0.12, -s * 0.4);
      ctx.stroke();
    }

    function drawHelmet(ctx: CanvasRenderingContext2D, size: number) {
      const s = size;
      // Dome
      ctx.beginPath();
      ctx.arc(0, 0, s * 0.25, Math.PI, 0);
      ctx.stroke();
      // Brim
      ctx.beginPath();
      ctx.moveTo(-s * 0.35, 0);
      ctx.lineTo(s * 0.35, 0);
      ctx.stroke();
      // Ridge on top
      ctx.beginPath();
      ctx.moveTo(-s * 0.08, -s * 0.25);
      ctx.lineTo(s * 0.08, -s * 0.25);
      ctx.stroke();
    }

    function drawWrench(ctx: CanvasRenderingContext2D, size: number) {
      const s = size;
      // Handle
      ctx.beginPath();
      ctx.moveTo(0, s * 0.35);
      ctx.lineTo(0, -s * 0.1);
      ctx.stroke();
      // Head — open jaw
      ctx.beginPath();
      ctx.moveTo(-s * 0.12, -s * 0.1);
      ctx.lineTo(-s * 0.12, -s * 0.35);
      ctx.lineTo(-s * 0.05, -s * 0.35);
      ctx.moveTo(s * 0.12, -s * 0.1);
      ctx.lineTo(s * 0.12, -s * 0.35);
      ctx.lineTo(s * 0.05, -s * 0.35);
      ctx.stroke();
      // Connect to handle
      ctx.beginPath();
      ctx.moveTo(-s * 0.12, -s * 0.1);
      ctx.lineTo(0, -s * 0.1);
      ctx.lineTo(s * 0.12, -s * 0.1);
      ctx.stroke();
    }

    function drawExcavator(ctx: CanvasRenderingContext2D, size: number) {
      const s = size;
      // Tracks
      ctx.beginPath();
      ctx.roundRect(-s * 0.35, s * 0.15, s * 0.7, s * 0.12, 4);
      ctx.stroke();
      // Body
      ctx.beginPath();
      ctx.rect(-s * 0.25, -s * 0.05, s * 0.4, s * 0.22);
      ctx.stroke();
      // Cabin
      ctx.beginPath();
      ctx.rect(-s * 0.22, -s * 0.2, s * 0.2, s * 0.18);
      ctx.stroke();
      // Arm
      ctx.beginPath();
      ctx.moveTo(s * 0.05, -s * 0.05);
      ctx.lineTo(s * 0.3, -s * 0.35);
      ctx.lineTo(s * 0.45, -s * 0.15);
      // Bucket
      ctx.lineTo(s * 0.38, -s * 0.05);
      ctx.lineTo(s * 0.5, -s * 0.05);
      ctx.stroke();
    }

    function drawTrowel(ctx: CanvasRenderingContext2D, size: number) {
      const s = size;
      // Handle
      ctx.beginPath();
      ctx.moveTo(0, s * 0.35);
      ctx.lineTo(0, s * 0.05);
      ctx.stroke();
      // Blade — triangle
      ctx.beginPath();
      ctx.moveTo(-s * 0.2, s * 0.05);
      ctx.lineTo(s * 0.2, s * 0.05);
      ctx.lineTo(0, -s * 0.35);
      ctx.closePath();
      ctx.stroke();
    }

    const drawFns = [
      drawCrane, drawMixer, drawBrick, drawHammer,
      drawHelmet, drawWrench, drawExcavator, drawTrowel,
    ];

    // ─── Create shapes ────────────────────────────────────────────────
    const SHAPE_COUNT = 14;
    const shapes: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      rotation: number;
      rotSpeed: number;
      drawFn: (ctx: CanvasRenderingContext2D, size: number) => void;
      alpha: number;
    }[] = [];

    for (let i = 0; i < SHAPE_COUNT; i++) {
      shapes.push({
        x: Math.random(),
        y: Math.random(),
        vx: (Math.random() - 0.5) * 0.0001,
        vy: (Math.random() - 0.5) * 0.0001,
        size: 30 + Math.random() * 40,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.002,
        drawFn: drawFns[i % drawFns.length],
        alpha: 0.07 + Math.random() * 0.05,
      });
    }

    // ─── Animation ────────────────────────────────────────────────────
    function draw() {
      ctx!.clearRect(0, 0, w, h);

      for (const s of shapes) {
        s.x += s.vx;
        s.y += s.vy;
        s.rotation += s.rotSpeed;

        if (s.x < -0.1) s.x = 1.1;
        if (s.x > 1.1) s.x = -0.1;
        if (s.y < -0.1) s.y = 1.1;
        if (s.y > 1.1) s.y = -0.1;

        ctx!.save();
        ctx!.translate(s.x * w, s.y * h);
        ctx!.rotate(s.rotation);
        ctx!.strokeStyle = `rgba(212, 168, 67, ${s.alpha})`;
        ctx!.lineWidth = 1;
        ctx!.lineCap = "round";
        ctx!.lineJoin = "round";
        s.drawFn(ctx!, s.size);
        ctx!.restore();
      }

      animRef.current = requestAnimationFrame(draw);
    }

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
