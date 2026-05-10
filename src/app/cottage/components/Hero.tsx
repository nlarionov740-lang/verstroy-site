// src/app/cottage/components/Hero.tsx
"use client";

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
