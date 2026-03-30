"use client";

import { motion } from "framer-motion";

const services = [
  {
    title: "Монолитные работы",
    description:
      "Каркасы зданий, перекрытия, стены, колонны — полный спектр монолитного железобетона. Собственный парк опалубки.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-6 h-6">
        <rect x="4" y="20" width="40" height="24" rx="2" stroke="currentColor" strokeWidth="2" />
        <path d="M4 28h40" stroke="currentColor" strokeWidth="2" />
        <path d="M16 20V8l8-4 8 4v12" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <rect x="18" y="32" width="4" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <rect x="26" y="32" width="4" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    title: "Фундаменты",
    description:
      "Ленточные, плитные, свайные и комбинированные фундаменты для объектов любого назначения. Работа в сложных грунтовых условиях.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-6 h-6">
        <path d="M6 44h36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M10 44V30h28v14" stroke="currentColor" strokeWidth="2" />
        <path d="M6 30l18-14 18 14" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="M16 44v-8h6v8M26 44v-8h6v8" stroke="currentColor" strokeWidth="1.5" />
        <path d="M10 30V20M38 30V20" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 2" />
      </svg>
    ),
  },
  {
    title: "Кладочные работы",
    description:
      "Кирпич, газоблок, керамические блоки. Несущие стены и перегородки. Любые объёмы, точное соблюдение сроков.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-6 h-6">
        <rect x="6" y="10" width="36" height="28" rx="2" stroke="currentColor" strokeWidth="2" />
        <path d="M6 19h36M6 28h36M18 10v9M30 19v9M18 28v10" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    title: "Кровельные работы",
    description:
      "Плоские и скатные кровли. Мембранные, мастичные и рулонные покрытия. Утепление, пароизоляция, водоотведение.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-6 h-6">
        <rect x="8" y="8" width="32" height="36" rx="1" stroke="currentColor" strokeWidth="2" />
        <path d="M8 16h32M8 24h32M8 32h32" stroke="currentColor" strokeWidth="1.5" />
        <path d="M18 8v36M28 8v36" stroke="currentColor" strokeWidth="1.5" />
        <path d="M4 44h40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M24 4v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Фасадные работы",
    description:
      "Навесные вентилируемые, штукатурные и композитные фасадные системы. Утепление, облицовка, декоративные элементы.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-6 h-6">
        <path d="M4 18h40v6H4z" stroke="currentColor" strokeWidth="2" />
        <path d="M8 24v16M16 24v16M24 24v16M32 24v16M40 24v16" stroke="currentColor" strokeWidth="1.5" />
        <path d="M4 40h40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M2 18l22-10 22 10" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <circle cx="24" cy="21" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: "Отделочные работы",
    description:
      "Черновая и чистовая отделка жилых, коммерческих и промышленных объектов. Полы, стены, потолки, инженерная подготовка.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-6 h-6">
        <rect x="8" y="8" width="32" height="32" rx="2" stroke="currentColor" strokeWidth="2" />
        <path d="M8 20h32M20 8v32" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 12h4v4h-4zM24 12h4v4h-4zM12 24h4v4h-4zM24 24h4v4h-4z" stroke="currentColor" strokeWidth="1" />
      </svg>
    ),
  },
  {
    title: "Электромонтаж",
    description:
      "Электроснабжение жилых комплексов, торговых центров и промышленных объектов. Силовые сети, освещение, слаботочные системы.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-6 h-6">
        <path d="M20 4l-4 18h16L28 44" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10 24h4M34 24h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M12 14l3 2M33 32l3 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M12 34l3-2M33 16l3-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Проектирование",
    description:
      "Проектная и рабочая документация. Архитектурные, конструктивные и инженерные разделы. Авторский надзор.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-6 h-6">
        <rect x="6" y="6" width="28" height="36" rx="2" stroke="currentColor" strokeWidth="2" />
        <path d="M12 14h16M12 20h16M12 26h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M30 28l12 12M42 28l-12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="36" cy="34" r="8" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    title: "Спецтехника",
    description:
      "Автокраны, экскаваторы, бетононасосы, погрузчики.\nАренда с оператором и без.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-6 h-6">
        <path d="M4 36h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <rect x="12" y="18" width="20" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
        <path d="M32 26h8a4 4 0 014 4v6H32" stroke="currentColor" strokeWidth="2" />
        <path d="M12 24h20" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="18" cy="36" r="4" stroke="currentColor" strokeWidth="2" />
        <circle cx="38" cy="36" r="4" stroke="currentColor" strokeWidth="2" />
        <path d="M22 36h12" stroke="currentColor" strokeWidth="2" />
        <path d="M16 18v-6h12l6 6" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function Services() {
  return (
    <section id="services" className="relative py-24 lg:py-32 bg-bg-dark">
      {/* Top divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
      {/* Subtle noise */}
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: "256px 256px",
        }}
      />

      {/* Header — centered with container */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 mb-16 text-center">
        <span className="text-accent text-sm font-semibold tracking-widest uppercase mb-4 block">
          Компетенции
        </span>
        <h2 className="font-montserrat text-4xl lg:text-5xl font-bold text-white mb-4">
          Что мы строим
        </h2>
        <p className="text-text-secondary text-lg max-w-2xl mx-auto">
          Полный цикл строительных работ — от фундамента до финишной отделки
        </p>
      </div>

      {/* Fullwidth strips */}
      <div className="w-full">
        {services.map((service, i) => (
          <motion.div
            key={service.title}
            whileTap={{ backgroundColor: "rgba(212,168,67,0.1)" }}
            className="group relative w-full border-t border-white/[0.06] last:border-b last:border-white/[0.06] hover:bg-primary/20 transition-all duration-500 cursor-pointer"
          >
            <div className="mx-auto max-w-7xl px-6 lg:px-8 py-5 lg:py-6">
              <div className="flex items-center gap-3 lg:gap-8">
                {/* Number */}
                <span className="font-montserrat text-sm font-bold text-white/20 group-hover:text-accent/60 transition-colors duration-500 w-8 shrink-0 tabular-nums">
                  0{i + 1}
                </span>

                {/* Icon */}
                <div className="text-text-muted group-hover:text-accent transition-all duration-500 shrink-0 group-hover:scale-110">
                  {service.icon}
                </div>

                {/* Title */}
                <h3 className="font-montserrat text-base lg:text-2xl font-semibold text-white group-hover:text-accent transition-colors duration-300 flex-1 min-w-0">
                  {service.title}
                </h3>

                {/* Description — appears on hover (desktop only) */}
                <p className="hidden lg:block text-text-secondary text-sm max-w-md opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-500 whitespace-pre-line">
                  {service.description}
                </p>

                {/* Arrow */}
                <div className="text-white/10 group-hover:text-accent group-hover:translate-x-1 transition-all duration-300 shrink-0 hidden sm:block">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>

              {/* Description — mobile only, below the title row */}
              <div className="lg:hidden pl-14 pt-1.5 pb-1">
                <p className="text-text-secondary text-sm leading-relaxed whitespace-pre-line">
                  {service.description}
                </p>
              </div>
            </div>

            {/* Gold line on hover — fullwidth */}
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
