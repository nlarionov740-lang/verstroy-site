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
