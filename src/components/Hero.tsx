"use client";

import { motion } from "framer-motion";

export default function Hero() {
  const handleScroll = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.15, delayChildren: 0.3 },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 32 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] } },
  };

  const lineWipe = {
    hidden: { scaleX: 0 },
    show: { scaleX: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay: 0.6 } },
  };

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      {/* Background video */}
      {/* Video on desktop, static image on mobile */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover hidden sm:block"
        poster="/images/hero-bg.jpg"
      >
        <source src="/videos/hero-web.mp4" type="video/mp4" />
      </video>
      <img
        src="/images/hero-bg.jpg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover sm:hidden"
      />

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-bg-dark/20 to-black/30" />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Radial glow behind content */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-accent/4 rounded-full blur-[150px]" />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl px-6 lg:px-8">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-2xl py-32 lg:py-36 xl:py-40"
        >
          {/* Accent line */}
          <motion.div
            variants={lineWipe}
            className="mb-10 h-[2px] w-20 origin-left bg-accent"
          />

          {/* Main headline */}
          <motion.h1
            variants={fadeUp}
            className="mb-8 font-montserrat font-extrabold inline-block"
          >
            <span className="block text-3xl leading-[1.08] text-white sm:text-4xl lg:text-[3.5rem] xl:text-[4.25rem] uppercase whitespace-nowrap">
              Строим то, что
            </span>
            <span className="block text-3xl leading-[1.08] sm:text-4xl lg:text-[3.5rem] xl:text-[4.25rem] uppercase w-full">
              <span className="flex justify-between">
                {'ПРОСТОИТ'.split('').map((char, i) => (
                  <span key={i} className="text-white">{char}</span>
                ))}
                <span className="w-[0.3em]" />
                {'ВЕКА'.split('').map((char, i) => (
                  <span key={`v${i}`} className="text-accent">{char}</span>
                ))}
              </span>
            </span>
          </motion.h1>

          {/* Services list */}
          <motion.div
            variants={fadeUp}
            className="mb-6 text-white/80 text-base sm:text-lg lg:text-xl font-light tracking-wide"
          >
            <div className="flex flex-col gap-1 sm:gap-2">
              <div className="flex w-full justify-between items-center">
                <span className="hover:text-accent transition-colors duration-300 cursor-default">Монолитные работы</span>
                <span className="text-accent text-[7px]">●</span>
                <span className="hover:text-accent transition-colors duration-300 cursor-default">Кровельные работы</span>
                <span className="text-accent text-[7px]">●</span>
                <span className="hover:text-accent transition-colors duration-300 cursor-default">Фасадные работы</span>
              </div>
              <div className="flex w-full justify-between items-center">
                <span className="hover:text-accent transition-colors duration-300 cursor-default">Кладочные работы</span>
                <span className="text-accent text-[7px]">●</span>
                <span className="hover:text-accent transition-colors duration-300 cursor-default">Отделочные работы</span>
                <span className="text-accent text-[7px]">●</span>
                <span className="hover:text-accent transition-colors duration-300 cursor-default">Электромонтаж</span>
              </div>
            </div>
          </motion.div>

          {/* Geography */}
          <motion.p
            variants={fadeUp}
            className="mb-12 text-sm sm:text-base text-white/40 tracking-wide font-light flex w-full justify-between items-center"
          >
            <span>Пермь и вся Россия</span>
            <span className="text-accent/40 text-[6px]">●</span>
            <span>От частных домов до промышленных объектов</span>
          </motion.p>

          {/* Stats row */}
          <motion.div
            variants={fadeUp}
            className="mb-12 grid grid-cols-2 gap-x-8 gap-y-6 sm:flex sm:items-center sm:gap-10 lg:gap-12"
          >
            {[
              { value: "6+", label: "лет опыта" },
              { value: "22+", label: "объектов сдано" },
              { value: "25 000", label: "м³ бетона освоено" },
              { value: "150+", label: "работников" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <span className="font-montserrat text-3xl font-bold text-accent sm:text-4xl lg:text-[2.75rem]">
                  {stat.value}
                </span>
                <span className="mt-1.5 text-xs text-white/30 uppercase tracking-[0.15em]">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col gap-4 sm:flex-row"
          >
            <button
              onClick={() => handleScroll("#portfolio")}
              className="group relative inline-flex w-full sm:flex-1 items-center justify-center gap-3 overflow-hidden rounded-sm bg-accent px-10 py-4.5 text-base font-semibold uppercase tracking-wider text-primary-dark transition-all duration-300 hover:shadow-lg hover:shadow-accent/25"
            >
              <span className="relative z-10">Смотреть объекты</span>
              <svg
                className="relative z-10 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
              <div className="absolute inset-0 bg-accent-light transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
            </button>
            <button
              onClick={() => handleScroll("#contacts")}
              className="inline-flex w-full sm:flex-1 items-center justify-center rounded-sm border border-white/15 px-10 py-4.5 text-base font-normal uppercase tracking-wider text-white transition-all duration-300 hover:border-accent/50 hover:text-accent"
            >
              Обсудить проект
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.35em] text-white/20">
          Листайте
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="cursor-pointer"
          onClick={() => handleScroll("#about")}
        >
          <svg
            className="w-5 h-5 text-white/20"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
