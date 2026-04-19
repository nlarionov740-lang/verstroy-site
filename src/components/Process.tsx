"use client";

import { useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
} from "framer-motion";

const steps = [
  {
    num: "01",
    title: "Заявка",
    description:
      "Вы описываете объект, объём и сроки — мы фиксируем задачу.",
    details: [
      "Звонок или заявка с сайта",
      "Уточняем тип объекта и объёмы",
      "Определяем предварительные сроки",
      "Назначаем ответственного менеджера",
    ],
    fact: "Обрабатываем заявку в течение 1 часа",
    duration: "1 день",
  },
  {
    num: "02",
    title: "Расчёт",
    description:
      "Выезжаем на объект, считаем материалы и готовим коммерческое предложение.",
    details: [
      "Бесплатный выезд инженера на объект",
      "Изучение проектной документации",
      "Расчёт материалов и трудозатрат",
      "Коммерческое предложение с детализацией",
    ],
    fact: "Точность сметы — отклонение не более 5%",
    duration: "2–3 дня",
  },
  {
    num: "03",
    title: "Договор",
    description:
      "Фиксируем стоимость, сроки и гарантии — вы получаете прозрачную смету.",
    details: [
      "Фиксированная стоимость в договоре",
      "График производства работ",
      "Гарантийные обязательства 5 лет",
      "Прозрачная смета по каждой позиции",
    ],
    fact: "Цена в договоре = цена по факту. Без доплат.",
    duration: "1–2 дня",
  },
  {
    num: "04",
    title: "Строительство",
    description:
      "Выводим бригады на объект. Отчёт и фото — каждую неделю.",
    details: [
      "Мобилизация бригад и техники",
      "Еженедельные фотоотчёты заказчику",
      "Контроль качества на каждом этапе",
      "Ведение исполнительной документации",
    ],
    fact: "150+ специалистов в штате, собственная опалубка",
    duration: "По графику",
  },
  {
    num: "05",
    title: "Сдача",
    description:
      "Принимаете работы, подписываем акты — объект готов к эксплуатации.",
    details: [
      "Совместная приёмка с заказчиком",
      "Подписание актов выполненных работ",
      "Передача исполнительной документации",
      "Гарантийное обслуживание 5 лет",
    ],
    fact: "22+ объекта сданы без срыва сроков",
    duration: "1–3 дня",
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 40,
    restDelta: 0.001,
  });

  const lineHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);
  const rightPanelY = useTransform(smoothProgress, [0, 1], ["0vh", "-280vh"]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActiveStep(Math.min(4, Math.floor(v * 5)));
  });

  return (
    <section className="relative bg-bg-dark">
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

      {/* Section Header */}
      <div className="pt-24 lg:pt-32 pb-12 lg:pb-16 text-center mx-auto max-w-7xl px-6 lg:px-8">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="text-accent text-sm font-semibold tracking-widest uppercase mb-4 block"
        >
          Этапы работы
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease }}
          className="font-montserrat text-4xl lg:text-5xl font-bold text-white"
        >
          Как мы работаем
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease }}
          className="text-text-secondary text-lg mt-4 max-w-2xl mx-auto"
        >
          Пять простых этапов от первого звонка до готового объекта
        </motion.p>
      </div>

      {/* ===== DESKTOP: Sticky Scroll Timeline ===== */}
      <div
        ref={containerRef}
        className="hidden lg:block relative h-[350vh]"
      >
        <div className="sticky top-0 h-screen flex overflow-hidden">
          {/* Progress bar */}
          <motion.div className="absolute top-0 left-0 right-0 h-[2px] bg-white/[0.06] z-50">
            <motion.div className="h-full bg-accent origin-left" style={{ scaleX: smoothProgress }} />
          </motion.div>
          {/* Left Sticky Panel — 40% */}
          <div className="w-[40%] relative flex items-center justify-center px-12 xl:px-16 2xl:px-20 3xl:px-24">
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -20, filter: "blur(6px)" }}
                  transition={{ duration: 0.5, ease }}
                >
                  {/* Big number */}
                  <span className="font-montserrat text-[120px] leading-none font-bold text-accent/20 block select-none">
                    {steps[activeStep].num}
                  </span>
                  {/* Title */}
                  <h3 className="font-montserrat text-3xl lg:text-4xl font-bold text-white -mt-4">
                    {steps[activeStep].title}
                  </h3>
                  {/* Description */}
                  <p className="text-base text-white/60 mt-4 max-w-sm">
                    {steps[activeStep].description}
                  </p>

                  {/* Step counter + thin progress */}
                  <div className="flex items-center gap-2 mt-8">
                    <span className="text-accent font-mono text-sm font-bold">{steps[activeStep].num}</span>
                    <span className="text-white/20 text-sm">/</span>
                    <span className="text-white/30 font-mono text-sm">05</span>
                    <div className="flex-1 ml-4 h-px bg-white/10 relative">
                      <motion.div
                        className="absolute inset-y-0 left-0 bg-accent rounded-full"
                        animate={{ width: `${((activeStep + 1) / 5) * 100}%` }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      />
                    </div>
                  </div>

                  {/* Duration */}
                  <div className="mt-6">
                    <span className="text-white/20 text-[11px] uppercase tracking-widest block mb-1">Срок этапа</span>
                    <span className="font-montserrat text-2xl font-bold text-accent">{steps[activeStep].duration}</span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Scroll indicator — disappears after first step */}
            <AnimatePresence>
              {activeStep === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 1 }}
                  className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                >
                  <span className="text-white/30 text-[10px] tracking-[0.2em] uppercase">Листать</span>
                  <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}>
                    <svg className="w-4 h-4 text-accent/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Progress Line — center */}
          <div className="relative w-px flex-shrink-0 flex flex-col items-center py-16">
            {/* Track */}
            <div className="absolute inset-y-16 w-[2px] bg-white/[0.08] rounded-full" />
            {/* Fill */}
            <motion.div
              className="absolute top-16 left-1/2 -translate-x-1/2 w-[2px] bg-accent rounded-full origin-top"
              style={{ height: lineHeight }}
            />
            {/* Dot markers */}
            <div className="relative flex-1 flex flex-col justify-between py-2">
              {steps.map((_, i) => {
                const isPassed = i < activeStep;
                const isCurrent = i === activeStep;

                return (
                  <div key={i} className="relative flex items-center justify-center">
                    {isCurrent && (
                      <motion.div
                        className="absolute w-8 h-8 rounded-full bg-accent/20"
                        animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0, 0.4] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      />
                    )}
                    <motion.div
                      className="rounded-full relative z-10"
                      animate={{
                        width: isCurrent ? 16 : 12,
                        height: isCurrent ? 16 : 12,
                        backgroundColor: isPassed || isCurrent
                          ? "rgb(212, 168, 67)"
                          : "rgba(255, 255, 255, 0.2)",
                        boxShadow: isCurrent
                          ? "0 0 16px rgba(212, 168, 67, 0.4)"
                          : "none",
                      }}
                      transition={{ duration: 0.4 }}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Scrolling Panel — 60% */}
          <div className="w-[60%] relative">
            {/* This inner div scrolls with the page via transform */}
            <motion.div
              className="absolute inset-x-0"
              style={{
                top: 0,
                height: "350vh",
                y: rightPanelY,
              }}
            >
              {steps.map((step, i) => (
                <div
                  key={step.num}
                  className="h-[70vh] flex items-center px-12 xl:px-16 2xl:px-20 relative"
                >
                  {/* Watermark number */}
                  <span className="absolute right-8 top-1/2 -translate-y-1/2 font-montserrat text-[180px] font-bold leading-none text-white/[0.02] select-none pointer-events-none" aria-hidden="true">
                    {step.num}
                  </span>
                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={
                      activeStep >= i
                        ? { opacity: activeStep === i ? 1 : 0.4, x: 0 }
                        : { opacity: 0, x: 30 }
                    }
                    transition={{ duration: 0.6, ease }}
                    className="max-w-lg 2xl:max-w-xl"
                  >
                    {/* Step label */}
                    <span className="text-accent text-sm font-semibold tracking-widest uppercase">
                      ШАГ {step.num}
                    </span>

                    {/* Duration badge */}
                    <div className="flex items-center gap-3 mt-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 border border-accent/15 text-xs font-medium text-accent">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {step.duration}
                      </span>
                    </div>

                    {/* Checklist */}
                    <div className="mt-6 space-y-3">
                      {step.details.map((item, di) => (
                        <motion.div
                          key={di}
                          className="flex items-start gap-3"
                          initial={{ opacity: 0, x: 16 }}
                          animate={
                            activeStep === i
                              ? { opacity: 1, x: 0 }
                              : { opacity: 0, x: 16 }
                          }
                          transition={{
                            duration: 0.4,
                            delay: activeStep === i ? di * 0.08 : 0,
                            ease,
                          }}
                        >
                          <div className="flex-shrink-0 w-5 h-5 rounded-full bg-accent/15 flex items-center justify-center mt-0.5">
                            <svg className="w-3 h-3 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span className="text-white/70 text-sm leading-relaxed">{item}</span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Fact */}
                    <div className="mt-8 px-4 py-3 rounded-lg bg-accent/[0.06] border border-accent/10">
                      <p className="text-white/50 text-xs uppercase tracking-widest mb-1">Факт</p>
                      <p className="text-white/80 text-sm font-medium">{step.fact}</p>
                    </div>
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* ===== MOBILE: Vertical Stack ===== */}
      <div className="lg:hidden px-6 pb-24">
        <div className="relative pl-8">
          {/* Vertical gold line */}
          <div className="absolute left-[5px] top-0 bottom-0 w-0.5 bg-white/10" />

          {steps.map((step) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, ease }}
              className="relative pb-16 last:pb-0"
            >
              {/* Dot on the line */}
              <div className="absolute -left-8 top-1 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-accent shadow-[0_0_10px_rgba(212,168,67,0.3)]" />
              </div>

              <div className="flex items-center gap-3">
                <span className="text-accent text-sm font-semibold tracking-widest uppercase">
                  ШАГ {step.num}
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-accent/10 text-[11px] font-medium text-accent">
                  {step.duration}
                </span>
              </div>
              <h3 className="font-montserrat text-xl font-bold text-white mt-2">
                {step.title}
              </h3>
              <p className="text-sm text-white/60 mt-2">
                {step.description}
              </p>
              <div className="mt-4 space-y-2">
                {step.details.map((item, di) => (
                  <div key={di} className="flex items-start gap-2">
                    <svg className="w-3.5 h-3.5 text-accent/60 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-white/50 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
