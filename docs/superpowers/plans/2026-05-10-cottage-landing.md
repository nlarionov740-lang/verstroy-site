# Cottage Landing Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Реализовать продающий лендинг `/cottage` для ВЕР СТРОЙ под рекламный трафик, продающий услугу строительства премиум-коттеджей частным заказчикам с нарративом «прочность торгового центра в вашем доме».

**Architecture:** Новая страница в Next.js App Router (`src/app/cottage/`) с 11 секциями. Стиль — инженерный blueprint (светлый фон, чертёжная сетка, sans-serif с жёлтым акцентом, моноширинные подписи). AI-фото генерируются через Nano Banana Pro / GPT Image 2 по подготовленным промптам. Калькулятор сметы — клиентский расчёт с pure-функцией + новый API-эндпоинт `/api/cottage/quote` для отправки детального расчёта на email и Telegram.

**Tech Stack:** Next.js 16 + React 19 + Tailwind 4 + Framer Motion 12 (всё уже стоит). Шрифты через `next/font/google`: Manrope (display), Inter (body — уже стоит Montserrat, оставляем как fallback пока), JetBrains Mono (mono). Без новых runtime-зависимостей.

**Spec:** [`docs/superpowers/specs/2026-05-10-cottage-landing-design.md`](../specs/2026-05-10-cottage-landing-design.md)

---

## File Structure

### Создаём новые файлы

| Путь | Ответственность |
|---|---|
| `src/app/cottage/page.tsx` | Композиция 11 секций, метаданные, JSON-LD |
| `src/app/cottage/layout.tsx` | Layout с импортом display-шрифта (если отличается от глобального) |
| `src/app/cottage/components/Hero.tsx` | Секция 01 — split hero |
| `src/app/cottage/components/Comparison.tsx` | Секция 02 — сравнение ТЦ↔коттедж |
| `src/app/cottage/components/InteractiveBlueprint.tsx` | Секция 03 — SVG-чертёж с интерактивными узлами |
| `src/app/cottage/components/StatsBar.tsx` | Секция 04 — тёмная полоса с метриками |
| `src/app/cottage/components/Principles.tsx` | Секция 05 — bento с 5 принципами |
| `src/app/cottage/components/ProcessTimeline.tsx` | Секция 06 — scroll-driven таймлайн |
| `src/app/cottage/components/PortfolioGrid.tsx` | Секция 07 — bento портфолио с фильтрами |
| `src/app/cottage/components/Calculator.tsx` | Секция 08 — UI калькулятора сметы |
| `src/app/cottage/components/Team.tsx` | Секция 09 — карточки прорабов |
| `src/app/cottage/components/FAQ.tsx` | Секция 10 — аккордеон + кнопка скачать договор |
| `src/app/cottage/components/CtaForm.tsx` | Секция 11 — финальная форма |
| `src/app/cottage/components/BlueprintGrid.tsx` | Переиспользуемый компонент чертёжной сетки |
| `src/app/cottage/components/SectionTag.tsx` | Tag-метка `01 / 11` в стиле архитектурного штампа |
| `src/app/cottage/data/principles.ts` | Контент 5 принципов |
| `src/app/cottage/data/process.ts` | 7 этапов процесса со сроками |
| `src/app/cottage/data/portfolio.ts` | Список объектов с категориями (берём из существующего `data/projects.ts` если есть) |
| `src/app/cottage/data/team.ts` | Прорабы (заглушки до получения фото) |
| `src/app/cottage/data/faq.ts` | Список FAQ |
| `src/app/cottage/data/pricing.ts` | Константы для калькулятора |
| `src/app/cottage/lib/calculator.ts` | Pure-функция расчёта стоимости |
| `src/app/api/cottage/quote/route.ts` | API для приёма расчёта + отправка email/Telegram |
| `scripts/test-calculator.mjs` | Smoke-тест pure-функции калькулятора |
| `docs/cottage-ai-prompts.md` | 5 промптов для Nano Banana Pro / GPT Image 2 |

### Модифицируем

| Путь | Что меняем |
|---|---|
| `src/app/sitemap.ts` | Добавить `/cottage` в sitemap |

### Не трогаем

- `src/app/page.tsx` (главная остаётся как есть)
- `src/app/layout.tsx` (глобальные мета не трогаем)
- Существующие компоненты в `src/components/` (только импортируем `Header`, `Footer`, `CountUp`, `MotionProvider`)

---

## Phase 1: Foundation

### Task 1: Скелет страницы и маршрут

**Files:**
- Create: `src/app/cottage/page.tsx`
- Create: `src/app/cottage/layout.tsx`

- [ ] **Step 1: Создать минимальный page.tsx**

```tsx
// src/app/cottage/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Строительство коттеджей под ключ от 200 м² — ВЕР СТРОЙ, Пермь",
  description:
    "Строим премиум-коттеджи с тем же качеством, что и торговые центры. 6+ лет, 15+ объектов, своя опалубка и бригады. Расчёт сметы за 24 часа.",
  alternates: { canonical: "https://xn--b1agmtjagi.xn--p1ai/cottage" },
  openGraph: {
    title: "ВЕР СТРОЙ — премиум-коттеджи под ключ",
    description: "Прочность торгового центра. В вашем доме.",
    url: "https://xn--b1agmtjagi.xn--p1ai/cottage",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function CottagePage() {
  return (
    <main className="min-h-screen bg-[#fafaf7] text-[#0a0a0a]">
      <section className="container mx-auto px-5 py-20">
        <h1 className="text-4xl font-bold">Cottage landing — placeholder</h1>
      </section>
    </main>
  );
}
```

- [ ] **Step 2: Создать layout.tsx с подключением шрифтов**

```tsx
// src/app/cottage/layout.tsx
import { Manrope, JetBrains_Mono } from "next/font/google";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export default function CottageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${manrope.variable} ${jetbrainsMono.variable}`}>
      {children}
    </div>
  );
}
```

- [ ] **Step 3: Запустить dev и проверить страницу**

Run:
```bash
cd "/Users/nikita/Desktop/ВЕР СТРОЙ САЙТ/verstroy-site" && npm run dev
```

Открыть `http://localhost:3000/cottage` в браузере — должен отрисоваться placeholder заголовок.

Expected: HTTP 200, виден заголовок «Cottage landing — placeholder».

- [ ] **Step 4: Прогнать lint**

Run:
```bash
cd "/Users/nikita/Desktop/ВЕР СТРОЙ САЙТ/verstroy-site" && npm run lint
```

Expected: `0 errors, 0 warnings`.

- [ ] **Step 5: Commit**

```bash
git add src/app/cottage/
git commit -m "feat(cottage): add /cottage route skeleton with display fonts"
```

---

### Task 2: BlueprintGrid и SectionTag — переиспользуемые примитивы

**Files:**
- Create: `src/app/cottage/components/BlueprintGrid.tsx`
- Create: `src/app/cottage/components/SectionTag.tsx`

- [ ] **Step 1: Создать BlueprintGrid.tsx**

```tsx
// src/app/cottage/components/BlueprintGrid.tsx
type Props = {
  className?: string;
  cellSize?: number;
  opacity?: number;
  color?: string;
};

export default function BlueprintGrid({
  className = "",
  cellSize = 32,
  opacity = 0.06,
  color = "#0a0a0a",
}: Props) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{
        backgroundImage: `linear-gradient(${color} 1px, transparent 1px), linear-gradient(90deg, ${color} 1px, transparent 1px)`,
        backgroundSize: `${cellSize}px ${cellSize}px`,
        opacity,
      }}
    />
  );
}
```

- [ ] **Step 2: Создать SectionTag.tsx**

```tsx
// src/app/cottage/components/SectionTag.tsx
type Props = {
  number: string;
  label: string;
  className?: string;
};

export default function SectionTag({ number, label, className = "" }: Props) {
  return (
    <div
      className={`font-mono text-[10px] tracking-[0.25em] uppercase opacity-60 flex gap-3 ${className}`}
    >
      <span>VER STROY</span>
      <span>·</span>
      <span>{number}</span>
      <span>·</span>
      <span>{label}</span>
    </div>
  );
}
```

- [ ] **Step 3: Подключить в page.tsx для проверки**

Заменить содержимое секции в `page.tsx`:

```tsx
import BlueprintGrid from "./components/BlueprintGrid";
import SectionTag from "./components/SectionTag";

// внутри main:
<section className="relative container mx-auto px-5 py-20">
  <BlueprintGrid />
  <div className="relative">
    <SectionTag number="01 / 11" label="COTTAGE 200+ M²" />
    <h1 className="text-4xl font-bold mt-4">Cottage landing — placeholder</h1>
  </div>
</section>
```

- [ ] **Step 4: Проверить в браузере**

Открыть `http://localhost:3000/cottage` — должна быть видна чертёжная сетка на фоне и tag-метка над заголовком.

- [ ] **Step 5: Commit**

```bash
git add src/app/cottage/
git commit -m "feat(cottage): add BlueprintGrid and SectionTag primitives"
```

---

## Phase 2: Visual Sections (Top)

### Task 3: Hero (секция 01)

**Files:**
- Create: `src/app/cottage/components/Hero.tsx`
- Modify: `src/app/cottage/page.tsx`

- [ ] **Step 1: Создать Hero.tsx со split-layout**

```tsx
// src/app/cottage/components/Hero.tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import BlueprintGrid from "./BlueprintGrid";
import SectionTag from "./SectionTag";

export default function Hero() {
  return (
    <section className="relative min-h-[88vh] grid grid-cols-1 lg:grid-cols-[1.1fr_1fr]">
      {/* Левая колонка — blueprint + текст */}
      <div className="relative px-6 lg:px-16 py-20 flex flex-col justify-center">
        <BlueprintGrid />
        <div className="relative">
          <SectionTag number="01 / 11" label="COTTAGE 200+ M²" />
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="font-[family-name:var(--font-display)] font-extrabold tracking-[-0.04em] leading-[0.92] mt-6"
            style={{ fontSize: "clamp(40px, 7vw, 88px)" }}
          >
            Прочность<br />
            торгового<br />
            <span className="bg-[#ffd400] px-2 inline-block">центра.</span>
            <br />
            В вашем доме.
          </motion.h1>
          <p className="mt-7 text-base lg:text-lg leading-relaxed text-black/65 max-w-[420px]">
            6 лет строим коммерческие объекты по Уралу. Та же опалубка, те же
            бригады, та же арматура — для вашего коттеджа.
          </p>
          <a
            href="#cta"
            className="inline-flex items-center gap-3 bg-[#0a0a0a] text-[#fafaf7] px-6 py-4 mt-8 font-bold tracking-wider text-sm hover:bg-[#1a1a1a] transition w-fit"
          >
            РАСЧЁТ ЗА 24 ЧАСА
            <span aria-hidden>→</span>
          </a>
          <div className="mt-12 flex gap-8 font-mono text-[10px] uppercase tracking-widest text-black/55">
            <div>
              <div className="text-2xl font-[family-name:var(--font-display)] font-extrabold text-black">
                15+
              </div>
              объектов
            </div>
            <div>
              <div className="text-2xl font-[family-name:var(--font-display)] font-extrabold text-black">
                6
              </div>
              лет на рынке
            </div>
            <div>
              <div className="text-2xl font-[family-name:var(--font-display)] font-extrabold text-black">
                0
              </div>
              брошено
            </div>
          </div>
        </div>
      </div>

      {/* Правая колонка — фото */}
      <div className="relative bg-gradient-to-br from-[#2a2a2a] to-[#0a0a0a] min-h-[400px] lg:min-h-full flex items-center justify-center text-[#888]">
        {/* TODO: заменить на <Image src="/cottage/hero.webp" /> когда AI-фото готово */}
        <div className="text-center px-6 font-mono text-xs">
          [ AI HERO PHOTO 16:9 ]<br />
          <span className="text-[#d4b483] mt-2 block">
            premium cottage 280m², monolith + wood, golden hour, AD-style
          </span>
        </div>
        <div className="absolute bottom-4 left-4 right-4 font-mono text-[9px] text-[#d4b483] tracking-widest opacity-60">
          N 58° 00&apos; 24&quot; · COTTAGE 280 M² · VER STROY
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Подключить Hero в page.tsx**

```tsx
// src/app/cottage/page.tsx — заменить заглушку
import Hero from "./components/Hero";
// ...
export default function CottagePage() {
  return (
    <main className="min-h-screen bg-[#fafaf7] text-[#0a0a0a]">
      <Hero />
    </main>
  );
}
```

- [ ] **Step 3: Проверить в браузере**

`http://localhost:3000/cottage` — hero на десктопе должен быть split (текст слева, фото справа), на мобиле — фото снизу/сверху, текст под/над.

Проверить на ширинах 360px, 768px, 1280px (DevTools).

- [ ] **Step 4: Lint + build**

```bash
npm run lint && npm run build
```

Expected: build проходит без ошибок.

- [ ] **Step 5: Commit**

```bash
git add src/app/cottage/
git commit -m "feat(cottage): add hero section (split layout)"
```

---

### Task 4: Comparison (секция 02)

**Files:**
- Create: `src/app/cottage/components/Comparison.tsx`
- Modify: `src/app/cottage/page.tsx`

- [ ] **Step 1: Создать Comparison.tsx**

```tsx
// src/app/cottage/components/Comparison.tsx
"use client";

import { motion } from "framer-motion";
import SectionTag from "./SectionTag";

export default function Comparison() {
  return (
    <section className="relative py-24 lg:py-36 px-6 lg:px-16 bg-[#fafaf7]">
      <div className="max-w-[1440px] mx-auto">
        <SectionTag number="02 / 11" label="ОТ ТЦ К КОТТЕДЖУ" />

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="font-[family-name:var(--font-display)] font-extrabold tracking-[-0.04em] leading-[0.95] mt-6 max-w-3xl"
          style={{ fontSize: "clamp(28px, 4.5vw, 56px)" }}
        >
          Та же опалубка. Та же команда. <br />
          <span className="bg-[#ffd400] px-2 inline-block">Та же арматура.</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12">
          <ComparisonCard
            tag="ТЦ ВЕРА · ВЕРЕЩАГИНО · 2024"
            label="КОММЕРЧЕСКИЙ ОБЪЕКТ"
            // TODO: заменить на реальное фото колонн ТЦ из covers/photos
            placeholder="[ ТЦ ВЕРА · МОНОЛИТ ]"
          />
          <ComparisonCard
            tag="КОТТЕДЖ 280 М² · ПЕРМЬ · 2025"
            label="ЧАСТНЫЙ ЗАКАЗЧИК"
            placeholder="[ AI: КОТТЕДЖ · ОПАЛУБКА ]"
            isAi
          />
        </div>
      </div>
    </section>
  );
}

function ComparisonCard({
  tag,
  label,
  placeholder,
  isAi = false,
}: {
  tag: string;
  label: string;
  placeholder: string;
  isAi?: boolean;
}) {
  return (
    <div className="relative aspect-[4/5] bg-gradient-to-br from-[#2a2a2a] to-[#0a0a0a] flex items-center justify-center text-[#888] font-mono text-xs overflow-hidden">
      <div className="text-center">{placeholder}</div>
      <div className="absolute top-4 left-4 right-4 flex justify-between font-mono text-[9px] text-[#d4b483] tracking-widest">
        <span>{tag}</span>
        <span>{label}</span>
      </div>
      {isAi && (
        <div className="absolute bottom-4 left-4 font-mono text-[8px] text-[#d4b483]/60">
          AI-PHOTO · NANO BANANA PRO
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Подключить в page.tsx**

```tsx
import Comparison from "./components/Comparison";
// ...
<main>
  <Hero />
  <Comparison />
</main>
```

- [ ] **Step 3: Проверить в браузере**

Кадры стоят рядом на десктопе, друг под другом на мобиле. Заголовок крупный, тэги читаются.

- [ ] **Step 4: Commit**

```bash
git add src/app/cottage/
git commit -m "feat(cottage): add comparison section (TC vs cottage)"
```

---

### Task 5: Interactive Blueprint (секция 03)

**Files:**
- Create: `src/app/cottage/components/InteractiveBlueprint.tsx`
- Modify: `src/app/cottage/page.tsx`

Это «вау»-элемент. Интерактивный SVG-чертёж с 5 узлами.

- [ ] **Step 1: Создать InteractiveBlueprint.tsx — структура и данные**

```tsx
// src/app/cottage/components/InteractiveBlueprint.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BlueprintGrid from "./BlueprintGrid";
import SectionTag from "./SectionTag";

type Node = {
  id: string;
  x: number; // % координата на SVG (0-100)
  y: number;
  title: string;
  description: string;
  exampleHref: string;
};

const NODES: Node[] = [
  {
    id: "foundation",
    x: 50,
    y: 82,
    title: "Фундамент",
    description: "Монолитная плита. Защитный слой по СП 63.13330. Та же оснастка, что на промышленных фундаментах ЛУКОЙЛ.",
    exampleHref: "#portfolio",
  },
  {
    id: "monolith",
    x: 50,
    y: 50,
    title: "Монолит",
    description: "Несущие стены и перекрытия — собственная опалубка. Геометрия как на ТЦ Вера: ровные стены, минимум доводки.",
    exampleHref: "#portfolio",
  },
  {
    id: "roof",
    x: 50,
    y: 18,
    title: "Кровля",
    description: "Опыт ЛУКОЙЛ (Усинск, Нижний Одесс). Снеговая нагрузка по СП 20 для климатического района IВ.",
    exampleHref: "#portfolio",
  },
  {
    id: "facade",
    x: 88,
    y: 35,
    title: "Фасад",
    description: "Вентилируемые фасады. Опыт 5+ объектов: ЛУКОЙЛ, школа Верещагино, ЖК Good Style.",
    exampleHref: "#portfolio",
  },
  {
    id: "engineering",
    x: 12,
    y: 60,
    title: "Инженерия",
    description: "Своя бригада инженерных систем. 6 этапов контроля от котлована до сдачи.",
    exampleHref: "#portfolio",
  },
];

export default function InteractiveBlueprint() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = NODES.find((n) => n.id === activeId);

  return (
    <section className="relative py-24 lg:py-36 px-6 lg:px-16 bg-[#fafaf7] overflow-hidden">
      <BlueprintGrid />
      <div className="relative max-w-[1440px] mx-auto">
        <SectionTag number="03 / 11" label="АНАТОМИЯ КОТТЕДЖА" />
        <h2
          className="font-[family-name:var(--font-display)] font-extrabold tracking-[-0.04em] leading-[0.95] mt-6 max-w-3xl"
          style={{ fontSize: "clamp(28px, 4.5vw, 56px)" }}
        >
          Каждый узел — <br />
          <span className="bg-[#ffd400] px-2 inline-block">опыт большого объекта.</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8 mt-12">
          {/* SVG-чертёж */}
          <div
            className="relative aspect-[4/3] bg-white border border-black/10"
            onMouseLeave={() => setActiveId(null)}
          >
            <BlueprintHouseSVG
              nodes={NODES}
              activeId={activeId}
              onNodeHover={setActiveId}
              onNodeClick={setActiveId}
            />
          </div>

          {/* Панель с активной информацией */}
          <div className="bg-[#0a0a0a] text-[#fafaf7] p-8 min-h-[300px] relative">
            <AnimatePresence mode="wait">
              {active ? (
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="font-mono text-[10px] tracking-widest text-[#ffd400]">
                    NODE / {active.id.toUpperCase()}
                  </div>
                  <h3 className="font-[family-name:var(--font-display)] font-extrabold text-3xl mt-2">
                    {active.title}
                  </h3>
                  <p className="text-sm leading-relaxed mt-4 text-white/75">
                    {active.description}
                  </p>
                  <a
                    href={active.exampleHref}
                    className="inline-flex items-center gap-2 text-[#ffd400] font-mono text-xs tracking-widest mt-6 hover:underline"
                  >
                    СМОТРЕТЬ ПРИМЕР →
                  </a>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="font-mono text-[11px] tracking-widest text-white/50"
                >
                  НАВЕДИ КУРСОР НА УЗЕЛ ←
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Мобильный аккордеон узлов */}
        <div className="lg:hidden mt-6 space-y-2">
          {NODES.map((n) => (
            <details
              key={n.id}
              className="border border-black/15 bg-white p-4"
            >
              <summary className="cursor-pointer font-bold">
                {n.title}
              </summary>
              <p className="text-sm mt-3 text-black/70">{n.description}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

// Стилизованный SVG-чертёж дома + интерактивные узлы
function BlueprintHouseSVG({
  nodes,
  activeId,
  onNodeHover,
  onNodeClick,
}: {
  nodes: Node[];
  activeId: string | null;
  onNodeHover: (id: string | null) => void;
  onNodeClick: (id: string) => void;
}) {
  return (
    <svg
      viewBox="0 0 400 300"
      className="absolute inset-0 w-full h-full"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Каркас дома: разрез */}
      <g stroke="#0a0a0a" strokeWidth="1" fill="none">
        {/* Фундамент */}
        <line x1="80" y1="270" x2="320" y2="270" strokeWidth="2" />
        <line x1="80" y1="245" x2="320" y2="245" />
        <line x1="80" y1="245" x2="80" y2="270" />
        <line x1="320" y1="245" x2="320" y2="270" />
        {/* Стены */}
        <line x1="80" y1="245" x2="80" y2="100" strokeWidth="2" />
        <line x1="320" y1="245" x2="320" y2="100" strokeWidth="2" />
        {/* Перекрытие 1 этажа */}
        <line x1="80" y1="170" x2="320" y2="170" />
        {/* Кровля */}
        <line x1="80" y1="100" x2="200" y2="40" strokeWidth="2" />
        <line x1="320" y1="100" x2="200" y2="40" strokeWidth="2" />
        <line x1="80" y1="100" x2="320" y2="100" />
        {/* Окна */}
        <rect x="120" y="195" width="40" height="35" />
        <rect x="240" y="195" width="40" height="35" />
        <rect x="120" y="120" width="40" height="35" />
        <rect x="240" y="120" width="40" height="35" />
        {/* Дверь */}
        <rect x="190" y="195" width="30" height="50" />
      </g>

      {/* Размерные линии (декор) */}
      <g stroke="#0a0a0a" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.4">
        <line x1="80" y1="285" x2="320" y2="285" />
        <line x1="335" y1="40" x2="335" y2="270" />
      </g>

      {/* Подписи размеров */}
      <g fontFamily="monospace" fontSize="7" fill="#0a0a0a" opacity="0.5">
        <text x="195" y="295">12 000</text>
        <text x="340" y="160" transform="rotate(90 340 160)">9 000</text>
      </g>

      {/* Интерактивные узлы */}
      {nodes.map((n) => {
        const cx = (n.x / 100) * 400;
        const cy = (n.y / 100) * 300;
        const isActive = activeId === n.id;
        return (
          <g
            key={n.id}
            onMouseEnter={() => onNodeHover(n.id)}
            onClick={() => onNodeClick(n.id)}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onNodeClick(n.id);
              }
            }}
            role="button"
            aria-label={n.title}
            className="cursor-pointer focus:outline-none"
          >
            <circle
              cx={cx}
              cy={cy}
              r={isActive ? 10 : 7}
              fill={isActive ? "#ffd400" : "white"}
              stroke="#0a0a0a"
              strokeWidth="1.5"
              className="transition-all"
            />
            <circle cx={cx} cy={cy} r="2" fill="#0a0a0a" />
          </g>
        );
      })}
    </svg>
  );
}
```

- [ ] **Step 2: Подключить в page.tsx**

```tsx
import InteractiveBlueprint from "./components/InteractiveBlueprint";
// ...
<Hero />
<Comparison />
<InteractiveBlueprint />
```

- [ ] **Step 3: Проверить интерактивность**

В браузере:
- Hover по узлам — справа меняется текст
- Tab через узлы — фокусируется, Enter/Space раскрывает
- На мобиле (≤1024) — SVG скрыт, аккордеон работает

- [ ] **Step 4: Build**

```bash
npm run build
```

Expected: проходит.

- [ ] **Step 5: Commit**

```bash
git add src/app/cottage/
git commit -m "feat(cottage): add interactive blueprint section with 5 hover nodes"
```

---

### Task 6: StatsBar (секция 04)

**Files:**
- Create: `src/app/cottage/components/StatsBar.tsx`
- Modify: `src/app/cottage/page.tsx`

Переиспользуем `CountUp` из `src/components/CountUp.tsx`.

- [ ] **Step 1: Прочитать существующий CountUp компонент**

Проверить интерфейс `CountUp.tsx`:
```bash
cat "src/components/CountUp.tsx"
```

- [ ] **Step 2: Создать StatsBar.tsx**

```tsx
// src/app/cottage/components/StatsBar.tsx
"use client";

import CountUp from "@/components/CountUp";

const STATS = [
  { value: 15, suffix: "+", label: "ОБЪЕКТОВ" },
  { value: 8200, suffix: " м³", label: "БЕТОНА УЛОЖЕНО" },
  { value: 0, suffix: "", label: "БРОШЕННЫХ СТРОЕК" },
  { value: 6, suffix: "", label: "ЛЕТ НА РЫНКЕ" },
];

export default function StatsBar() {
  return (
    <section className="bg-[#0a0a0a] text-[#fafaf7] py-20 px-6 lg:px-16">
      <div className="max-w-[1440px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
        {STATS.map((s, i) => (
          <div key={i} className="border-l-2 border-[#ffd400] pl-5">
            <div
              className="font-[family-name:var(--font-display)] font-extrabold leading-none"
              style={{ fontSize: "clamp(40px, 6vw, 72px)" }}
            >
              <CountUp end={s.value} duration={1.5} />
              <span>{s.suffix}</span>
            </div>
            <div className="font-mono text-[10px] tracking-[0.2em] text-white/60 mt-3">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
```

> **Если интерфейс существующего CountUp отличается** (например, принимает `value` вместо `end`, или не принимает `duration`) — адаптируй вызов под реальный API. Не модифицируй сам компонент.

- [ ] **Step 3: Подключить в page.tsx**

```tsx
import StatsBar from "./components/StatsBar";
// ...
<InteractiveBlueprint />
<StatsBar />
```

- [ ] **Step 4: Проверить в браузере**

Цифры анимируются при появлении в viewport. Тёмная полоса контрастирует со светлыми секциями.

- [ ] **Step 5: Commit**

```bash
git add src/app/cottage/
git commit -m "feat(cottage): add dark stats bar with CountUp"
```

---

### Task 7: Principles (секция 05)

**Files:**
- Create: `src/app/cottage/data/principles.ts`
- Create: `src/app/cottage/components/Principles.tsx`
- Modify: `src/app/cottage/page.tsx`

- [ ] **Step 1: Создать data/principles.ts**

```ts
// src/app/cottage/data/principles.ts
export type Principle = {
  number: string;
  title: string;
  description: string;
  proof: string;
};

export const PRINCIPLES: Principle[] = [
  {
    number: "№ 01",
    title: "Опалубка как у промышленников",
    description:
      "Своя опалубка, не арендованная. На объектах ЛУКОЙЛ и ТЦ Вера тысячи м² ровных монолитных стен. То же — на вашем коттедже.",
    proof: "8 200 м³ собственной отливки",
  },
  {
    number: "№ 02",
    title: "Бригады, а не подрядчики",
    description:
      "Постоянный штат. Тот же мастер ведёт ваш дом от котлована до ключей. Никаких «новых ребят с другого объекта».",
    proof: "Средний стаж в команде 4+ года",
  },
  {
    number: "№ 03",
    title: "Опыт коммерческих объектов",
    description:
      "Кто заливал колонны торгового центра, тот заливает и фундамент вашего коттеджа. Запас прочности — выше частных стандартов.",
    proof: "ТЦ Вера, Елькина 12, ЛУКОЙЛ, ОЗОН",
  },
  {
    number: "№ 04",
    title: "Фиксированная смета",
    description:
      "Цена закрепляется в договоре после расчёта. Доплаты — только если меняете проект сами. Никаких «вылезли скрытые работы».",
    proof: "Договор с фикс-ценой",
  },
  {
    number: "№ 05",
    title: "Один прораб от нуля до ключей",
    description:
      "Один человек ведёт стройку до конца. Не передаём объект между сменами. Вы знаете, кому звонить в любой момент.",
    proof: "0 объектов, оставленных без прораба",
  },
];
```

- [ ] **Step 2: Создать Principles.tsx**

```tsx
// src/app/cottage/components/Principles.tsx
"use client";

import { motion } from "framer-motion";
import SectionTag from "./SectionTag";
import { PRINCIPLES } from "../data/principles";

export default function Principles() {
  return (
    <section className="py-24 lg:py-36 px-6 lg:px-16 bg-[#fafaf7]">
      <div className="max-w-[1440px] mx-auto">
        <SectionTag number="05 / 11" label="ПРИНЦИПЫ" />
        <h2
          className="font-[family-name:var(--font-display)] font-extrabold tracking-[-0.04em] leading-[0.95] mt-6 max-w-3xl"
          style={{ fontSize: "clamp(28px, 4.5vw, 56px)" }}
        >
          5 принципов, которые отличают <br />
          <span className="bg-[#ffd400] px-2 inline-block">наш монолит.</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
          {PRINCIPLES.map((p, i) => (
            <motion.article
              key={p.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`bg-white border border-black/10 p-6 lg:p-8 ${
                i === 3 ? "md:col-start-1" : ""
              }`}
            >
              <div className="font-mono text-[10px] tracking-[0.25em] opacity-50">
                {p.number}
              </div>
              <h3 className="font-[family-name:var(--font-display)] font-extrabold text-xl lg:text-2xl mt-4 leading-tight">
                {p.title}
              </h3>
              <p className="text-sm text-black/70 leading-relaxed mt-3">
                {p.description}
              </p>
              <div className="mt-5 pt-4 border-t border-black/10 font-mono text-[10px] tracking-[0.2em] uppercase">
                <span className="bg-[#ffd400] px-1.5 py-0.5">→</span>{" "}
                {p.proof}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Подключить в page.tsx**

```tsx
import Principles from "./components/Principles";
// ...
<StatsBar />
<Principles />
```

- [ ] **Step 4: Проверить и закоммитить**

```bash
npm run lint
git add src/app/cottage/
git commit -m "feat(cottage): add 5 principles bento section"
```

---

## Phase 3: Mid Sections

### Task 8: Process Timeline (секция 06)

**Files:**
- Create: `src/app/cottage/data/process.ts`
- Create: `src/app/cottage/components/ProcessTimeline.tsx`
- Modify: `src/app/cottage/page.tsx`

- [ ] **Step 1: Создать data/process.ts**

```ts
// src/app/cottage/data/process.ts
export type ProcessStep = {
  number: string;
  title: string;
  duration: string;
  description: string;
};

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: "01",
    title: "Проект и расчёт",
    duration: "1–2 нед",
    description: "Замер участка. Финальная смета. Договор с фикс-ценой.",
  },
  {
    number: "02",
    title: "Котлован и подготовка",
    duration: "2 нед",
    description: "Разработка грунта. Устройство фундаментной плиты.",
  },
  {
    number: "03",
    title: "Монолит фундамента",
    duration: "2–3 нед",
    description: "Армирование. Бетонирование. Гидроизоляция.",
  },
  {
    number: "04",
    title: "Коробка и стены",
    duration: "4–8 нед",
    description: "Несущие стены — монолит/газобетон. Перекрытия.",
  },
  {
    number: "05",
    title: "Кровля",
    duration: "2 нед",
    description: "Стропильная система. Утепление. Кровельный пирог.",
  },
  {
    number: "06",
    title: "Фасад и инженерия",
    duration: "4–6 нед",
    description: "Вентилируемый фасад. Окна. Электрика. Сантехника. Котёл.",
  },
  {
    number: "07",
    title: "Отделка и ключи",
    duration: "8–12 нед",
    description: "Внутренняя отделка под чистовую или под ключ. Сдача.",
  },
];
```

- [ ] **Step 2: Создать ProcessTimeline.tsx со scroll-driven анимацией**

```tsx
// src/app/cottage/components/ProcessTimeline.tsx
"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import SectionTag from "./SectionTag";
import { PROCESS_STEPS } from "../data/process";

export default function ProcessTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const progressWidth = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"]);

  return (
    <section
      ref={ref}
      className="py-24 lg:py-36 px-6 lg:px-16 bg-[#fafaf7]"
    >
      <div className="max-w-[1440px] mx-auto">
        <SectionTag number="06 / 11" label="ПРОЦЕСС" />
        <h2
          className="font-[family-name:var(--font-display)] font-extrabold tracking-[-0.04em] leading-[0.95] mt-6 max-w-3xl"
          style={{ fontSize: "clamp(28px, 4.5vw, 56px)" }}
        >
          От котлована до ключей —<br />
          <span className="bg-[#ffd400] px-2 inline-block">6–9 месяцев.</span>
        </h2>
        <p className="text-sm text-black/60 mt-3 font-mono">
          Сроки указаны для коттеджа 200–300 м² «под ключ».
        </p>

        {/* Прогресс-бар */}
        <div className="hidden lg:block relative mt-16 mb-2 h-1 bg-black/10">
          <motion.div
            style={{ width: progressWidth }}
            className="h-full bg-[#ffd400]"
          />
        </div>

        {/* Десктоп: горизонтальный таймлайн */}
        <div className="hidden lg:grid grid-cols-7 gap-2 relative">
          {PROCESS_STEPS.map((step) => (
            <article key={step.number} className="border-t-2 border-black/15 pt-4">
              <div className="font-mono text-[11px] tracking-[0.2em] opacity-50">
                {step.number}
              </div>
              <h3 className="font-bold text-sm mt-2 leading-tight">
                {step.title}
              </h3>
              <div className="font-mono text-[10px] mt-3 bg-[#ffd400] inline-block px-1.5 py-0.5">
                {step.duration}
              </div>
              <p className="text-[11px] text-black/60 mt-3 leading-snug">
                {step.description}
              </p>
            </article>
          ))}
        </div>

        {/* Мобильный: вертикальный */}
        <div className="lg:hidden mt-12 space-y-6">
          {PROCESS_STEPS.map((step) => (
            <article
              key={step.number}
              className="grid grid-cols-[40px_1fr] gap-4 border-l-2 border-[#ffd400] pl-4"
            >
              <div className="font-mono text-[11px] tracking-widest opacity-50">
                {step.number}
              </div>
              <div>
                <h3 className="font-bold leading-tight">{step.title}</h3>
                <div className="font-mono text-[10px] mt-1 bg-[#ffd400] inline-block px-1.5 py-0.5">
                  {step.duration}
                </div>
                <p className="text-sm text-black/60 mt-2">{step.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Подключить + проверить**

В page.tsx:
```tsx
import ProcessTimeline from "./components/ProcessTimeline";
// ...
<Principles />
<ProcessTimeline />
```

В браузере: на десктопе при скролле жёлтая полоска движется. На мобиле — вертикальный список.

- [ ] **Step 4: Commit**

```bash
git add src/app/cottage/
git commit -m "feat(cottage): add scroll-driven process timeline (7 steps)"
```

---

### Task 9: Portfolio Grid (секция 07)

**Files:**
- Create: `src/app/cottage/data/portfolio.ts`
- Create: `src/app/cottage/components/PortfolioGrid.tsx`
- Modify: `src/app/cottage/page.tsx`

- [ ] **Step 1: Проверить, есть ли уже данные о портфолио**

```bash
ls "src/app/data/" 2>/dev/null
ls "src/data/" 2>/dev/null
grep -r "ТЦ Вера\|projects" --include="*.ts" --include="*.tsx" -l src/ 2>/dev/null | head -5
```

Если есть существующий список — переиспользовать. Если нет — создать новый.

- [ ] **Step 2: Создать data/portfolio.ts (если не было)**

```ts
// src/app/cottage/data/portfolio.ts
export type PortfolioCategory =
  | "Все"
  | "Торговые центры"
  | "ЖК и многоэтажные"
  | "Промышленные"
  | "Социальные";

export type PortfolioItem = {
  slug: string;
  title: string;
  category: Exclude<PortfolioCategory, "Все">;
  city: string;
  year: string;
  area: string;
  type: string; // "монолит", "фасад", "кровля", "кладка"
  cover: string; // путь к фото в /covers или R2 URL
};

export const PORTFOLIO: PortfolioItem[] = [
  {
    slug: "tc-vera",
    title: "ТЦ «Вера»",
    category: "Торговые центры",
    city: "Верещагино",
    year: "2024",
    area: "—",
    type: "Монолит, кладка",
    cover: "/covers/tc-vera.jpg", // TODO: уточнить реальный путь
  },
  {
    slug: "good-style",
    title: "ЖК Good Style",
    category: "ЖК и многоэтажные",
    city: "Пермь",
    year: "—",
    area: "—",
    type: "Монолит, фасад",
    cover: "/covers/zhk-good-style.jpg",
  },
  {
    slug: "lukoil-usinsk",
    title: "Кровля ЛУКОЙЛ",
    category: "Промышленные",
    city: "Усинск",
    year: "—",
    area: "—",
    type: "Кровля",
    cover: "/covers/lukoil-usinsk.jpg",
  },
  {
    slug: "lukoil-fasad",
    title: "Вентилируемый фасад ЛУКОЙЛ",
    category: "Промышленные",
    city: "Нижний Одесс",
    year: "—",
    area: "—",
    type: "Фасад",
    cover: "/covers/lukoil-nizhny-odes.jpg",
  },
  {
    slug: "ozon",
    title: "Распределительный центр OZON",
    category: "Промышленные",
    city: "Пермь",
    year: "—",
    area: "—",
    type: "Фундаменты",
    cover: "/covers/ozon.jpg",
  },
  {
    slug: "fok",
    title: "ФОК — монолитные полы",
    category: "Социальные",
    city: "Пермь",
    year: "—",
    area: "—",
    type: "Монолит, кладка",
    cover: "/covers/fok.jpg",
  },
  {
    slug: "onko",
    title: "Онкологический центр",
    category: "Социальные",
    city: "Пермь",
    year: "—",
    area: "—",
    type: "Общестроительные",
    cover: "/covers/onko.jpg",
  },
];

export const CATEGORIES: PortfolioCategory[] = [
  "Все",
  "Торговые центры",
  "ЖК и многоэтажные",
  "Промышленные",
  "Социальные",
];
```

> Реальные пути к фото проверить в `public/covers/` и поправить. Если есть существующий `data/projects.ts` — импортировать оттуда вместо дублирования.

- [ ] **Step 3: Создать PortfolioGrid.tsx**

```tsx
// src/app/cottage/components/PortfolioGrid.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import SectionTag from "./SectionTag";
import {
  PORTFOLIO,
  CATEGORIES,
  type PortfolioCategory,
} from "../data/portfolio";

export default function PortfolioGrid() {
  const [active, setActive] = useState<PortfolioCategory>("Все");

  const items =
    active === "Все"
      ? PORTFOLIO
      : PORTFOLIO.filter((p) => p.category === active);

  return (
    <section className="py-24 lg:py-36 px-6 lg:px-16 bg-[#fafaf7]" id="portfolio">
      <div className="max-w-[1440px] mx-auto">
        <SectionTag number="07 / 11" label="ОБЪЕКТЫ" />
        <h2
          className="font-[family-name:var(--font-display)] font-extrabold tracking-[-0.04em] leading-[0.95] mt-6 max-w-3xl"
          style={{ fontSize: "clamp(28px, 4.5vw, 56px)" }}
        >
          15+ объектов по Уралу.<br />
          <span className="bg-[#ffd400] px-2 inline-block">Все наши.</span>
        </h2>

        {/* Фильтры */}
        <div className="flex flex-wrap gap-2 mt-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-2 font-mono text-[11px] tracking-widest uppercase border ${
                active === cat
                  ? "bg-[#0a0a0a] text-[#fafaf7] border-[#0a0a0a]"
                  : "bg-transparent border-black/15 hover:border-black/40"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Bento-сетка */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-8">
          <AnimatePresence mode="popLayout">
            {items.map((item) => (
              <motion.article
                key={item.slug}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="group relative aspect-[4/5] bg-[#0a0a0a] overflow-hidden"
              >
                {/* Фото */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#2a2a2a] to-[#0a0a0a] flex items-center justify-center text-white/30 font-mono text-[10px]">
                  {/* TODO: заменить на <Image src={item.cover} ... /> когда пути будут известны */}
                  [ {item.title.toUpperCase()} ]
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition" />

                {/* Метки */}
                <div className="absolute top-4 left-4 right-4 flex justify-between font-mono text-[9px] tracking-widest text-[#ffd400] z-10">
                  <span>{item.category.toUpperCase()}</span>
                  <span>{item.year}</span>
                </div>
                <div className="absolute bottom-4 left-4 right-4 z-10">
                  <h3 className="text-white font-[family-name:var(--font-display)] font-extrabold text-xl leading-tight">
                    {item.title}
                  </h3>
                  <div className="font-mono text-[10px] tracking-widest text-white/60 mt-1">
                    {item.city} · {item.type}
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Подключить + проверить**

```tsx
import PortfolioGrid from "./components/PortfolioGrid";
// ...
<ProcessTimeline />
<PortfolioGrid />
```

В браузере: фильтры переключают карточки с layout-анимацией. На мобиле — стек.

- [ ] **Step 5: Commit**

```bash
git add src/app/cottage/
git commit -m "feat(cottage): add portfolio grid with category filters"
```

---

## Phase 4: Calculator + API

### Task 10: Calculator pure logic + smoke-тест

**Files:**
- Create: `src/app/cottage/data/pricing.ts`
- Create: `src/app/cottage/lib/calculator.ts`
- Create: `scripts/test-calculator.mjs`

- [ ] **Step 1: Создать data/pricing.ts с константами**

```ts
// src/app/cottage/data/pricing.ts
export const BASE_PRICE_PER_M2 = {
  monolith: 60_000,
  aerated: 45_000,
  brick: 55_000,
} as const;

export type BoxType = keyof typeof BASE_PRICE_PER_M2;

export const FLOOR_MULTIPLIER = {
  one: 1.0,
  two: 1.15,
  twoAttic: 1.25,
} as const;

export type FloorType = keyof typeof FLOOR_MULTIPLIER;

export const FINISH_MULTIPLIER = {
  rough: 1.0, // под чистовую
  full: 1.25, // под ключ (+25%)
} as const;

export type FinishType = keyof typeof FINISH_MULTIPLIER;

export const ENGINEERING_ADDONS = {
  warmFloor: 800_000,
  boilerRoom: 600_000,
  sewer: 350_000,
  well: 450_000,
} as const;

export type EngineeringKey = keyof typeof ENGINEERING_ADDONS;
```

- [ ] **Step 2: Создать lib/calculator.ts**

```ts
// src/app/cottage/lib/calculator.ts
import {
  BASE_PRICE_PER_M2,
  FLOOR_MULTIPLIER,
  FINISH_MULTIPLIER,
  ENGINEERING_ADDONS,
  type BoxType,
  type FloorType,
  type FinishType,
  type EngineeringKey,
} from "../data/pricing";

export type CalculatorInput = {
  area: number;
  boxType: BoxType;
  floorType: FloorType;
  finishType: FinishType;
  engineering: EngineeringKey[];
};

export type CalculatorResult = {
  total: number;
  breakdown: {
    base: number;
    floorCoeff: number;
    finishCoeff: number;
    engineering: number;
  };
};

export function calculate(input: CalculatorInput): CalculatorResult {
  const { area, boxType, floorType, finishType, engineering } = input;

  if (!Number.isFinite(area) || area < 50 || area > 1000) {
    throw new Error("area must be between 50 and 1000 m²");
  }

  const basePerM2 = BASE_PRICE_PER_M2[boxType];
  const base = basePerM2 * area;
  const floorCoeff = FLOOR_MULTIPLIER[floorType];
  const finishCoeff = FINISH_MULTIPLIER[finishType];

  const construction = base * floorCoeff * finishCoeff;
  const engineeringTotal = engineering.reduce(
    (sum, key) => sum + ENGINEERING_ADDONS[key],
    0
  );

  return {
    total: Math.round(construction + engineeringTotal),
    breakdown: {
      base,
      floorCoeff,
      finishCoeff,
      engineering: engineeringTotal,
    },
  };
}

export function formatRub(amount: number): string {
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 0,
  }).format(amount);
}
```

- [ ] **Step 3: Написать smoke-тест**

```js
// scripts/test-calculator.mjs
// Простой smoke-тест для калькулятора. Запуск: node scripts/test-calculator.mjs

import { calculate, formatRub } from "../src/app/cottage/lib/calculator.ts";

let failed = 0;

function assert(name, actual, expected) {
  if (actual !== expected) {
    console.error(`✗ ${name}: expected ${expected}, got ${actual}`);
    failed++;
  } else {
    console.log(`✓ ${name}`);
  }
}

// Тест 1: базовый расчёт монолита 200м², 1 этаж, под чистовую
{
  const r = calculate({
    area: 200,
    boxType: "monolith",
    floorType: "one",
    finishType: "rough",
    engineering: [],
  });
  assert("monolith 200m² 1F rough = 12_000_000", r.total, 12_000_000);
}

// Тест 2: два этажа дают +15%
{
  const r = calculate({
    area: 200,
    boxType: "monolith",
    floorType: "two",
    finishType: "rough",
    engineering: [],
  });
  assert("two floors x1.15", r.total, Math.round(12_000_000 * 1.15));
}

// Тест 3: под ключ +25%
{
  const r = calculate({
    area: 200,
    boxType: "monolith",
    floorType: "one",
    finishType: "full",
    engineering: [],
  });
  assert("full finish x1.25", r.total, Math.round(12_000_000 * 1.25));
}

// Тест 4: инженерия суммируется
{
  const r = calculate({
    area: 200,
    boxType: "monolith",
    floorType: "one",
    finishType: "rough",
    engineering: ["warmFloor", "boilerRoom"],
  });
  assert(
    "engineering: warmFloor + boilerRoom",
    r.total,
    12_000_000 + 800_000 + 600_000
  );
}

// Тест 5: газобетон дешевле
{
  const r = calculate({
    area: 200,
    boxType: "aerated",
    floorType: "one",
    finishType: "rough",
    engineering: [],
  });
  assert("aerated 200m² = 9_000_000", r.total, 9_000_000);
}

// Тест 6: формат рублей
assert("formatRub", formatRub(12_000_000), "12 000 000 ₽");

// Тест 7: валидация — площадь меньше 50
{
  let threw = false;
  try {
    calculate({
      area: 30,
      boxType: "monolith",
      floorType: "one",
      finishType: "rough",
      engineering: [],
    });
  } catch (e) {
    threw = true;
  }
  assert("throws on area < 50", threw, true);
}

if (failed > 0) {
  console.error(`\n${failed} test(s) failed`);
  process.exit(1);
} else {
  console.log("\nAll tests passed");
}
```

> Если node не запустит TS напрямую: использовать `npx tsx scripts/test-calculator.mjs` (tsx ставится глобально или однократным `npx`). Альтернатива — переписать тест на чистый JS, забрав цифры из pricing.ts через копию констант. Финальное решение принимает исполнитель в зависимости от того, что заработает быстрее.

- [ ] **Step 4: Запустить smoke-тест**

Run:
```bash
cd "/Users/nikita/Desktop/ВЕР СТРОЙ САЙТ/verstroy-site" && npx tsx scripts/test-calculator.mjs
```

Expected: `All tests passed` (7 ✓).

Если падает — поправить расчёт в `calculator.ts`, запустить ещё раз.

- [ ] **Step 5: Commit**

```bash
git add src/app/cottage/data/pricing.ts src/app/cottage/lib/calculator.ts scripts/test-calculator.mjs
git commit -m "feat(cottage): add pricing module + calculator pure function with tests"
```

---

### Task 11: Calculator UI (секция 08)

**Files:**
- Create: `src/app/cottage/components/Calculator.tsx`
- Modify: `src/app/cottage/page.tsx`

- [ ] **Step 1: Создать Calculator.tsx**

```tsx
// src/app/cottage/components/Calculator.tsx
"use client";

import { useMemo, useState } from "react";
import SectionTag from "./SectionTag";
import { calculate, formatRub } from "../lib/calculator";
import type {
  BoxType,
  FloorType,
  FinishType,
  EngineeringKey,
} from "../data/pricing";

const BOX_OPTIONS: Array<{ value: BoxType; label: string; hint: string }> = [
  { value: "monolith", label: "Монолит", hint: "Самый прочный, наш профиль" },
  { value: "aerated", label: "Газобетон", hint: "Оптимально по цене" },
  { value: "brick", label: "Кирпич", hint: "Классика, дольше срок" },
];

const FLOOR_OPTIONS: Array<{ value: FloorType; label: string }> = [
  { value: "one", label: "1 этаж" },
  { value: "two", label: "2 этажа" },
  { value: "twoAttic", label: "2 + мансарда" },
];

const FINISH_OPTIONS: Array<{ value: FinishType; label: string; hint: string }> =
  [
    { value: "rough", label: "Под чистовую", hint: "Стены готовы под обои" },
    { value: "full", label: "Под ключ", hint: "Заехали и живёте" },
  ];

const ENGINEERING_OPTIONS: Array<{ key: EngineeringKey; label: string }> = [
  { key: "warmFloor", label: "Тёплый пол" },
  { key: "boilerRoom", label: "Котельная" },
  { key: "sewer", label: "Канализация" },
  { key: "well", label: "Скважина" },
];

export default function Calculator() {
  const [area, setArea] = useState(280);
  const [boxType, setBoxType] = useState<BoxType>("monolith");
  const [floorType, setFloorType] = useState<FloorType>("two");
  const [finishType, setFinishType] = useState<FinishType>("rough");
  const [engineering, setEngineering] = useState<EngineeringKey[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const result = useMemo(
    () =>
      calculate({ area, boxType, floorType, finishType, engineering }),
    [area, boxType, floorType, finishType, engineering]
  );

  const toggleEng = (key: EngineeringKey) => {
    setEngineering((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/cottage/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          phone,
          area,
          boxType,
          floorType,
          finishType,
          engineering,
          total: result.total,
        }),
      });
      if (!res.ok) {
        const { error } = await res.json().catch(() => ({}));
        throw new Error(error || "Ошибка отправки");
      }
      setSubmitted(true);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Ошибка отправки");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="py-24 lg:py-36 px-6 lg:px-16 bg-[#fafaf7]" id="calculator">
      <div className="max-w-[1440px] mx-auto">
        <SectionTag number="08 / 11" label="КАЛЬКУЛЯТОР" />
        <h2
          className="font-[family-name:var(--font-display)] font-extrabold tracking-[-0.04em] leading-[0.95] mt-6 max-w-3xl"
          style={{ fontSize: "clamp(28px, 4.5vw, 56px)" }}
        >
          Прикинем смету<br />
          <span className="bg-[#ffd400] px-2 inline-block">прямо сейчас.</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-6 mt-12">
          {/* Левая часть — параметры */}
          <div className="bg-white border border-black/10 p-6 lg:p-10 space-y-8">
            {/* Площадь */}
            <div>
              <label className="font-mono text-[10px] tracking-widest uppercase opacity-60">
                Площадь · {area} м²
              </label>
              <input
                type="range"
                min={100}
                max={500}
                step={10}
                value={area}
                onChange={(e) => setArea(Number(e.target.value))}
                className="w-full mt-3 accent-[#ffd400]"
              />
              <div className="flex justify-between font-mono text-[9px] opacity-50 mt-1">
                <span>100</span>
                <span>500</span>
              </div>
            </div>

            {/* Тип коробки */}
            <RadioGroup
              label="Тип коробки"
              options={BOX_OPTIONS.map((o) => ({
                value: o.value,
                label: o.label,
                hint: o.hint,
              }))}
              value={boxType}
              onChange={(v) => setBoxType(v as BoxType)}
            />

            {/* Этажность */}
            <RadioGroup
              label="Этажность"
              options={FLOOR_OPTIONS}
              value={floorType}
              onChange={(v) => setFloorType(v as FloorType)}
            />

            {/* Отделка */}
            <RadioGroup
              label="Отделка"
              options={FINISH_OPTIONS.map((o) => ({
                value: o.value,
                label: o.label,
                hint: o.hint,
              }))}
              value={finishType}
              onChange={(v) => setFinishType(v as FinishType)}
            />

            {/* Инженерия */}
            <div>
              <div className="font-mono text-[10px] tracking-widest uppercase opacity-60">
                Инженерия
              </div>
              <div className="grid grid-cols-2 gap-2 mt-3">
                {ENGINEERING_OPTIONS.map((o) => {
                  const checked = engineering.includes(o.key);
                  return (
                    <button
                      key={o.key}
                      type="button"
                      onClick={() => toggleEng(o.key)}
                      className={`px-4 py-3 text-left border transition ${
                        checked
                          ? "bg-[#0a0a0a] text-[#fafaf7] border-[#0a0a0a]"
                          : "bg-white border-black/15 hover:border-black/40"
                      }`}
                    >
                      <span className="font-mono text-[10px] tracking-widest opacity-60 block">
                        {checked ? "✓" : "○"}
                      </span>
                      <span className="font-bold text-sm">{o.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Правая часть — итог + форма */}
          <aside className="bg-[#0a0a0a] text-[#fafaf7] p-6 lg:p-10 sticky lg:top-8 self-start">
            <div className="font-mono text-[10px] tracking-widest text-[#ffd400]">
              ОРИЕНТИРОВОЧНО
            </div>
            <div
              className="font-[family-name:var(--font-display)] font-extrabold leading-none mt-3"
              style={{ fontSize: "clamp(36px, 5vw, 64px)" }}
            >
              {formatRub(result.total)}
            </div>
            <div className="font-mono text-[10px] tracking-widest text-white/60 mt-2">
              {area} М² · {BOX_OPTIONS.find((b) => b.value === boxType)?.label}
            </div>
            <p className="text-xs text-white/50 mt-6 leading-relaxed">
              Точная смета — после выезда инженера на участок. Бесплатно.
            </p>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="mt-6 space-y-3">
                <input
                  type="tel"
                  placeholder="Телефон"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/15 text-white placeholder-white/40 focus:outline-none focus:border-[#ffd400]"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/15 text-white placeholder-white/40 focus:outline-none focus:border-[#ffd400]"
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-[#ffd400] text-[#0a0a0a] py-4 font-bold tracking-widest text-sm hover:bg-[#ffea00] disabled:opacity-50 transition"
                >
                  {submitting ? "ОТПРАВКА..." : "ПОЛУЧИТЬ ДЕТАЛЬНУЮ СМЕТУ"}
                </button>
              </form>
            ) : (
              <div className="mt-6 p-4 border border-[#ffd400] text-[#ffd400] font-mono text-xs">
                ✓ ОТПРАВЛЕНО. МЫ СВЯЖЕМСЯ В ТЕЧЕНИЕ 24 ЧАСОВ.
              </div>
            )}
          </aside>
        </div>
      </div>
    </section>
  );
}

function RadioGroup<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: Array<{ value: T; label: string; hint?: string }>;
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div>
      <div className="font-mono text-[10px] tracking-widest uppercase opacity-60">
        {label}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-3">
        {options.map((o) => (
          <button
            key={o.value}
            type="button"
            onClick={() => onChange(o.value)}
            className={`px-4 py-3 text-left border transition ${
              value === o.value
                ? "bg-[#0a0a0a] text-[#fafaf7] border-[#0a0a0a]"
                : "bg-white border-black/15 hover:border-black/40"
            }`}
          >
            <div className="font-bold text-sm">{o.label}</div>
            {o.hint && (
              <div
                className={`text-[10px] mt-1 ${
                  value === o.value ? "text-white/60" : "text-black/50"
                }`}
              >
                {o.hint}
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Подключить + проверить**

```tsx
import Calculator from "./components/Calculator";
// ...
<PortfolioGrid />
<Calculator />
```

В браузере: ползунок площади и переключатели обновляют цену в реальном времени. Форма пока не отправляется (API в следующей задаче).

- [ ] **Step 3: Commit**

```bash
git add src/app/cottage/
git commit -m "feat(cottage): add interactive calculator UI"
```

---

### Task 12: Cottage Quote API

**Files:**
- Create: `src/app/api/cottage/quote/route.ts`

- [ ] **Step 1: Прочитать паттерн существующего contact API**

```bash
cat src/app/api/contact/route.ts
```

Использовать те же паттерны: `checkRateLimit`, `escapeHtml`, валидация, nodemailer.

- [ ] **Step 2: Создать route.ts**

```ts
// src/app/api/cottage/quote/route.ts
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const BOX_LABELS: Record<string, string> = {
  monolith: "Монолит",
  aerated: "Газобетон",
  brick: "Кирпич",
};

const FLOOR_LABELS: Record<string, string> = {
  one: "1 этаж",
  two: "2 этажа",
  twoAttic: "2 + мансарда",
};

const FINISH_LABELS: Record<string, string> = {
  rough: "Под чистовую",
  full: "Под ключ",
};

const ENG_LABELS: Record<string, string> = {
  warmFloor: "Тёплый пол",
  boilerRoom: "Котельная",
  sewer: "Канализация",
  well: "Скважина",
};

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request.headers);
    const rl = checkRateLimit(ip);
    if (!rl.ok) {
      return NextResponse.json(
        { error: "Слишком много запросов. Попробуйте позже." },
        {
          status: 429,
          headers: { "Retry-After": String(rl.retryAfter ?? 60) },
        }
      );
    }

    const body = await request.json();
    const {
      email,
      phone,
      area,
      boxType,
      floorType,
      finishType,
      engineering,
      total,
    } = body ?? {};

    if (!email || !phone) {
      return NextResponse.json(
        { error: "Email и телефон обязательны" },
        { status: 400 }
      );
    }
    if (
      typeof area !== "number" ||
      area < 50 ||
      area > 1000 ||
      !BOX_LABELS[boxType] ||
      !FLOOR_LABELS[floorType] ||
      !FINISH_LABELS[finishType] ||
      typeof total !== "number"
    ) {
      return NextResponse.json(
        { error: "Некорректные параметры расчёта" },
        { status: 400 }
      );
    }

    const phoneDigits = String(phone).replace(/\D/g, "");
    if (phoneDigits.length < 11 || phoneDigits.length > 12) {
      return NextResponse.json(
        { error: "Телефон должен содержать от 11 до 12 цифр" },
        { status: 400 }
      );
    }

    const safeEmail = escapeHtml(String(email).trim());
    const safePhone = escapeHtml(String(phone).trim());
    const engList = Array.isArray(engineering)
      ? engineering
          .filter((k): k is string => typeof k === "string" && k in ENG_LABELS)
          .map((k) => ENG_LABELS[k])
          .join(", ") || "—"
      : "—";

    const totalFmt = new Intl.NumberFormat("ru-RU").format(total);

    const transporter = nodemailer.createTransport({
      host: "smtp.mail.ru",
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Лендинг коттеджей ВЕР СТРОЙ" <${process.env.SMTP_USER}>`,
      to: "ver.stroy.company@mail.ru",
      subject: `[Коттедж] Расчёт ${totalFmt} ₽ от ${safePhone}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 560px; padding: 24px; background: #fafaf7;">
          <h2 style="color: #0a0a0a; margin: 0 0 16px;">Заявка с калькулятора /cottage</h2>
          <p style="margin: 8px 0;"><strong>Телефон:</strong> <a href="tel:${safePhone}">${safePhone}</a></p>
          <p style="margin: 8px 0;"><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 16px 0;" />
          <p style="margin: 4px 0;"><strong>Площадь:</strong> ${area} м²</p>
          <p style="margin: 4px 0;"><strong>Коробка:</strong> ${BOX_LABELS[boxType]}</p>
          <p style="margin: 4px 0;"><strong>Этажность:</strong> ${FLOOR_LABELS[floorType]}</p>
          <p style="margin: 4px 0;"><strong>Отделка:</strong> ${FINISH_LABELS[finishType]}</p>
          <p style="margin: 4px 0;"><strong>Инженерия:</strong> ${engList}</p>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 16px 0;" />
          <p style="margin: 8px 0; font-size: 18px;"><strong>Ориентировочно:</strong> ${totalFmt} ₽</p>
          <p style="color: #888; font-size: 11px; margin-top: 16px;">Отправлено с /cottage</p>
        </div>
      `,
    });

    // TODO: продублировать в Telegram-бот через TG_BOT_TOKEN + TG_CHAT_ID
    // (вынести в /lib/telegram.ts если ещё не сделано)

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[/api/cottage/quote]", e);
    return NextResponse.json(
      { error: "Не удалось отправить заявку" },
      { status: 500 }
    );
  }
}
```

- [ ] **Step 3: Smoke-тест API через curl**

Запустить dev (`npm run dev`) и проверить:

```bash
curl -X POST http://localhost:3000/api/cottage/quote \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","phone":"+79991234567","area":280,"boxType":"monolith","floorType":"two","finishType":"rough","engineering":["warmFloor"],"total":20060000}'
```

Expected: `{"ok":true}` (если SMTP настроен) или ошибка SMTP в логах при `SMTP_PASS` не настроенном — это OK для локальной разработки.

Проверить валидацию:

```bash
curl -X POST http://localhost:3000/api/cottage/quote \
  -H "Content-Type: application/json" \
  -d '{}'
```

Expected: `{"error":"Email и телефон обязательны"}` со статусом 400.

- [ ] **Step 4: Проверить отправку из UI**

В браузере: открыть `/cottage`, прокрутить до калькулятора, заполнить форму, отправить. Должен появиться success-state «✓ Отправлено».

- [ ] **Step 5: Commit**

```bash
git add src/app/api/cottage/
git commit -m "feat(cottage): add /api/cottage/quote endpoint with validation and email"
```

---

## Phase 5: Bottom Sections

### Task 13: Team (секция 09)

**Files:**
- Create: `src/app/cottage/data/team.ts`
- Create: `src/app/cottage/components/Team.tsx`
- Modify: `src/app/cottage/page.tsx`

- [ ] **Step 1: Создать data/team.ts с заглушками**

```ts
// src/app/cottage/data/team.ts
export type TeamMember = {
  name: string;
  role: string;
  experience: string;
  objects: string[];
  photo: string | null; // null = заглушка
};

export const TEAM: TeamMember[] = [
  {
    name: "Имя Прораб",
    role: "Главный прораб",
    experience: "12+ лет в монолите",
    objects: ["ТЦ Вера", "Елькина 12", "ЖК Good Style"],
    photo: null,
  },
  {
    name: "Имя Прораб",
    role: "Прораб по фасаду",
    experience: "8+ лет в фасадных работах",
    objects: ["ЛУКОЙЛ Усинск", "ЛУКОЙЛ Нижний Одесс", "Школа Верещагино"],
    photo: null,
  },
  {
    name: "Имя Инженер",
    role: "Инженер ПТО",
    experience: "10+ лет проектирование",
    objects: ["ТЦ Вера", "ОЗОН", "ФОК"],
    photo: null,
  },
];
```

> Реальные имена и фото предоставляет ВЕР СТРОЙ. До получения данных — заглушки в blueprint-стиле.

- [ ] **Step 2: Создать Team.tsx**

```tsx
// src/app/cottage/components/Team.tsx
import Image from "next/image";
import SectionTag from "./SectionTag";
import { TEAM } from "../data/team";

export default function Team() {
  return (
    <section className="py-24 lg:py-36 px-6 lg:px-16 bg-[#fafaf7]">
      <div className="max-w-[1440px] mx-auto">
        <SectionTag number="09 / 11" label="ПРОРАБЫ" />
        <h2
          className="font-[family-name:var(--font-display)] font-extrabold tracking-[-0.04em] leading-[0.95] mt-6 max-w-3xl"
          style={{ fontSize: "clamp(28px, 4.5vw, 56px)" }}
        >
          Ваш прораб —<br />
          <span className="bg-[#ffd400] px-2 inline-block">вот он.</span>
        </h2>
        <p className="text-sm text-black/60 mt-3 max-w-xl">
          Один человек ведёт стройку от котлована до ключей. Знакомитесь до подписания
          договора.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
          {TEAM.map((m, i) => (
            <article key={i} className="bg-white border border-black/10 overflow-hidden">
              <div className="relative aspect-[4/5] bg-gradient-to-br from-[#2a2a2a] to-[#0a0a0a] flex items-center justify-center">
                {m.photo ? (
                  <Image
                    src={m.photo}
                    alt={m.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="text-center text-[#d4b483]/60 font-mono text-[10px] tracking-widest">
                    [ PHOTO PENDING ]
                  </div>
                )}
                <div className="absolute top-4 left-4 right-4 flex justify-between font-mono text-[9px] tracking-widest text-[#ffd400]">
                  <span>VER STROY</span>
                  <span>0{i + 1}</span>
                </div>
              </div>
              <div className="p-6">
                <div className="font-mono text-[10px] tracking-widest opacity-50">
                  {m.role.toUpperCase()}
                </div>
                <h3 className="font-[family-name:var(--font-display)] font-extrabold text-xl mt-2">
                  {m.name}
                </h3>
                <div className="font-mono text-[11px] mt-3 bg-[#ffd400] inline-block px-2 py-0.5">
                  {m.experience}
                </div>
                <div className="mt-4 text-xs text-black/60">
                  <strong>Объекты:</strong> {m.objects.join(" · ")}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Подключить + commit**

```tsx
import Team from "./components/Team";
// ...
<Calculator />
<Team />
```

```bash
git add src/app/cottage/
git commit -m "feat(cottage): add team section with placeholders"
```

---

### Task 14: FAQ (секция 10)

**Files:**
- Create: `src/app/cottage/data/faq.ts`
- Create: `src/app/cottage/components/FAQ.tsx`
- Modify: `src/app/cottage/page.tsx`

- [ ] **Step 1: Создать data/faq.ts**

```ts
// src/app/cottage/data/faq.ts
export type FaqItem = { q: string; a: string };

export const FAQ_ITEMS: FaqItem[] = [
  {
    q: "Сколько стоит дом 200 м²?",
    a: "Зависит от типа коробки и отделки. Монолит под чистовую — от 12 млн ₽. Газобетон — от 9 млн ₽. Под ключ +25%. Точная смета — после выезда инженера на ваш участок (бесплатно).",
  },
  {
    q: "Сколько идёт строительство?",
    a: "От 6 до 9 месяцев для коттеджа 200–300 м² «под ключ». 6 месяцев — если простая геометрия и нет сложной отделки. 9 месяцев — премиум-отделка и сложная инженерия.",
  },
  {
    q: "Что входит в фикс-смету, а что нет?",
    a: "В фикс-смете: все работы и материалы по утверждённому проекту. Не входит: изменения проекта по вашей инициативе, дополнительные работы вне ТЗ. Все доплаты согласовываются актом перед выполнением.",
  },
  {
    q: "Какие гарантии после сдачи?",
    a: "5 лет гарантии на конструкцию по 7-ФЗ. 1 год на отделку и инженерию. Все гарантийные обязательства фиксируются в договоре.",
  },
  {
    q: "Можно ли посмотреть текущие стройки?",
    a: "Да. Возим заказчиков на ТЦ Вера в Верещагино и Елькина 12 в Перми. Договариваемся о визите за день.",
  },
  {
    q: "Работаете в моём городе?",
    a: "Базовый радиус — Пермь и 200 км вокруг. Также работаем в Екатеринбурге, Челябинске, Тюмени, Уфе. Дальние объекты обсуждаются индивидуально.",
  },
  {
    q: "Кто отвечает за качество, если уволится прораб?",
    a: "Прораб — штатный сотрудник, не подрядчик. Если по форс-мажору меняем прораба, новый получает полный передаточный пакет. Качество гарантирует ООО ВЕР СТРОЙ как юрлицо, а не конкретный человек.",
  },
];
```

- [ ] **Step 2: Создать FAQ.tsx (нативный `<details>` для доступности)**

```tsx
// src/app/cottage/components/FAQ.tsx
import SectionTag from "./SectionTag";
import { FAQ_ITEMS } from "../data/faq";

export default function FAQ() {
  return (
    <section className="py-24 lg:py-36 px-6 lg:px-16 bg-[#fafaf7]">
      <div className="max-w-[1100px] mx-auto">
        <SectionTag number="10 / 11" label="ВОПРОСЫ" />
        <h2
          className="font-[family-name:var(--font-display)] font-extrabold tracking-[-0.04em] leading-[0.95] mt-6"
          style={{ fontSize: "clamp(28px, 4.5vw, 56px)" }}
        >
          Что обычно спрашивают.
        </h2>

        <div className="mt-12 divide-y divide-black/10 border-t border-b border-black/10">
          {FAQ_ITEMS.map((item, i) => (
            <details key={i} className="group">
              <summary className="cursor-pointer py-6 flex items-start gap-6 select-none list-none">
                <span className="font-mono text-[11px] tracking-widest opacity-50 shrink-0 mt-1.5">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex-1 font-bold text-lg leading-snug">
                  {item.q}
                </span>
                <span className="font-mono text-xl shrink-0 mt-1 transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="pl-[64px] pr-6 pb-6 text-sm text-black/70 leading-relaxed">
                {item.a}
              </p>
            </details>
          ))}
        </div>

        <div className="mt-12 flex flex-col sm:flex-row gap-3">
          <a
            href="/договор-образец.pdf"
            className="inline-flex items-center gap-2 px-5 py-3 border border-black/15 hover:border-black/40 font-mono text-[11px] tracking-widest uppercase transition"
          >
            ↓ Скачать образец договора
          </a>
          <a
            href="#cta"
            className="inline-flex items-center gap-2 px-5 py-3 bg-[#0a0a0a] text-white font-mono text-[11px] tracking-widest uppercase hover:bg-[#1a1a1a] transition"
          >
            → Задать свой вопрос
          </a>
        </div>
      </div>
    </section>
  );
}
```

> Файл `/договор-образец.pdf` — отдельная задача (генерируется через `make-contract`). До получения PDF — оставляем ссылку, при 404 пользователь увидит стандартную страницу.

- [ ] **Step 3: Подключить + commit**

```tsx
import FAQ from "./components/FAQ";
// ...
<Team />
<FAQ />
```

```bash
git add src/app/cottage/
git commit -m "feat(cottage): add FAQ accordion with 7 items"
```

---

### Task 15: Final CTA Form (секция 11)

**Files:**
- Create: `src/app/cottage/components/CtaForm.tsx`
- Modify: `src/app/cottage/page.tsx`

- [ ] **Step 1: Создать CtaForm.tsx**

```tsx
// src/app/cottage/components/CtaForm.tsx
"use client";

import { useState } from "react";
import BlueprintGrid from "./BlueprintGrid";
import SectionTag from "./SectionTag";

export default function CtaForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [area, setArea] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          // existing /api/contact игнорирует доп. поля — это OK,
          // расширенные поля обрабатывает /api/cottage/quote из калькулятора
          source: "cottage-landing",
          email,
          area,
          message,
        }),
      });
      if (!res.ok) {
        const { error } = await res.json().catch(() => ({}));
        throw new Error(error || "Ошибка отправки");
      }
      setSubmitted(true);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Ошибка");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="cta"
      className="relative py-24 lg:py-36 px-6 lg:px-16 bg-[#0a0a0a] text-[#fafaf7] overflow-hidden"
    >
      <BlueprintGrid color="#ffd400" opacity={0.05} cellSize={40} />
      <div className="relative max-w-[1100px] mx-auto">
        <SectionTag number="11 / 11" label="ЗАЯВКА" className="text-[#ffd400] opacity-100" />
        <h2
          className="font-[family-name:var(--font-display)] font-extrabold tracking-[-0.04em] leading-[0.95] mt-6"
          style={{ fontSize: "clamp(36px, 6vw, 80px)" }}
        >
          Расчёт сметы<br />
          <span className="bg-[#ffd400] text-[#0a0a0a] px-3 inline-block">за 24 часа.</span>
        </h2>
        <p className="text-white/60 mt-4 max-w-2xl">
          Бесплатно. Без обязательств. Подпишем NDA по запросу.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-10 mt-12">
          {/* Форма */}
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Field label="Имя" value={name} onChange={setName} required />
              <Field label="Телефон" type="tel" value={phone} onChange={setPhone} required />
              <Field label="Email" type="email" value={email} onChange={setEmail} />
              <Field label="Площадь дома, м²" value={area} onChange={setArea} />
              <div>
                <label className="font-mono text-[10px] tracking-widest uppercase text-white/50">
                  Сообщение
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full mt-2 px-4 py-3 bg-white/5 border border-white/15 text-white placeholder-white/30 focus:outline-none focus:border-[#ffd400]"
                />
              </div>
              {/* TODO: Yandex SmartCaptcha widget — подключить когда ключ доступен */}
              <button
                type="submit"
                disabled={submitting}
                className="bg-[#ffd400] text-[#0a0a0a] px-8 py-4 font-bold tracking-widest text-sm hover:bg-[#ffea00] disabled:opacity-50 transition"
              >
                {submitting ? "ОТПРАВКА..." : "ОТПРАВИТЬ ЗАЯВКУ →"}
              </button>
            </form>
          ) : (
            <div className="border border-[#ffd400] p-8">
              <div className="font-mono text-[10px] tracking-widest text-[#ffd400]">
                STATUS / SUBMITTED
              </div>
              <h3 className="font-[family-name:var(--font-display)] font-extrabold text-3xl mt-3">
                Заявка получена.
              </h3>
              <p className="text-white/70 mt-3">
                Мы свяжемся с вами в течение 24 часов.
              </p>
            </div>
          )}

          {/* Контакты */}
          <aside className="space-y-3">
            <ContactBlock
              tag="ТЕЛЕФОН"
              href="tel:+79504511611"
              label="+7 950 451 16 11"
            />
            <ContactBlock
              tag="TELEGRAM"
              href="https://t.me/verstroy"
              label="@verstroy"
            />
            <ContactBlock
              tag="EMAIL"
              href="mailto:ver.stroy.company@mail.ru"
              label="ver.stroy.company@mail.ru"
            />
            <ContactBlock
              tag="ОФИС"
              href="#"
              label="г. Пермь, ул. Монастырская, 12, оф. 407"
            />
          </aside>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  type = "text",
  value,
  onChange,
  required = false,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}) {
  return (
    <div>
      <label className="font-mono text-[10px] tracking-widest uppercase text-white/50">
        {label}
        {required ? " *" : ""}
      </label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full mt-2 px-4 py-3 bg-white/5 border border-white/15 text-white placeholder-white/30 focus:outline-none focus:border-[#ffd400]"
      />
    </div>
  );
}

function ContactBlock({
  tag,
  href,
  label,
}: {
  tag: string;
  href: string;
  label: string;
}) {
  return (
    <a
      href={href}
      className="block border border-white/15 p-5 hover:border-[#ffd400] transition group"
    >
      <div className="font-mono text-[10px] tracking-widest text-[#ffd400]">
        {tag}
      </div>
      <div className="mt-2 font-bold text-lg group-hover:text-[#ffd400] transition">
        {label}
      </div>
    </a>
  );
}
```

> Yandex SmartCaptcha интегрируется отдельной задачей, когда подключим. До этого — форма работает без капчи (rate limiting на API защищает от очевидных атак).

- [ ] **Step 2: Подключить + проверить полную страницу**

```tsx
import CtaForm from "./components/CtaForm";
// ...
<FAQ />
<CtaForm />
```

В браузере: проскроллить весь лендинг сверху до низа, проверить:
- Все 11 секций отрисовываются
- На якорь `#cta` (клик «Расчёт за 24 часа» в hero) скроллится к финальной форме
- На мобиле всё читается

- [ ] **Step 3: Commit**

```bash
git add src/app/cottage/
git commit -m "feat(cottage): add final CTA form with contact blocks"
```

---

## Phase 6: Integration & Polish

### Task 16: SEO + JSON-LD + sitemap

**Files:**
- Modify: `src/app/cottage/page.tsx`
- Modify: `src/app/sitemap.ts`

- [ ] **Step 1: Расширить metadata + JSON-LD в page.tsx**

Заменить текущий блок metadata в `src/app/cottage/page.tsx`:

```tsx
const SITE_URL = "https://xn--b1agmtjagi.xn--p1ai";

export const metadata: Metadata = {
  title: "Строительство коттеджей под ключ от 200 м² — ВЕР СТРОЙ, Пермь",
  description:
    "Строим премиум-коттеджи с тем же качеством, что и торговые центры. 6+ лет, 15+ объектов, своя опалубка и бригады. Расчёт сметы за 24 часа.",
  alternates: { canonical: `${SITE_URL}/cottage` },
  openGraph: {
    title: "ВЕР СТРОЙ — премиум-коттеджи под ключ",
    description: "Прочность торгового центра. В вашем доме.",
    url: `${SITE_URL}/cottage`,
    type: "website",
    images: [
      {
        url: `${SITE_URL}/cottage/og.jpg`, // подгрузим в Task 17
        width: 1200,
        height: 630,
        alt: "ВЕР СТРОЙ — премиум-коттеджи",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ВЕР СТРОЙ — премиум-коттеджи под ключ",
    description: "Прочность торгового центра. В вашем доме.",
    images: [`${SITE_URL}/cottage/og.jpg`],
  },
  robots: { index: true, follow: true },
};
```

В body страницы перед `<Hero />` вставить JSON-LD:

```tsx
const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${SITE_URL}/cottage#service`,
      name: "Строительство премиум-коттеджей под ключ от 200 м²",
      description:
        "Полный цикл от проекта до ключей. Монолит, газобетон, кирпич. 6–9 месяцев. Опыт 15+ коммерческих объектов.",
      provider: { "@id": `${SITE_URL}/#organization` },
      areaServed: [
        { "@type": "City", name: "Пермь" },
        { "@type": "City", name: "Екатеринбург" },
        { "@type": "City", name: "Челябинск" },
        { "@type": "City", name: "Тюмень" },
      ],
      url: `${SITE_URL}/cottage`,
    },
  ],
};

// В <main>:
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
/>
```

- [ ] **Step 2: Добавить /cottage в sitemap**

```bash
cat src/app/sitemap.ts
```

Добавить запись:

```ts
{
  url: `${SITE_URL}/cottage`,
  lastModified: new Date(),
  changeFrequency: "monthly",
  priority: 0.9,
},
```

- [ ] **Step 3: Build + проверка sitemap.xml**

```bash
npm run build && npm run start
```

В отдельном терминале:
```bash
curl http://localhost:3000/sitemap.xml | grep cottage
```

Expected: видна запись `<loc>https://xn--b1agmtjagi.xn--p1ai/cottage</loc>`.

- [ ] **Step 4: Commit**

```bash
git add src/app/
git commit -m "feat(cottage): add SEO metadata, JSON-LD service schema, sitemap entry"
```

---

### Task 17: AI prompts для Nano Banana Pro / GPT Image 2

**Files:**
- Create: `docs/cottage-ai-prompts.md`

- [ ] **Step 1: Создать docs/cottage-ai-prompts.md**

```markdown
# AI-фото для лендинга /cottage

5 промптов для Nano Banana Pro (Google Gemini Image) или GPT Image 2 (OpenAI).
Все фото — в едином стиле: тёплая цветовая температура (4500–5500K), плёночное зерно,
архитектурная фотография в стиле Architectural Digest.

## Общие правила (вшивать в каждый промпт)

- Photography style: editorial architectural photography, AD magazine, Iwan Baan school
- Lighting: golden hour or overcast natural light, soft shadows, no harsh sun
- Camera: full-frame, 35mm or 50mm, slight grain, ISO 400 look
- Mood: serious, premium, restrained, no flashy artifacts
- Negative: no purple gradients, no AI-glow, no over-saturation, no fish-eye, no fake people, no text overlays, no logos, no toy-like aesthetics

## 1. Hero (16:9, 1920×1080)

> Premium two-story modern cottage, 280 m², monolithic concrete structure with warm wood cladding accents on facade, large floor-to-ceiling windows, exposed structural details, set on Ural region landscape (pine forest in background, slight mist), golden hour lighting, low-angle wide shot, architectural photography in style of Iwan Baan / AD magazine, restrained color palette of warm grays, charcoal, oak wood, slight 35mm grain, photorealistic, no people, no logos.

**Назначение:** правая колонка hero-секции.
**Файл:** `public/cottage/hero.webp` + `hero@2x.webp`

## 2. Сравнение «коттедж» (1:1, 1200×1200)

> Close-up of a monolithic concrete cottage under construction, exposed reinforcement bars (rebar) and yellow formwork (opalubka), construction details with industrial precision, similar visual language to commercial concrete construction, captured during golden hour, slight overcast, photographic realism, no workers visible, no AI artifacts, restrained palette of concrete gray + safety yellow + steel rust accents.

**Назначение:** правая карточка в секции 02 «ТЦ ↔ дом».
**Файл:** `public/cottage/comparison-cottage.webp`

## 3. Премиум-фасад (4:5, 1200×1500)

> Detail shot of a premium ventilated facade panel, mix of warm wood slats and matte dark grey composite panels, sharp shadow lines, late afternoon side light revealing texture, architectural photography style, slight grain, no logos, no people, restrained warm color palette.

**Назначение:** декоративная вставка в секции 05 «Принципы» (если потребуется доп. визуал).
**Файл:** `public/cottage/principle-facade.webp`

## 4. CTA фон (16:9, 1920×1080, очень тёмный)

> Silhouette of a modern two-story cottage at deep dusk, only outlines visible, monochrome blue-black palette, no warm lights inside, gritty cinematic atmosphere, fog, slight grain, architectural shot style, no logos, no people, very dark — image will be overlaid with text and yellow grid.

**Назначение:** фон финальной секции 11 (полупрозрачный overlay).
**Файл:** `public/cottage/cta-bg.webp`

## 5. OG-картинка (1200×630)

> Wide architectural editorial shot of a premium concrete-and-wood cottage exterior, golden hour, two-story, set in Ural pine forest, restrained warm color palette, focus on materials and structure, AD magazine photography, no logos, no people, slight grain. Text-safe zones: left third for headline overlay, right third for image focus.

**Назначение:** Open Graph для соцсетей и поиска.
**Файл:** `public/cottage/og.jpg` (jpg для совместимости с парсерами)

## Workflow

1. Скопируй промпт в Nano Banana Pro или GPT Image 2.
2. Сгенерируй 4–6 вариантов на каждый промпт.
3. Выбери лучший. Не нравится — итерируй промпт (поправь палитру, ракурс).
4. Скачай в максимальном разрешении.
5. Сохрани в `public/cottage/<имя>.webp` (для webp используй `cwebp` или онлайн-конвертер).
6. Размер: hero ≤ 600 KB, comparison ≤ 400 KB, OG ≤ 200 KB.
7. Альт-текст для каждого: см. компоненты (свойство `alt` на `<Image>`).

## Что заменить в коде после генерации

| Файл | Что заменить |
|---|---|
| `src/app/cottage/components/Hero.tsx` | `[ AI HERO PHOTO 16:9 ]` placeholder → `<Image src="/cottage/hero.webp" ... />` |
| `src/app/cottage/components/Comparison.tsx` | `[ AI: КОТТЕДЖ · ОПАЛУБКА ]` → `<Image src="/cottage/comparison-cottage.webp" />` + реальное фото колонн ТЦ для левой карточки |
| `src/app/cottage/components/CtaForm.tsx` | Можно добавить фон через CSS `background-image: url(/cottage/cta-bg.webp)` поверх blueprint-grid |
| `src/app/cottage/page.tsx` (metadata) | OG image уже ссылается на `/cottage/og.jpg` |
```

- [ ] **Step 2: Commit**

```bash
git add docs/cottage-ai-prompts.md
git commit -m "docs(cottage): add AI image prompts for Nano Banana Pro / GPT Image 2"
```

---

### Task 18: Финальная проверка и `/design-check`

**Files:**
- Возможные мелкие правки в любых компонентах после ревью

- [ ] **Step 1: Полный build**

```bash
cd "/Users/nikita/Desktop/ВЕР СТРОЙ САЙТ/verstroy-site" && npm run lint && npm run build
```

Expected: 0 ошибок, 0 warning. Build proceeds, размер /cottage chunk виден.

Если есть warnings — исправить.

- [ ] **Step 2: Запустить prod-режим и пройти весь лендинг**

```bash
npm run start
```

Открыть `http://localhost:3000/cottage`. Пройти:
- Все 11 секций отрисовываются
- Hero CTA ведёт к секции #cta (smooth scroll)
- Интерактивный blueprint узлы — hover/click работает
- Калькулятор пересчитывает в реальном времени, форма отправляется
- FAQ-аккордеон раскрывается
- Финальная форма отправляется
- На мобиле (DevTools 360px / 768px / 1024px) ничего не ломается

- [ ] **Step 3: Lighthouse**

В Chrome DevTools → Lighthouse → запустить для `/cottage`:
- Performance ≥ 90
- Accessibility ≥ 95
- Best Practices ≥ 95
- SEO ≥ 95

Если меньше — исправить узкие места (обычно: alt-тексты, meta, размеры изображений).

- [ ] **Step 4: Запустить `/design-check`**

Команда определена в проекте (см. `.claude/docs/commands.md`). Запустить:

```
/design-check
```

Это запускает 4 агента параллельно (дизайнер → копирайтер → кодер → босс) для проверки лендинга. Учесть замечания, исправить блокеры.

- [ ] **Step 5: Smoke-тест калькулятора ещё раз**

```bash
npx tsx scripts/test-calculator.mjs
```

Expected: `All tests passed`.

- [ ] **Step 6: Финальный commit**

```bash
git add -A
git commit -m "chore(cottage): final polish and design-check fixes" --allow-empty
```

(`--allow-empty` если правок не было.)

---

## Self-Review

Самопроверка плана против спецификации:

**Spec coverage:**
- ✓ Цели и аудитория — отражены в Task 1 (метаданные) и в нарративе всех секций
- ✓ Архитектура — Task 1 (маршрут), Task 12 (API)
- ✓ Дизайн-система (цвета, шрифты, сетка) — Task 1 (шрифты), Task 2 (BlueprintGrid), цвета хардкодом в каждом компоненте (это нормально для одного лендинга, можно вынести в Tailwind config позже)
- ✓ 11 секций — Tasks 3, 4, 5, 6, 7, 8, 9, 11, 13, 14, 15
- ✓ AI-фото — Task 17
- ✓ Адаптивность — встроено в каждую секцию через Tailwind responsive классы
- ✓ Доступность — `tabindex`, `role="button"`, нативный `<details>`, focus-стили
- ✓ Производительность — Task 18 Lighthouse
- ✓ SEO/JSON-LD/sitemap — Task 16
- ✓ YAGNI — нет видео, 3D, чата, блога

**Placeholder scan:**
- TODO в коде есть (заменить плейсхолдеры на AI-фото после генерации) — это explicit, не «реализовать позже»
- Все шаги имеют конкретный код или команду
- Нет «add appropriate validation» без кода
- API route имеет полную валидацию входа, не «handle errors»

**Type consistency:**
- `BoxType`, `FloorType`, `FinishType`, `EngineeringKey` определены в `pricing.ts`, переиспользуются в `calculator.ts`, `Calculator.tsx`, `route.ts` ✓
- `Principle`, `ProcessStep`, `PortfolioItem`, `TeamMember`, `FaqItem` — каждый имеет свой data-файл, никаких рассогласований
- Имена компонентов: каждый импортируется по одному и тому же пути

**Зависимости между задачами:**
- Task 1 → 2 → 3..15 (последовательно) → 16, 17, 18 (финал)
- Task 11 (Calculator UI) зависит от Task 10 (calculator.ts), 12 (API)
- Task 6 (StatsBar) использует существующий `CountUp` — без зависимостей внутри плана

План полный и реализуемый.
