# Premium Animations & Visual Upgrade — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Добавить 8 премиум визуальных эффектов уровня Awwwards на сайт ВЕР СТРОЙ.

**Architecture:** Все эффекты реализуются через Framer Motion + CSS — без тяжёлых библиотек. Каждый эффект — отдельный утилитарный компонент-хук, который вставляется в существующие секции. Никаких изменений структуры — только добавление интерактивности и визуальной глубины.

**Tech Stack:** Framer Motion 12 (useScroll, useTransform, useSpring, useMotionValue), CSS custom properties, requestAnimationFrame.

---

## File Structure

**Новые файлы:**
- `src/hooks/useScrollProgress.ts` — хук для scroll-based анимаций (parallax, reveal)
- `src/hooks/useMagnetic.ts` — хук для магнитных кнопок
- `src/hooks/useTilt.ts` — хук для 3D-tilt на карточках
- `src/components/TextReveal.tsx` — компонент появления текста по словам
- `src/components/SectionTransition.tsx` — обёртка секции с parallax-эффектом
- `src/components/CountUp.tsx` — анимированный счётчик чисел
- `src/components/GradientMesh.tsx` — живой градиентный CSS-фон

**Модифицируемые файлы:**
- `src/components/Hero.tsx` — text reveal на заголовке, parallax на фоне
- `src/components/About.tsx` — section transition
- `src/components/Services.tsx` — section transition
- `src/components/Portfolio.tsx` — 3D tilt на карточках, image reveal
- `src/components/Stats.tsx` — count-up на числах, gradient mesh
- `src/components/Process.tsx` — section transition
- `src/components/Contacts.tsx` — magnetic button на CTA, section transition
- `src/app/page.tsx` — обёртка секций в SectionTransition
- `src/app/globals.css` — gradient mesh keyframes, усиление glow

---

### Task 1: Scroll Progress Hook + Section Transitions

**Files:**
- Create: `src/hooks/useScrollProgress.ts`
- Create: `src/components/SectionTransition.tsx`

- [ ] **Step 1: Create useScrollProgress hook**

Create `src/hooks/useScrollProgress.ts`:

```ts
"use client";

import { useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
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
    offset: offset as any,
  });

  const smoothProgress = springConfig
    ? useSpring(scrollYProgress, springConfig)
    : scrollYProgress;

  return { ref, progress: smoothProgress, rawProgress: scrollYProgress };
}
```

- [ ] **Step 2: Create SectionTransition component**

Create `src/components/SectionTransition.tsx`:

```tsx
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
```

- [ ] **Step 3: Wrap sections in SectionTransition in page.tsx**

Modify `src/app/page.tsx` — add import and wrap About, Services, Process, Stats:

```tsx
import SectionTransition from "@/components/SectionTransition";

// In JSX, wrap these sections (NOT Hero, Portfolio, Contacts, Footer):
<SectionTransition><About /></SectionTransition>
<SectionTransition><Services /></SectionTransition>
<SectionTransition><Process /></SectionTransition>
<SectionTransition><Stats /></SectionTransition>
```

Hero stays unwrapped (it's the first screen). Portfolio has its own complex animations. Contacts/Footer stay at bottom.

- [ ] **Step 4: Verify build**

```bash
cd "/Users/nikita/Desktop/ВЕР СТРОЙ САЙТ/verstroy-site" && npm run build
```

- [ ] **Step 5: Commit**

```bash
git add src/hooks/useScrollProgress.ts src/components/SectionTransition.tsx src/app/page.tsx
git commit -m "feat: add scroll-based section transitions with parallax"
```

---

### Task 2: Text Reveal Animation

**Files:**
- Create: `src/components/TextReveal.tsx`
- Modify: `src/components/Hero.tsx`

- [ ] **Step 1: Create TextReveal component**

Create `src/components/TextReveal.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  animate?: boolean;
}

export default function TextReveal({
  children,
  className = "",
  delay = 0,
  as = "span",
  animate = true,
}: TextRevealProps) {
  const words = children.split(" ");
  const Tag = motion[as] as any;

  return (
    <Tag className={className} aria-label={children}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em] last:mr-0">
          <motion.span
            className="inline-block"
            initial={animate ? { y: "110%", rotateX: 45 } : false}
            animate={animate ? { y: "0%", rotateX: 0 } : false}
            transition={{
              duration: 0.6,
              delay: delay + i * 0.06,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
```

- [ ] **Step 2: Apply TextReveal to Hero heading**

In `src/components/Hero.tsx`, find the current H1 with "ПРОСТОИТ" and "ВЕКА". Replace it with:

```tsx
import TextReveal from "./TextReveal";

// Replace the current h1 content. Keep the motion.h1 wrapper with fadeUp variant.
// Inside the h1, instead of plain spans:
<TextReveal
  as="span"
  className="block text-3xl leading-[1.08] sm:text-4xl lg:text-[3.5rem] xl:text-[4.25rem] font-extrabold uppercase tracking-tight text-white"
  delay={0.5}
>
  ПРОСТОИТ
</TextReveal>
<TextReveal
  as="span"
  className="block text-3xl leading-[1.08] sm:text-4xl lg:text-[3.5rem] xl:text-[4.25rem] font-extrabold uppercase tracking-tight text-accent"
  delay={0.7}
>
  ВЕКА
</TextReveal>
```

Remove the old h1 content but keep the motion.h1 container with its variants.

- [ ] **Step 3: Verify build**

```bash
cd "/Users/nikita/Desktop/ВЕР СТРОЙ САЙТ/verstroy-site" && npm run build
```

- [ ] **Step 4: Commit**

```bash
git add src/components/TextReveal.tsx src/components/Hero.tsx
git commit -m "feat: add word-by-word text reveal animation on Hero heading"
```

---

### Task 3: CountUp Animated Numbers

**Files:**
- Create: `src/components/CountUp.tsx`
- Modify: `src/components/Hero.tsx` (stats section)

- [ ] **Step 1: Create CountUp component**

Create `src/components/CountUp.tsx`:

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";

interface CountUpProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

export default function CountUp({
  end,
  duration = 2,
  suffix = "",
  prefix = "",
  className = "",
}: CountUpProps) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!inView || hasAnimated.current) return;
    hasAnimated.current = true;

    const startTime = performance.now();
    const step = (currentTime: number) => {
      const elapsed = (currentTime - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(step);
  }, [inView, end, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}{count}{suffix}
    </span>
  );
}
```

- [ ] **Step 2: Apply CountUp to Hero stats**

In `src/components/Hero.tsx`, find the stats grid (numbers like "6+", "150+", "22+", "25 000"). Replace the static text with CountUp:

```tsx
import CountUp from "./CountUp";

// Replace each stat number. Example for the 4 stats:
// "6+" → <CountUp end={6} suffix="+" duration={2} />
// "150+" → <CountUp end={150} suffix="+" duration={2.5} />
// "22+" → <CountUp end={22} suffix="+" duration={2} />
// "25 000" → <CountUp end={25000} suffix="" duration={3} />
```

For "25 000" — format with space separator. Update CountUp to handle this or format inline:
```tsx
// For 25000, format with space:
<CountUp end={25} suffix={" 000"} duration={2.5} />
```

- [ ] **Step 3: Verify build**

```bash
cd "/Users/nikita/Desktop/ВЕР СТРОЙ САЙТ/verstroy-site" && npm run build
```

- [ ] **Step 4: Commit**

```bash
git add src/components/CountUp.tsx src/components/Hero.tsx
git commit -m "feat: add animated count-up numbers in Hero stats"
```

---

### Task 4: 3D Tilt on Portfolio Cards

**Files:**
- Create: `src/hooks/useTilt.ts`
- Modify: `src/components/Portfolio.tsx`

- [ ] **Step 1: Create useTilt hook**

Create `src/hooks/useTilt.ts`:

```ts
"use client";

import { useRef, useCallback } from "react";

interface TiltOptions {
  max?: number; // max tilt degrees
  scale?: number; // scale on hover
  speed?: number; // transition speed ms
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
```

- [ ] **Step 2: Apply useTilt to Portfolio project cards**

In `src/components/Portfolio.tsx`, find the `motion.div` that wraps each project card (inside the `filteredProjects.map`). This is the card with `onClick={() => openGallery(project)}`.

Add the tilt effect. Import the hook and wrap the card:

```tsx
import { useTilt } from "@/hooks/useTilt";

// Inside the map, create a wrapper component or apply inline:
// Since hooks can't be called inside map, create a small wrapper:
function TiltCard({ children, onClick, className }: { children: React.ReactNode; onClick: () => void; className?: string }) {
  const tilt = useTilt({ max: 6, scale: 1.03, speed: 500 });
  return (
    <div
      ref={tilt.ref}
      onClick={onClick}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
      style={tilt.style}
      className={className}
    >
      {children}
    </div>
  );
}
```

Replace the outer `motion.div` of each project card with this `TiltCard`, keeping the motion props on an inner element if needed for AnimatePresence layout animations.

- [ ] **Step 3: Verify build**

```bash
cd "/Users/nikita/Desktop/ВЕР СТРОЙ САЙТ/verstroy-site" && npm run build
```

- [ ] **Step 4: Commit**

```bash
git add src/hooks/useTilt.ts src/components/Portfolio.tsx
git commit -m "feat: add 3D tilt effect on portfolio project cards"
```

---

### Task 5: Magnetic CTA Buttons

**Files:**
- Create: `src/hooks/useMagnetic.ts`
- Modify: `src/components/Hero.tsx`
- Modify: `src/components/Contacts.tsx`

- [ ] **Step 1: Create useMagnetic hook**

Create `src/hooks/useMagnetic.ts`:

```ts
"use client";

import { useRef, useCallback } from "react";

interface MagneticOptions {
  strength?: number;
}

export function useMagnetic({ strength = 0.3 }: MagneticOptions = {}) {
  const ref = useRef<HTMLElement>(null);

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
```

- [ ] **Step 2: Apply magnetic to Hero CTA buttons**

In `src/components/Hero.tsx`, find the two CTA buttons ("Обсудить проект" and the secondary button). Wrap each in a container div that uses useMagnetic:

```tsx
import { useMagnetic } from "@/hooks/useMagnetic";

// Create a MagneticButton wrapper used inside Hero:
function MagneticWrap({ children }: { children: React.ReactNode }) {
  const mag = useMagnetic({ strength: 0.25 });
  return (
    <div
      ref={mag.ref as any}
      onMouseMove={mag.onMouseMove}
      onMouseLeave={mag.onMouseLeave}
      style={mag.style}
      className="inline-block"
    >
      {children}
    </div>
  );
}

// Wrap the CTA buttons:
<MagneticWrap><a href="#contacts" ...>Обсудить проект</a></MagneticWrap>
```

- [ ] **Step 3: Apply magnetic to Contacts submit button**

Same pattern in `src/components/Contacts.tsx` — wrap the form submit button in MagneticWrap.

- [ ] **Step 4: Verify build**

```bash
cd "/Users/nikita/Desktop/ВЕР СТРОЙ САЙТ/verstroy-site" && npm run build
```

- [ ] **Step 5: Commit**

```bash
git add src/hooks/useMagnetic.ts src/components/Hero.tsx src/components/Contacts.tsx
git commit -m "feat: add magnetic effect to CTA buttons"
```

---

### Task 6: Gradient Mesh Background

**Files:**
- Create: `src/components/GradientMesh.tsx`
- Modify: `src/components/Stats.tsx`
- Modify: `src/app/globals.css`

- [ ] **Step 1: Add gradient mesh keyframes to globals.css**

In `src/app/globals.css`, add after the existing body styles:

```css
@keyframes meshMove1 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  25% { transform: translate(5%, 10%) scale(1.1); }
  50% { transform: translate(-5%, 5%) scale(0.95); }
  75% { transform: translate(3%, -8%) scale(1.05); }
}

@keyframes meshMove2 {
  0%, 100% { transform: translate(0, 0) scale(1.05); }
  33% { transform: translate(-8%, 5%) scale(1); }
  66% { transform: translate(5%, -10%) scale(1.1); }
}

@keyframes meshMove3 {
  0%, 100% { transform: translate(0, 0) scale(0.95); }
  50% { transform: translate(10%, -5%) scale(1.05); }
}
```

- [ ] **Step 2: Create GradientMesh component**

Create `src/components/GradientMesh.tsx`:

```tsx
"use client";

export default function GradientMesh() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      <div
        className="absolute w-[60%] h-[60%] rounded-full blur-[120px] opacity-[0.07]"
        style={{
          background: "radial-gradient(circle, #D4A843, transparent 70%)",
          top: "10%",
          left: "20%",
          animation: "meshMove1 20s ease-in-out infinite",
        }}
      />
      <div
        className="absolute w-[50%] h-[50%] rounded-full blur-[100px] opacity-[0.05]"
        style={{
          background: "radial-gradient(circle, #1B2A4A, transparent 70%)",
          bottom: "10%",
          right: "10%",
          animation: "meshMove2 25s ease-in-out infinite",
        }}
      />
      <div
        className="absolute w-[40%] h-[40%] rounded-full blur-[80px] opacity-[0.04]"
        style={{
          background: "radial-gradient(circle, #E4BE6A, transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          animation: "meshMove3 30s ease-in-out infinite",
        }}
      />
    </div>
  );
}
```

- [ ] **Step 3: Add GradientMesh to Stats section**

In `src/components/Stats.tsx`, import and add GradientMesh right after the opening `<section>` tag, before the existing decorative elements:

```tsx
import GradientMesh from "./GradientMesh";

// Inside section, first child:
<GradientMesh />
```

- [ ] **Step 4: Boost the body glow in globals.css**

In `src/app/globals.css`, change the body background-image:

```css
body {
  background-image:
    radial-gradient(ellipse 80% 50% at 50% 0%, rgba(212, 168, 67, 0.12), transparent 60%),
    radial-gradient(ellipse 40% 30% at 0% 100%, rgba(27, 42, 74, 0.5), transparent 50%);
}
```

- [ ] **Step 5: Verify build**

```bash
cd "/Users/nikita/Desktop/ВЕР СТРОЙ САЙТ/verstroy-site" && npm run build
```

- [ ] **Step 6: Commit**

```bash
git add src/components/GradientMesh.tsx src/components/Stats.tsx src/app/globals.css
git commit -m "feat: add living gradient mesh background to Stats + boost body glow"
```

---

### Task 7: Hero Parallax Background

**Files:**
- Modify: `src/components/Hero.tsx`

- [ ] **Step 1: Add scroll-based parallax to Hero background**

In `src/components/Hero.tsx`, add parallax to the video/image background using Framer Motion useScroll and useTransform.

At the top of the Hero component function, add:

```tsx
import { useScroll, useTransform } from "framer-motion";

// Inside Hero component:
const { scrollY } = useScroll();
const bgY = useTransform(scrollY, [0, 800], [0, 200]);
const bgScale = useTransform(scrollY, [0, 800], [1, 1.15]);
const overlayOpacity = useTransform(scrollY, [0, 600], [0.6, 0.9]);
```

Then wrap the background video and image in a `motion.div`:

```tsx
<motion.div style={{ y: bgY, scale: bgScale }} className="absolute inset-0">
  {/* existing video and Image elements */}
</motion.div>
```

And make one of the overlay divs use `overlayOpacity`:

```tsx
<motion.div style={{ opacity: overlayOpacity }} className="absolute inset-0 bg-gradient-to-t from-bg-dark via-bg-dark/20 to-black/30" />
```

- [ ] **Step 2: Verify build**

```bash
cd "/Users/nikita/Desktop/ВЕР СТРОЙ САЙТ/verstroy-site" && npm run build
```

- [ ] **Step 3: Commit**

```bash
git add src/components/Hero.tsx
git commit -m "feat: add parallax scrolling effect to Hero background"
```

---

### Task 8: Final Polish — globals.css + minor fixes

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/components/Services.tsx` — hover speed 700ms → 300ms
- Modify: `src/components/Contacts.tsx` — border-white/10 → border-white/20 on form inputs

- [ ] **Step 1: Fix Services hover speed**

In `src/components/Services.tsx`, find `duration-700` on the gold underline and change to `duration-300`.

- [ ] **Step 2: Fix Contacts form border visibility**

In `src/components/Contacts.tsx`, find `border-white/10` on form input fields and change to `border-white/20`.

- [ ] **Step 3: Add smooth scroll-snap hints to globals.css**

In `src/app/globals.css`, add:

```css
/* Smooth transitions between sections */
section {
  will-change: transform, opacity;
}

/* Better focus for accessibility */
:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 4px;
  border-radius: 2px;
}
```

- [ ] **Step 4: Verify full build**

```bash
cd "/Users/nikita/Desktop/ВЕР СТРОЙ САЙТ/verstroy-site" && npm run build
```

- [ ] **Step 5: Commit all polish**

```bash
git add src/components/Services.tsx src/components/Contacts.tsx src/app/globals.css
git commit -m "fix: polish hover speeds, form visibility, CSS improvements"
```
