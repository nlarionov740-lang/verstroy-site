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
