"use client";

import { useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
  useInView,
} from "framer-motion";

const stepIcons = [
  // 01 Заявка — телефон
  <svg key="0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
  </svg>,
  // 02 Расчёт — калькулятор
  <svg key="1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25v-.008zM12 11.25h.008v.008H12v-.008zm0 2.25h.008v.008H12v-.008zM6 18.75a2.25 2.25 0 002.248 2.25H9m-3-5.25V6.75A2.25 2.25 0 018.25 4.5h7.5A2.25 2.25 0 0118 6.75v1.5" />
  </svg>,
  // 03 Договор — документ
  <svg key="2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
  </svg>,
  // 04 Строительство — кран
  <svg key="3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
  </svg>,
  // 05 Сдача — галочка в круге
  <svg key="4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>,
];

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

type Step = (typeof steps)[number];

function MobileStep({ step, index }: { step: Step; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isActive = useInView(ref, { amount: 0.5 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.6, ease }}
      className="relative pb-16 last:pb-0"
    >
      {/* Dot on the line */}
      <div className="absolute -left-8 top-1 flex items-center justify-center">
        <div
          className={`w-3 h-3 rounded-full transition-all duration-300 ${
            isActive
              ? "bg-accent shadow-[0_0_12px_rgba(212,168,67,0.6)] scale-125"
              : "bg-accent/60"
          }`}
        />
      </div>

      <div className="flex items-center gap-3">
        <span
          className={`text-sm font-semibold tracking-widest uppercase flex items-center gap-2 transition-colors ${
            isActive ? "text-accent" : "text-accent/70"
          }`}
        >
          <span className="w-4 h-4">{stepIcons[index]}</span>
          ШАГ {step.num}
        </span>
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-accent/10 text-[11px] font-medium text-accent">
          {step.duration}
        </span>
      </div>
      <h3
        className={`font-montserrat text-xl font-bold mt-2 transition-colors ${
          isActive ? "text-white" : "text-white/80"
        }`}
      >
        {step.title}
      </h3>
      <p
        className={`text-sm mt-2 transition-colors ${
          isActive ? "text-white/80" : "text-white/60"
        }`}
      >
        {step.description}
      </p>
      <div className="mt-4 space-y-2">
        {step.details.map((item, di) => (
          <div key={di} className="flex items-start gap-2">
            <svg
              className="w-3.5 h-3.5 text-accent/60 mt-0.5 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span
              className={`text-sm transition-colors ${
                isActive ? "text-white/70" : "text-white/50"
              }`}
            >
              {item}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

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
  const progressDotX = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

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
          <motion.div className="absolute top-0 left-0 right-0 h-1 bg-white/[0.04] z-50">
            <motion.div
              className="h-full bg-gradient-to-r from-accent to-accent/70 origin-left shadow-[0_0_12px_rgba(212,168,67,0.5)]"
              style={{ scaleX: smoothProgress }}
            />
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_rgba(212,168,67,0.8)]"
              style={{ left: progressDotX }}
            />
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
                  <div className="relative select-none mb-4">
                    <span
                      className="font-montserrat text-[160px] leading-none font-bold absolute -top-4 -left-2 text-transparent"
                      style={{ WebkitTextStroke: "1px rgba(212,168,67,0.12)" }}
                    >
                      {steps[activeStep].num}
                    </span>
                    <span className="font-montserrat text-[140px] leading-none font-bold block bg-gradient-to-br from-accent/40 via-accent/20 to-transparent bg-clip-text text-transparent">
                      {steps[activeStep].num}
                    </span>
                  </div>
                  {/* Step icon */}
                  <div className="w-12 h-12 text-accent/40 mb-4">{stepIcons[activeStep]}</div>
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
                  <button
                    key={i}
                    type="button"
                    aria-label={`Перейти к шагу ${i + 1}`}
                    className="relative flex items-center justify-center cursor-pointer group bg-transparent border-0 p-0"
                    onClick={() => {
                      const el = containerRef.current;
                      if (!el) return;
                      const { top, height } = el.getBoundingClientRect();
                      const absoluteTop = window.scrollY + top;
                      const scrollableHeight = height - window.innerHeight;
                      window.scrollTo({
                        top: absoluteTop + (i / (steps.length - 1)) * scrollableHeight,
                        behavior: "smooth",
                      });
                    }}
                  >
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
                  </button>
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
                    <span className="text-accent text-sm font-semibold tracking-widest uppercase flex items-center gap-2">
                      <span className="w-5 h-5">{stepIcons[i]}</span>
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

          {steps.map((step, i) => (
            <MobileStep key={step.num} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
