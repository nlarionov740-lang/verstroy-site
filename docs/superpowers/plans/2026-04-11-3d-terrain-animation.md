# 3D Terrain Animation — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add animated 3D wireframe terrain background and section dividers to the ВЕР СТРОЙ homepage.

**Architecture:** A fixed-position Three.js Canvas renders a wireframe PlaneGeometry with vertex displacement via simplex noise. The terrain responds to mouse position and scroll. Between sections, Canvas 2D dividers draw animated mountain ridges. Both components are added to the existing page without modifying any current section components.

**Tech Stack:** Three.js, @react-three/fiber, @react-three/drei, simplex-noise, Canvas 2D API

**Spec:** `docs/superpowers/specs/2026-04-11-3d-terrain-animation-design.md`

---

### Task 1: Install dependencies

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install Three.js ecosystem + simplex-noise**

```bash
cd "/Users/nikita/Desktop/ВЕР СТРОЙ САЙТ/verstroy-site"
npm install three @react-three/fiber @react-three/drei simplex-noise
npm install -D @types/three
```

Expected: packages added to `dependencies` in package.json, no errors.

- [ ] **Step 2: Verify build still works**

```bash
cd "/Users/nikita/Desktop/ВЕР СТРОЙ САЙТ/verstroy-site"
npm run build
```

Expected: Build succeeds with no errors.

- [ ] **Step 3: Commit**

```bash
cd "/Users/nikita/Desktop/ВЕР СТРОЙ САЙТ/verstroy-site"
git add package.json package-lock.json
git commit -m "deps: add three.js, react-three-fiber, drei, simplex-noise"
```

---

### Task 2: Create TerrainBackground component

**Files:**
- Create: `src/components/TerrainBackground.tsx`

This is the main 3D component — a fixed full-viewport Canvas with an animated wireframe terrain.

- [ ] **Step 1: Create the terrain mesh sub-component**

Create `src/components/TerrainBackground.tsx` with the full component. The file has two parts: the inner `TerrainMesh` (runs inside R3F Canvas) and the outer `TerrainBackground` wrapper.

```tsx
"use client";

import { useRef, useMemo, useCallback, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { createNoise3D } from "simplex-noise";
import * as THREE from "three";

// ── Constants ──
const DESKTOP_SEGMENTS_X = 80;
const DESKTOP_SEGMENTS_Y = 50;
const MOBILE_SEGMENTS_X = 30;
const MOBILE_SEGMENTS_Y = 20;
const PLANE_WIDTH = 28;
const PLANE_HEIGHT = 18;
const WAVE_AMPLITUDE = 1.2;
const WAVE_SPEED = 0.3;
const MOUSE_RADIUS = 5;
const MOUSE_LIFT = 0.8;
const GLOW_THRESHOLD = 0.6;

// ── Terrain Mesh (inside Canvas) ──
function TerrainMesh({ isMobile }: { isMobile: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const pointsRef = useRef<THREE.Points>(null);
  const noise3D = useMemo(() => createNoise3D(), []);
  const mouseWorld = useRef(new THREE.Vector3(0, 0, 0));
  const scrollPhase = useRef(0);
  const planeRef = useRef<THREE.PlaneGeometry>(null);

  const segX = isMobile ? MOBILE_SEGMENTS_X : DESKTOP_SEGMENTS_X;
  const segY = isMobile ? MOBILE_SEGMENTS_Y : DESKTOP_SEGMENTS_Y;

  // Track scroll
  useEffect(() => {
    const onScroll = () => {
      scrollPhase.current = window.scrollY * 0.001;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Mouse tracking via pointer on the invisible plane
  const { viewport } = useThree();
  const onPointerMove = useCallback(
    (e: THREE.Event<PointerEvent>) => {
      if (isMobile) return;
      const intersect = e as unknown as { point: THREE.Vector3 };
      if (intersect.point) {
        mouseWorld.current.copy(intersect.point);
      }
    },
    [isMobile]
  );

  // Glow points buffer
  const glowPositions = useMemo(() => {
    const count = Math.floor(((segX + 1) * (segY + 1)) / 12);
    return new Float32Array(count * 3);
  }, [segX, segY]);

  const glowColors = useMemo(() => {
    const count = Math.floor(((segX + 1) * (segY + 1)) / 12);
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = 0.894;     // R of #E4BE6A
      arr[i * 3 + 1] = 0.745; // G
      arr[i * 3 + 2] = 0.416; // B
    }
    return arr;
  }, [segX, segY]);

  const glowSizes = useMemo(() => {
    const count = Math.floor(((segX + 1) * (segY + 1)) / 12);
    return new Float32Array(count);
  }, [segX, segY]);

  // Animation loop
  useFrame((state) => {
    if (!meshRef.current) return;
    const geometry = meshRef.current.geometry as THREE.PlaneGeometry;
    const positions = geometry.attributes.position;
    const time = state.clock.elapsedTime * WAVE_SPEED;
    const scroll = scrollPhase.current;

    let glowIdx = 0;
    const maxGlow = glowSizes.length;

    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i);
      const y = positions.getY(i);

      // Simplex noise displacement
      const nx = x * 0.15;
      const ny = y * 0.15;
      let z =
        noise3D(nx, ny, time) * WAVE_AMPLITUDE +
        noise3D(nx * 2, ny * 2, time * 0.7) * WAVE_AMPLITUDE * 0.3 +
        Math.sin(nx * 2 + scroll) * Math.cos(ny * 1.5 + scroll * 0.7) * WAVE_AMPLITUDE * 0.4;

      // Mouse influence (desktop only)
      if (!isMobile) {
        const dx = x - mouseWorld.current.x;
        const dy = y - mouseWorld.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_RADIUS) {
          const influence = (1 - dist / MOUSE_RADIUS) ** 2;
          z += influence * MOUSE_LIFT;
        }
      }

      positions.setZ(i, z);

      // Collect glow points at peaks
      if (z > GLOW_THRESHOLD && glowIdx < maxGlow && i % 4 === 0) {
        glowPositions[glowIdx * 3] = x;
        glowPositions[glowIdx * 3 + 1] = y;
        glowPositions[glowIdx * 3 + 2] = z + 0.05;
        glowSizes[glowIdx] = Math.min((z - GLOW_THRESHOLD) * 8, 6);
        glowIdx++;
      }
    }

    positions.needsUpdate = true;

    // Update glow points
    if (pointsRef.current) {
      const pGeo = pointsRef.current.geometry;
      const pPos = pGeo.attributes.position as THREE.BufferAttribute;
      (pPos.array as Float32Array).set(glowPositions);
      pPos.needsUpdate = true;
      const pSize = pGeo.attributes.size as THREE.BufferAttribute;
      (pSize.array as Float32Array).set(glowSizes);
      pSize.needsUpdate = true;

      // Hide unused points
      for (let j = glowIdx; j < maxGlow; j++) {
        glowSizes[j] = 0;
      }
    }
  });

  const glowCount = Math.floor(((segX + 1) * (segY + 1)) / 12);

  return (
    <group rotation={[-Math.PI * 0.35, 0, 0]} position={[0, 2, 0]}>
      {/* Main wireframe terrain */}
      <mesh
        ref={meshRef}
        onPointerMove={onPointerMove}
      >
        <planeGeometry ref={planeRef} args={[PLANE_WIDTH, PLANE_HEIGHT, segX, segY]} />
        <meshBasicMaterial
          wireframe
          color="#E4BE6A"
          transparent
          opacity={0.35}
          depthWrite={false}
        />
      </mesh>

      {/* Secondary wireframe layer — bluer, subtler */}
      <mesh position={[0, 0, -0.3]}>
        <planeGeometry args={[PLANE_WIDTH, PLANE_HEIGHT, Math.floor(segX / 2), Math.floor(segY / 2)]} />
        <meshBasicMaterial
          wireframe
          color="#243558"
          transparent
          opacity={0.15}
          depthWrite={false}
        />
      </mesh>

      {/* Glow points at peaks */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={glowCount}
            array={glowPositions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={glowCount}
            array={glowColors}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-size"
            count={glowCount}
            array={glowSizes}
            itemSize={1}
          />
        </bufferGeometry>
        <pointsMaterial
          vertexColors
          transparent
          opacity={0.6}
          size={0.15}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

// ── Outer Wrapper ──
export default function TerrainBackground() {
  const [isMobile, setIsMobile] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // WebGL availability check
  useEffect(() => {
    try {
      const c = document.createElement("canvas");
      const gl = c.getContext("webgl2") || c.getContext("webgl");
      if (!gl) setVisible(false);
    } catch {
      setVisible(false);
    }
  }, []);

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
      }}
    >
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 12], fov: 35 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent", pointerEvents: "auto" }}
      >
        <TerrainMesh isMobile={isMobile} />
      </Canvas>
    </div>
  );
}
```

- [ ] **Step 2: Verify the file compiles**

```bash
cd "/Users/nikita/Desktop/ВЕР СТРОЙ САЙТ/verstroy-site"
npx tsc --noEmit src/components/TerrainBackground.tsx 2>&1 | head -20
```

If there are type errors, fix them. Common issues: `THREE.Event` type — use `any` for the pointer event if needed.

- [ ] **Step 3: Commit**

```bash
cd "/Users/nikita/Desktop/ВЕР СТРОЙ САЙТ/verstroy-site"
git add src/components/TerrainBackground.tsx
git commit -m "feat: add TerrainBackground 3D wireframe component"
```

---

### Task 3: Create TerrainDivider component

**Files:**
- Create: `src/components/TerrainDivider.tsx`

Canvas 2D component that draws animated mountain ridges between sections.

- [ ] **Step 1: Create the divider component**

```tsx
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
  const timeRef = useRef(0);
  const scrollRef = useRef(0);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    const scroll = scrollRef.current * 0.002;
    const t = timeRef.current;

    for (let i = 0; i < lines; i++) {
      const progress = i / lines;
      const baseY = h * 0.25 + progress * h * 0.55;
      const amp = amplitude * (1 - progress * 0.5);
      const alpha = 0.2 + (1 - progress) * 0.5;
      const lineWidth = 2 - progress * 1.2;

      ctx.beginPath();
      ctx.strokeStyle = `rgba(228, 190, 106, ${alpha})`;
      ctx.lineWidth = Math.max(lineWidth, 0.4);

      for (let x = 0; x <= w; x += 3) {
        const nx = x / w;
        const y =
          baseY +
          Math.sin(nx * 6 + t * speed + scroll + i * 0.5) * amp +
          Math.sin(nx * 12 + t * speed * 0.7 + i * 0.3) * amp * 0.25 +
          Math.cos(nx * 3 - t * speed * 0.5 + i * 0.2) * amp * 0.15;

        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Fill below first line with gradient
      if (i === 0) {
        ctx.lineTo(w, h);
        ctx.lineTo(0, h);
        ctx.closePath();
        const grad = ctx.createLinearGradient(0, baseY - amp, 0, h);
        grad.addColorStop(0, "rgba(228, 190, 106, 0.08)");
        grad.addColorStop(1, "rgba(228, 190, 106, 0)");
        ctx.fillStyle = grad;
        ctx.fill();
      }
    }

    // Glow dots on peaks of first line
    for (let x = 0; x <= w; x += 50) {
      const nx = x / w;
      const y =
        h * 0.25 +
        Math.sin(nx * 6 + t * speed + scroll) * amplitude +
        Math.sin(nx * 12 + t * speed * 0.7) * amplitude * 0.25 +
        Math.cos(nx * 3 - t * speed * 0.5) * amplitude * 0.15;

      const peakLine = h * 0.25 - amplitude * 0.4;
      if (y < peakLine + 25) {
        const glowAlpha = Math.max(0, (peakLine + 25 - y) / 30) * 0.6;
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, 14);
        gradient.addColorStop(0, `rgba(228, 190, 106, ${glowAlpha})`);
        gradient.addColorStop(1, "rgba(228, 190, 106, 0)");
        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(x, y, 14, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }, [amplitude, speed, lines]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth * Math.min(window.devicePixelRatio, 2);
      canvas.height = canvas.offsetHeight * Math.min(window.devicePixelRatio, 2);
    };

    const onScroll = () => {
      scrollRef.current = window.scrollY;
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", onScroll, { passive: true });

    let lastTime = 0;
    const loop = (timestamp: number) => {
      const delta = timestamp - lastTime;
      if (delta > 16) {
        // ~60fps cap
        timeRef.current += 0.008;
        draw();
        lastTime = timestamp;
      }
      animRef.current = requestAnimationFrame(loop);
    };

    animRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
    };
  }, [draw]);

  return (
    <div
      style={{ position: "relative", zIndex: 2, height, overflow: "hidden" }}
    >
      <canvas
        ref={canvasRef}
        style={{ width: "100%", height: "100%", display: "block" }}
      />
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
cd "/Users/nikita/Desktop/ВЕР СТРОЙ САЙТ/verstroy-site"
git add src/components/TerrainDivider.tsx
git commit -m "feat: add TerrainDivider animated mountain ridge component"
```

---

### Task 4: Integrate into page.tsx

**Files:**
- Modify: `src/app/page.tsx`

Add TerrainBackground as a fixed layer and TerrainDivider between sections.

- [ ] **Step 1: Update page.tsx**

The page is currently a server component (no "use client" directive). Since TerrainBackground and TerrainDivider are client components with "use client", they can be imported directly into a server component without issues.

Replace the entire content of `src/app/page.tsx`:

```tsx
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Process from "@/components/Process";
import Stats from "@/components/Stats";
import Contacts from "@/components/Contacts";
import Footer from "@/components/Footer";
import TerrainBackground from "@/components/TerrainBackground";
import TerrainDivider from "@/components/TerrainDivider";

export default function Home() {
  return (
    <>
      <TerrainBackground />
      <Header />
      <main>
        <Hero />
        <TerrainDivider amplitude={45} speed={0.4} lines={8} height={180} />
        <About />
        <TerrainDivider amplitude={35} speed={0.35} lines={6} height={150} />
        <Services />
        <TerrainDivider amplitude={40} speed={0.3} lines={7} height={160} />
        <Portfolio />
        <TerrainDivider amplitude={38} speed={0.45} lines={6} height={150} />
        <Process />
        <TerrainDivider amplitude={35} speed={0.35} lines={5} height={140} />
        <Stats />
        <TerrainDivider amplitude={42} speed={0.4} lines={7} height={170} />
        <Contacts />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 2: Commit**

```bash
cd "/Users/nikita/Desktop/ВЕР СТРОЙ САЙТ/verstroy-site"
git add src/app/page.tsx
git commit -m "feat: integrate TerrainBackground and TerrainDivider into homepage"
```

---

### Task 5: Build & visual verification

**Files:**
- Possibly modify: `src/components/TerrainBackground.tsx`, `src/components/TerrainDivider.tsx` (fixes)

- [ ] **Step 1: Run build to catch errors**

```bash
cd "/Users/nikita/Desktop/ВЕР СТРОЙ САЙТ/verstroy-site"
npm run build
```

Expected: Build succeeds. If there are type errors or import issues, fix them.

- [ ] **Step 2: Run dev server and verify visually**

```bash
cd "/Users/nikita/Desktop/ВЕР СТРОЙ САЙТ/verstroy-site"
npm run dev
```

Open http://localhost:3000 in browser. Verify:
1. 3D wireframe terrain visible behind page content
2. Gold lines are bright and visible (#E4BE6A)
3. Terrain responds to mouse movement (desktop)
4. Terrain wave phase changes on scroll
5. Mountain ridge dividers visible between each section pair
6. Divider glow dots appear on peaks
7. All existing content (Hero, About, Services, etc.) still readable
8. No console errors

- [ ] **Step 3: Fix any visual issues found**

Common adjustments:
- If terrain too dim: increase `opacity` in meshBasicMaterial (e.g., 0.35 → 0.5)
- If terrain covers content: check z-index on section containers
- If mouse interaction not working: verify `pointerEvents: "auto"` on Canvas style
- If too slow on mobile: reduce segment count further

- [ ] **Step 4: Commit fixes**

```bash
cd "/Users/nikita/Desktop/ВЕР СТРОЙ САЙТ/verstroy-site"
git add -A
git commit -m "fix: adjust terrain visual parameters after testing"
```

---

### Task 6: Performance fallback

**Files:**
- Modify: `src/components/TerrainBackground.tsx`

Add FPS monitoring — if performance is bad, hide the 3D canvas.

- [ ] **Step 1: Add PerformanceMonitor from drei**

In `TerrainBackground.tsx`, add performance monitoring inside the Canvas:

Import `PerformanceMonitor` from `@react-three/drei` at top of file:

```tsx
import { PerformanceMonitor } from "@react-three/drei";
```

Inside the `TerrainBackground` component, add state and pass to Canvas:

```tsx
const [degraded, setDegraded] = useState(false);
```

Inside the `<Canvas>` component, add as first child:

```tsx
<PerformanceMonitor
  onDecline={() => setDegraded(true)}
  onIncline={() => setDegraded(false)}
/>
```

When `degraded` is true, reduce the plane segments:

Pass `degraded` to `TerrainMesh` and use lower segment count:

```tsx
const segX = isMobile ? MOBILE_SEGMENTS_X : degraded ? 40 : DESKTOP_SEGMENTS_X;
const segY = isMobile ? MOBILE_SEGMENTS_Y : degraded ? 25 : DESKTOP_SEGMENTS_Y;
```

- [ ] **Step 2: Commit**

```bash
cd "/Users/nikita/Desktop/ВЕР СТРОЙ САЙТ/verstroy-site"
git add src/components/TerrainBackground.tsx
git commit -m "perf: add GPU performance monitoring with auto-degradation"
```

---

### Task 7: Final build & commit

- [ ] **Step 1: Full production build**

```bash
cd "/Users/nikita/Desktop/ВЕР СТРОЙ САЙТ/verstroy-site"
npm run build
```

Expected: Build succeeds with no errors or warnings.

- [ ] **Step 2: Final commit if any remaining changes**

```bash
cd "/Users/nikita/Desktop/ВЕР СТРОЙ САЙТ/verstroy-site"
git status
# If changes exist:
git add -A
git commit -m "feat: complete 3D terrain animation implementation"
```
