// src/app/cottage/components/Hero.tsx
"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import BlueprintGrid from "./BlueprintGrid";
import SectionTag from "./SectionTag";

/**
 * Hero «Чертёж морфит в фото».
 *
 * Внешняя секция — 200vh высоты, скролл-контейнер.
 * Внутри sticky-блок 100vh с шестью наложенными слоями, каждый из которых
 * проявляется/выцветает по scroll-progress секции. Заголовок зафиксирован
 * на всех стадиях морфа.
 *
 * Прогресс по слоям (scroll progress 0 → 1):
 *   0.00–0.15  чертёж (SVG, lvl 100% opacity)
 *   0.15–0.35  + бетон fade-in
 *   0.35–0.55  + дерево fade-in
 *   0.55–0.75  + окна и свет fade-in
 *   0.75–1.00  + финальное фото; чертёж выцветает до 5%
 *
 * Если у пользователя `prefers-reduced-motion: reduce`, морф выключается
 * и сразу показывается финальный кадр.
 *
 * На мобиле (< lg) sticky-морф выключён ради производительности — отдаётся
 * упрощённый вариант с финальным кадром и заголовком.
 */
export default function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Слой 2 — бетон: появляется на 0.15, полностью видим к 0.35
  const concreteOpacity = useTransform(scrollYProgress, [0.15, 0.35], [0, 1]);
  // Слой 3 — дерево: 0.35 → 0.55
  const woodOpacity = useTransform(scrollYProgress, [0.35, 0.55], [0, 1]);
  // Слой 4 — окна и золотистый свет: 0.55 → 0.75
  const windowsOpacity = useTransform(scrollYProgress, [0.55, 0.75], [0, 1]);
  // Слой 5 — атмосфера / grain: проявляется параллельно с окнами и держится
  const atmosphereOpacity = useTransform(scrollYProgress, [0.6, 0.85], [0, 1]);
  // Слой 6 — финальное AI-фото: 0.75 → 1
  const photoOpacity = useTransform(scrollYProgress, [0.75, 1], [0, 1]);
  // Чертёж: к концу выцветает до 5%, остаётся техническим «водяным знаком»
  const blueprintOpacity = useTransform(scrollYProgress, [0.7, 1], [1, 0.05]);

  // Финальные значения, если морф выключен (reduced motion)
  const isReduced = prefersReducedMotion === true;

  return (
    <>
      {/* ──────────────────────────────────────────────────────────────── */}
      {/* DESKTOP / TABLET: scroll-driven морф                              */}
      {/* ──────────────────────────────────────────────────────────────── */}
      <section
        ref={sectionRef}
        className="relative hidden lg:block h-[200vh]"
        aria-label="Hero: чертёж превращается в фото коттеджа"
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#fafaf7]">
          {/* Слой 1 — SVG-чертёж на blueprint-сетке */}
          <motion.div
            aria-hidden
            className="absolute inset-0"
            style={{ opacity: isReduced ? 0.05 : blueprintOpacity }}
          >
            <BlueprintGrid opacity={0.08} cellSize={40} />
            <BlueprintLayer />
          </motion.div>

          {/* Слой 2 — бетон (close-up). TODO: заменить градиент на фото
              `public/cottage/morph-concrete.webp` (см. docs/cottage-ai-prompts.md §6) */}
          <motion.div
            aria-hidden
            className="absolute inset-0"
            style={{ opacity: isReduced ? 1 : concreteOpacity }}
          >
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, #3a3a38 0%, #1a1a18 100%)",
              }}
            />
            {/* грейн через radial noise + svg turbulence */}
            <div
              className="absolute inset-0 mix-blend-overlay"
              style={{
                backgroundImage:
                  "radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.10) 0%, transparent 55%), radial-gradient(ellipse at 70% 80%, rgba(0,0,0,0.30) 0%, transparent 60%)",
              }}
            />
            <NoiseFilter id="noise-concrete" baseFrequency="0.9" opacity={0.22} />
          </motion.div>

          {/* Слой 3 — дерево / фасад. TODO: заменить на фото
              `public/cottage/morph-wood.webp` (см. docs/cottage-ai-prompts.md §7) */}
          <motion.div
            aria-hidden
            className="absolute inset-0"
            style={{ opacity: isReduced ? 1 : woodOpacity }}
          >
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(135deg, #8b5e3c 0%, #4a2f1c 100%)",
              }}
            />
            <div
              className="absolute inset-0 mix-blend-soft-light"
              style={{
                backgroundImage:
                  "radial-gradient(ellipse at 25% 35%, rgba(255,210,150,0.45) 0%, transparent 50%), radial-gradient(ellipse at 80% 75%, rgba(40,20,5,0.55) 0%, transparent 55%)",
              }}
            />
            {/* вертикальные «доски» вентфасада */}
            <div
              className="absolute inset-0 opacity-30 mix-blend-multiply"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(90deg, rgba(0,0,0,0.35) 0px, rgba(0,0,0,0.35) 1px, transparent 1px, transparent 14px)",
              }}
            />
          </motion.div>

          {/* Слой 4 — окна + золотистое свечение. TODO: заменить на фото
              `public/cottage/morph-windows.webp` (см. docs/cottage-ai-prompts.md §8) */}
          <motion.div
            aria-hidden
            className="absolute inset-0"
            style={{ opacity: isReduced ? 1 : windowsOpacity }}
          >
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(ellipse at 50% 55%, rgba(255,212,90,0.42) 0%, rgba(255,170,40,0.12) 35%, transparent 65%)",
              }}
            />
            {/* лёгкие «оконные» прямоугольники золотого свечения */}
            <div className="absolute inset-0">
              <div
                className="absolute"
                style={{
                  top: "38%",
                  left: "18%",
                  width: "14%",
                  height: "24%",
                  background:
                    "linear-gradient(180deg, rgba(255,220,120,0.55), rgba(255,170,40,0.25))",
                  boxShadow: "0 0 80px 12px rgba(255,200,80,0.35)",
                  filter: "blur(2px)",
                }}
              />
              <div
                className="absolute"
                style={{
                  top: "42%",
                  left: "62%",
                  width: "20%",
                  height: "20%",
                  background:
                    "linear-gradient(180deg, rgba(255,220,120,0.5), rgba(255,170,40,0.2))",
                  boxShadow: "0 0 100px 14px rgba(255,200,80,0.35)",
                  filter: "blur(2px)",
                }}
              />
            </div>
          </motion.div>

          {/* Слой 5 — атмосфера / туман / grain. TODO: заменить на фото
              `public/cottage/morph-atmosphere.webp` (см. docs/cottage-ai-prompts.md §9) */}
          <motion.div
            aria-hidden
            className="absolute inset-0"
            style={{ opacity: isReduced ? 1 : atmosphereOpacity }}
          >
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(80,55,35,0.35) 0%, rgba(15,12,10,0.55) 100%)",
              }}
            />
            <NoiseFilter id="noise-atmosphere" baseFrequency="0.65" opacity={0.18} />
          </motion.div>

          {/* Слой 6 — финальное AI-фото. TODO: заменить placeholder на
              <Image src="/cottage/hero.webp" fill priority alt="..." />
              (см. docs/cottage-ai-prompts.md §1 Hero) */}
          <motion.div
            aria-hidden
            className="absolute inset-0"
            style={{ opacity: isReduced ? 1 : photoOpacity }}
          >
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(135deg, #2a2a2a 0%, #0a0a0a 100%)",
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(ellipse at 50% 65%, rgba(180,140,90,0.30) 0%, transparent 55%), radial-gradient(ellipse at 50% 25%, rgba(20,20,25,0.55) 0%, transparent 70%)",
              }}
            />
            <div className="absolute inset-x-0 bottom-6 text-center font-mono text-[10px] tracking-[0.3em] uppercase text-[#d4b483]/70">
              [ AI HERO PHOTO — final ]
            </div>
          </motion.div>

          {/* Контент — заголовок и метрики, фиксирован поверх всех слоёв */}
          <div className="relative z-10 h-full grid grid-cols-1 lg:grid-cols-[1.1fr_1fr]">
            <div className="px-6 lg:px-16 py-16 flex flex-col justify-center">
              {/* Подложка под текст: лёгкий бекдроп, чтобы текст читался
                  на всех стадиях морфа без потери дизайна */}
              <div className="relative">
                <div
                  aria-hidden
                  className="absolute -inset-x-6 -inset-y-8 -z-10 bg-[#fafaf7]/80 backdrop-blur-[2px]"
                  style={{
                    maskImage:
                      "linear-gradient(90deg, #000 0%, #000 78%, transparent 100%)",
                    WebkitMaskImage:
                      "linear-gradient(90deg, #000 0%, #000 78%, transparent 100%)",
                  }}
                />
                <SectionTag number="01 / 11" label="COTTAGE 200+ M²" />
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  className="font-[family-name:var(--font-display)] font-extrabold tracking-[-0.04em] leading-[0.92] mt-6 text-[#0a0a0a]"
                  style={{ fontSize: "clamp(40px, 7vw, 88px)" }}
                >
                  Прочность<br />
                  торгового<br />
                  <span className="bg-[#ffd400] px-2 inline-block">центра.</span>
                  <br />
                  В вашем доме.
                </motion.h1>
                <p className="mt-7 text-base lg:text-lg leading-relaxed text-black/65 max-w-[420px]">
                  6 лет строим коммерческие объекты по Уралу. Та же опалубка,
                  те же бригады, та же арматура — для вашего коттеджа.
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
            {/* правая колонка — пустая, отдана под визуальный морф */}
            <div aria-hidden />
          </div>

          {/* Координатная плашка снизу */}
          <div className="absolute bottom-4 left-4 right-4 z-10 flex justify-between font-mono text-[9px] uppercase tracking-[0.25em] text-[#0a0a0a]/55">
            <span>N 58° 00&apos; 24&quot;</span>
            <span>VER STROY · COTTAGE 280 M²</span>
            <span>SCROLL ↓</span>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────── */}
      {/* MOBILE: упрощённый статичный кадр (без sticky-морфа)              */}
      {/* ──────────────────────────────────────────────────────────────── */}
      <section
        className="relative lg:hidden grid grid-cols-1 min-h-[88vh]"
        aria-label="Hero: коттедж под ключ"
      >
        <div className="relative px-6 py-16 flex flex-col justify-center">
          <BlueprintGrid />
          <div className="relative">
            <SectionTag number="01 / 11" label="COTTAGE 200+ M²" />
            <h1
              className="font-[family-name:var(--font-display)] font-extrabold tracking-[-0.04em] leading-[0.92] mt-6"
              style={{ fontSize: "clamp(40px, 9vw, 64px)" }}
            >
              Прочность<br />
              торгового<br />
              <span className="bg-[#ffd400] px-2 inline-block">центра.</span>
              <br />
              В вашем доме.
            </h1>
            <p className="mt-6 text-base leading-relaxed text-black/65 max-w-[420px]">
              6 лет строим коммерческие объекты по Уралу. Та же опалубка, те же
              бригады, та же арматура — для вашего коттеджа.
            </p>
            <a
              href="#cta"
              className="inline-flex items-center gap-3 bg-[#0a0a0a] text-[#fafaf7] px-6 py-4 mt-7 font-bold tracking-wider text-sm w-fit"
            >
              РАСЧЁТ ЗА 24 ЧАСА
              <span aria-hidden>→</span>
            </a>
            <div className="mt-10 flex gap-6 font-mono text-[10px] uppercase tracking-widest text-black/55">
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
                лет
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
        {/* Финальный кадр (placeholder, тот же что и слой 6).
            TODO: заменить на <Image src="/cottage/hero.webp" /> */}
        <div
          className="relative min-h-[300px] flex items-end justify-center"
          style={{
            background:
              "linear-gradient(135deg, #2a2a2a 0%, #0a0a0a 100%)",
          }}
        >
          <div className="pb-5 font-mono text-[10px] tracking-[0.3em] uppercase text-[#d4b483]/70">
            [ AI HERO PHOTO — final ]
          </div>
        </div>
      </section>
    </>
  );
}

/* ────────────────────────────────────────────────────────────────────── */
/* SVG-чертёж: план + разрез двухэтажного коттеджа 280 м² (blueprint-style) */
/* ────────────────────────────────────────────────────────────────────── */

function BlueprintLayer() {
  // Цвет линий — почти-чёрный (#0a0a0a) на светлом фоне.
  const stroke = "#0a0a0a";
  return (
    <svg
      viewBox="0 0 600 400"
      preserveAspectRatio="xMidYMid meet"
      className="absolute inset-0 w-full h-full"
      style={{ padding: "4vh 6vw" }}
      aria-hidden
    >
      {/* ────── Штамп сверху ────── */}
      <g
        fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
        fill={stroke}
        opacity={0.85}
      >
        <text x="20" y="18" fontSize="8" letterSpacing="2">
          VER STROY · COTTAGE 280 M² · 2026
        </text>
        <text x="20" y="30" fontSize="6" letterSpacing="1.5" opacity={0.55}>
          DWG-01 · SCALE 1:100 · SHEET A1
        </text>
        <text x="580" y="18" fontSize="6" textAnchor="end" letterSpacing="1.5">
          N 58°00&apos;24&quot; E 56°15&apos;
        </text>
      </g>

      {/* ────── Левая половина: ПЛАН ЭТАЖА ────── */}
      <g
        stroke={stroke}
        strokeWidth={1.2}
        fill="none"
        fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
        fontSize="7"
      >
        {/* Внешний контур плана */}
        <rect x="40" y="60" width="240" height="280" />
        {/* Двойная линия стены — внутренний контур */}
        <rect x="46" y="66" width="228" height="268" strokeOpacity={0.6} />

        {/* LIVING / KITCHEN — большой open-space сверху */}
        <line x1="46" y1="170" x2="274" y2="170" />
        <text x="60" y="100" fill={stroke}>
          LIVING
        </text>
        <text x="60" y="112" fill={stroke} opacity={0.55} fontSize="5.5">
          42.0 M²
        </text>
        <text x="180" y="100" fill={stroke}>
          KITCHEN
        </text>
        <text x="180" y="112" fill={stroke} opacity={0.55} fontSize="5.5">
          18.5 M²
        </text>
        {/* Кухонный остров */}
        <rect x="180" y="125" width="60" height="20" strokeOpacity={0.75} />
        <line x1="180" y1="135" x2="240" y2="135" strokeOpacity={0.5} strokeDasharray="2 2" />

        {/* Камин в гостиной */}
        <rect x="58" y="140" width="22" height="14" strokeOpacity={0.8} />
        <line x1="60" y1="142" x2="78" y2="152" strokeOpacity={0.5} />
        <line x1="78" y1="142" x2="60" y2="152" strokeOpacity={0.5} />

        {/* Холл / лестница */}
        <line x1="160" y1="170" x2="160" y2="245" />
        <text x="120" y="200" fill={stroke}>
          HALL
        </text>
        <text x="120" y="212" fill={stroke} opacity={0.55} fontSize="5.5">
          14.0 M²
        </text>
        {/* Лестница — 10 ступеней */}
        <g strokeOpacity={0.7}>
          <rect x="100" y="215" width="44" height="30" />
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <line key={i} x1={100 + i * 4.4} y1="215" x2={100 + i * 4.4} y2="245" />
          ))}
          <line x1="100" y1="230" x2="144" y2="230" strokeDasharray="3 2" />
        </g>

        {/* Спальня 1 */}
        <line x1="46" y1="260" x2="160" y2="260" />
        <text x="60" y="285" fill={stroke}>
          BEDROOM 1
        </text>
        <text x="60" y="297" fill={stroke} opacity={0.55} fontSize="5.5">
          16.0 M²
        </text>
        {/* Кровать */}
        <rect x="58" y="305" width="38" height="22" strokeOpacity={0.75} />
        <line x1="58" y1="312" x2="96" y2="312" strokeOpacity={0.5} />

        {/* Bath */}
        <line x1="160" y1="245" x2="274" y2="245" />
        <text x="180" y="270" fill={stroke}>
          BATH
        </text>
        <text x="180" y="282" fill={stroke} opacity={0.55} fontSize="5.5">
          7.5 M²
        </text>
        {/* Ванна */}
        <rect x="180" y="290" width="36" height="14" strokeOpacity={0.7} rx="2" />
        {/* Раковина */}
        <circle cx="240" cy="295" r="5" strokeOpacity={0.7} />

        {/* WC */}
        <line x1="160" y1="290" x2="160" y2="340" />
        <text x="200" y="320" fill={stroke}>
          WC
        </text>
        <text x="200" y="330" fill={stroke} opacity={0.55} fontSize="5.5">
          3.2 M²
        </text>

        {/* Окна на плане (разрывы в стене) */}
        <line x1="100" y1="60" x2="140" y2="60" stroke="#fafaf7" strokeWidth="3" />
        <line x1="100" y1="60" x2="140" y2="60" strokeDasharray="2 2" strokeOpacity={0.7} />
        <line x1="200" y1="60" x2="240" y2="60" stroke="#fafaf7" strokeWidth="3" />
        <line x1="200" y1="60" x2="240" y2="60" strokeDasharray="2 2" strokeOpacity={0.7} />
        <line x1="40" y1="100" x2="40" y2="140" stroke="#fafaf7" strokeWidth="3" />
        <line x1="40" y1="100" x2="40" y2="140" strokeDasharray="2 2" strokeOpacity={0.7} />
        <line x1="280" y1="200" x2="280" y2="230" stroke="#fafaf7" strokeWidth="3" />
        <line x1="280" y1="200" x2="280" y2="230" strokeDasharray="2 2" strokeOpacity={0.7} />

        {/* Входная дверь снизу */}
        <line x1="140" y1="340" x2="170" y2="340" stroke="#fafaf7" strokeWidth="3" />
        <path d="M 140 340 A 30 30 0 0 1 170 340" strokeOpacity={0.55} />

        {/* Подпись секции */}
        <text x="40" y="355" fill={stroke} fontSize="6" letterSpacing="2" opacity={0.7}>
          PLAN · 1-ST FLOOR · 1:100
        </text>
      </g>

      {/* ────── Размерные линии слева/снизу плана ────── */}
      <g
        stroke={stroke}
        strokeWidth={0.5}
        fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
        fontSize="6"
        opacity={0.6}
      >
        {/* Снизу: 14.0 м */}
        <line x1="40" y1="370" x2="280" y2="370" strokeDasharray="3 2" />
        <line x1="40" y1="365" x2="40" y2="375" />
        <line x1="280" y1="365" x2="280" y2="375" />
        <text x="148" y="382" fill={stroke}>
          14.000
        </text>

        {/* Слева: 16.0 м */}
        <line x1="22" y1="60" x2="22" y2="340" strokeDasharray="3 2" />
        <line x1="17" y1="60" x2="27" y2="60" />
        <line x1="17" y1="340" x2="27" y2="340" />
        <text
          x="14"
          y="205"
          fill={stroke}
          transform="rotate(-90 14 205)"
          textAnchor="middle"
        >
          16.000
        </text>
      </g>

      {/* ────── Разделитель ────── */}
      <line
        x1="305"
        y1="60"
        x2="305"
        y2="340"
        stroke={stroke}
        strokeWidth="0.5"
        strokeDasharray="2 3"
        opacity={0.45}
      />

      {/* ────── Правая половина: РАЗРЕЗ (СЕЧЕНИЕ) ────── */}
      <g
        stroke={stroke}
        strokeWidth={1.2}
        fill="none"
        fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
        fontSize="7"
      >
        {/* Контур здания — две этажа + крыша */}
        {/* Земля */}
        <line x1="325" y1="320" x2="565" y2="320" />
        <g strokeWidth={0.5} opacity={0.7}>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => (
            <line
              key={i}
              x1={325 + i * 20}
              y1="320"
              x2={325 + i * 20 - 6}
              y2="328"
            />
          ))}
        </g>

        {/* Фундамент */}
        <rect x="335" y="300" width="220" height="20" strokeOpacity={0.7} />
        <text x="340" y="314" fill={stroke} fontSize="5" opacity={0.6}>
          FOUNDATION · MONOLITH
        </text>

        {/* 1-й этаж */}
        <rect x="340" y="220" width="210" height="80" />
        <text x="345" y="232" fill={stroke} fontSize="5.5" opacity={0.7}>
          1-ST FLOOR · H 3.2 M
        </text>
        {/* Окна 1 этажа */}
        <rect x="360" y="245" width="24" height="40" strokeOpacity={0.85} />
        <line x1="372" y1="245" x2="372" y2="285" strokeOpacity={0.5} />
        <line x1="360" y1="265" x2="384" y2="265" strokeOpacity={0.5} />

        <rect x="410" y="245" width="40" height="40" strokeOpacity={0.85} />
        <line x1="430" y1="245" x2="430" y2="285" strokeOpacity={0.5} />
        <line x1="410" y1="265" x2="450" y2="265" strokeOpacity={0.5} />

        <rect x="490" y="245" width="44" height="40" strokeOpacity={0.85} />
        <line x1="512" y1="245" x2="512" y2="285" strokeOpacity={0.5} />
        <line x1="490" y1="265" x2="534" y2="265" strokeOpacity={0.5} />

        {/* Перекрытие */}
        <line x1="340" y1="220" x2="550" y2="220" strokeWidth={1.4} />
        <line x1="340" y1="216" x2="550" y2="216" strokeOpacity={0.55} />

        {/* 2-й этаж */}
        <rect x="340" y="150" width="210" height="70" />
        <text x="345" y="162" fill={stroke} fontSize="5.5" opacity={0.7}>
          2-ND FLOOR · H 2.9 M
        </text>
        {/* Окна 2 этажа */}
        <rect x="360" y="175" width="28" height="32" strokeOpacity={0.85} />
        <line x1="374" y1="175" x2="374" y2="207" strokeOpacity={0.5} />
        <line x1="360" y1="191" x2="388" y2="191" strokeOpacity={0.5} />

        <rect x="410" y="175" width="40" height="32" strokeOpacity={0.85} />
        <line x1="430" y1="175" x2="430" y2="207" strokeOpacity={0.5} />
        <line x1="410" y1="191" x2="450" y2="191" strokeOpacity={0.5} />

        <rect x="488" y="175" width="44" height="32" strokeOpacity={0.85} />
        <line x1="510" y1="175" x2="510" y2="207" strokeOpacity={0.5} />
        <line x1="488" y1="191" x2="532" y2="191" strokeOpacity={0.5} />

        {/* Скатная кровля */}
        <polygon points="335,150 555,150 510,95 380,95" />
        <line x1="445" y1="95" x2="445" y2="150" strokeDasharray="2 2" strokeOpacity={0.5} />
        <text x="450" y="120" fill={stroke} fontSize="5" opacity={0.7}>
          ROOF α 22°
        </text>

        {/* Конёк (короткая чёрточка сверху) */}
        <line x1="425" y1="92" x2="465" y2="92" strokeWidth={1.5} />

        {/* Дымоход */}
        <rect x="475" y="80" width="10" height="22" strokeOpacity={0.8} />

        {/* Подпись секции */}
        <text x="335" y="355" fill={stroke} fontSize="6" letterSpacing="2" opacity={0.7}>
          SECTION A-A · 1:100
        </text>
      </g>

      {/* ────── Размерные линии разреза ────── */}
      <g
        stroke={stroke}
        strokeWidth={0.5}
        fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
        fontSize="6"
        opacity={0.6}
      >
        {/* Высота: от земли до конька */}
        <line x1="572" y1="92" x2="572" y2="320" strokeDasharray="3 2" />
        <line x1="567" y1="92" x2="577" y2="92" />
        <line x1="567" y1="220" x2="577" y2="220" />
        <line x1="567" y1="320" x2="577" y2="320" />
        <text
          x="585"
          y="160"
          fill={stroke}
          transform="rotate(-90 585 160)"
          textAnchor="middle"
        >
          +9.150
        </text>
        <text
          x="585"
          y="270"
          fill={stroke}
          transform="rotate(-90 585 270)"
          textAnchor="middle"
        >
          +3.200
        </text>

        {/* Ширина здания */}
        <line x1="340" y1="345" x2="550" y2="345" strokeDasharray="3 2" />
        <line x1="340" y1="340" x2="340" y2="350" />
        <line x1="550" y1="340" x2="550" y2="350" />
        <text x="430" y="357" fill={stroke}>
          12.000
        </text>
      </g>

      {/* ────── Угловые маркеры рамки чертежа ────── */}
      <g stroke={stroke} strokeWidth={0.75} opacity={0.7} fill="none">
        <polyline points="8,8 8,20 20,20" />
        <polyline points="592,8 592,20 580,20" />
        <polyline points="8,392 8,380 20,380" />
        <polyline points="592,392 592,380 580,380" />
      </g>
    </svg>
  );
}

/* ────────────────────────────────────────────────────────────────────── */
/* SVG-фильтр грейна (turbulence). Используется в слое бетона и атмосферы. */
/* ────────────────────────────────────────────────────────────────────── */

function NoiseFilter({
  id,
  baseFrequency,
  opacity,
}: {
  id: string;
  baseFrequency: string;
  opacity: number;
}) {
  return (
    <svg
      aria-hidden
      className="absolute inset-0 w-full h-full pointer-events-none mix-blend-overlay"
      style={{ opacity }}
    >
      <filter id={id}>
        <feTurbulence
          type="fractalNoise"
          baseFrequency={baseFrequency}
          numOctaves={2}
          stitchTiles="stitch"
        />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter={`url(#${id})`} />
    </svg>
  );
}
