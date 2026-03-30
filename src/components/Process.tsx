"use client";

import { useState, useEffect, Fragment } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";

const steps = [
  {
    num: "01",
    title: "Заявка",
    description:
      "Вы описываете объект, объём и сроки — мы фиксируем задачу.",
  },
  {
    num: "02",
    title: "Расчёт",
    description:
      "Выезжаем на объект, считаем материалы и готовим коммерческое предложение.",
  },
  {
    num: "03",
    title: "Договор",
    description:
      "Фиксируем стоимость, сроки и гарантии — вы получаете прозрачную смету.",
  },
  {
    num: "04",
    title: "Строительство",
    description:
      "Выводим бригады на объект. Отчёт и фото — каждую неделю.",
  },
  {
    num: "05",
    title: "Сдача",
    description:
      "Принимаете работы, подписываем акты — объект готов к эксплуатации.",
  },
];

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

export default function Process() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });
  const [active, setActive] = useState<number | null>(null);

  // Auto-open first step on desktop only
  useEffect(() => {
    if (inView && active === null && typeof window !== "undefined" && window.innerWidth >= 640) {
      const timer = setTimeout(() => setActive(0), 800);
      return () => clearTimeout(timer);
    }
  }, [inView, active]);

  return (
    <section className="relative py-24 lg:py-32 bg-bg-dark">
      {/* Top divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Header — centered */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease }}
        className="text-center mb-16 lg:mb-20 mx-auto max-w-7xl px-6 lg:px-8"
      >
        <span className="text-accent text-sm font-semibold tracking-widest uppercase mb-4 block">
          Этапы работы
        </span>
        <h2 className="font-montserrat text-4xl lg:text-5xl font-bold text-white">
          От заявки до сдачи объекта
        </h2>
      </motion.div>

      {/* Fullwidth accordion strips */}
      <div className="w-full border-t border-white/[0.06]">
        {steps.map((step, i) => {
          const isActive = active === i;
          const progress = ((i + 1) / steps.length) * 100;

          return (
            <motion.div
              key={step.num}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1, ease }}
              className="w-full border-b border-white/[0.06] cursor-pointer"
              onMouseEnter={() => setActive(i)}
              onClick={() => setActive(isActive ? null : i)}
            >
              {/* Collapsed header — always visible */}
              <div
                className={`group mx-auto max-w-7xl px-6 lg:px-8 py-5 lg:py-6 flex items-center gap-6 lg:gap-10 transition-colors duration-500 ${
                  isActive ? "" : "hover:bg-white/[0.02]"
                }`}
              >
                {/* Number */}
                <motion.span
                  animate={{
                    color: isActive ? "rgba(212,168,67,1)" : "rgba(255,255,255,0.12)",
                  }}
                  transition={{ duration: 0.4 }}
                  className="font-montserrat text-4xl lg:text-5xl font-black tabular-nums shrink-0 w-16 lg:w-20"
                >
                  {step.num}
                </motion.span>

                {/* Gold dash */}
                <motion.div
                  animate={{
                    width: isActive ? 48 : 24,
                    backgroundColor: isActive
                      ? "rgba(212,168,67,1)"
                      : "rgba(255,255,255,0.1)",
                  }}
                  transition={{ duration: 0.4 }}
                  className="h-px shrink-0"
                />

                {/* Title */}
                <h3
                  className={`font-montserrat text-xl lg:text-2xl font-semibold flex-1 transition-colors duration-300 ${
                    isActive
                      ? "text-accent"
                      : "text-white group-hover:text-accent"
                  }`}
                >
                  {step.title}
                </h3>

                {/* Expand/collapse icon */}
                <motion.div
                  animate={{ rotate: isActive ? 45 : 0 }}
                  transition={{ duration: 0.3 }}
                  className={`shrink-0 transition-colors duration-300 ${
                    isActive ? "text-accent" : "text-white/20 group-hover:text-accent"
                  }`}
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                </motion.div>
              </div>

              {/* Expandable content */}
              <AnimatePresence initial={false}>
                {isActive && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease }}
                    className="overflow-hidden"
                  >
                    <div className="mx-auto max-w-7xl px-6 lg:px-8 pb-8 lg:pb-10">
                      <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-16 pl-[88px] lg:pl-[120px]">
                        {/* Description */}
                        <motion.p
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.15, duration: 0.5, ease }}
                          className="text-text-secondary text-lg leading-relaxed max-w-xl"
                        >
                          {step.description}
                        </motion.p>

                        {/* Mini progress */}
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.25, duration: 0.5, ease }}
                          className="flex items-center gap-2.5 shrink-0"
                        >
                          {steps.map((_, j) => (
                            <Fragment key={j}>
                              <div
                                className={`w-3 h-3 rounded-full transition-all duration-500 ${
                                  j <= i
                                    ? "bg-accent shadow-[0_0_10px_rgba(212,168,67,0.3)]"
                                    : "bg-white/10"
                                }`}
                              />
                              {j < steps.length - 1 && (
                                <div
                                  className={`w-6 lg:w-8 h-px transition-colors duration-500 ${
                                    j < i ? "bg-accent/60" : "bg-white/10"
                                  }`}
                                />
                              )}
                            </Fragment>
                          ))}
                        </motion.div>
                      </div>
                    </div>

                    {/* Gold underline — fullwidth */}
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.7, ease }}
                      className="w-full h-[2px] bg-accent origin-left"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
