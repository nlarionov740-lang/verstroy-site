"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import TextReveal from "./TextReveal";
import CountUp from "./CountUp";

export default function Hero() {
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 800], [0, 200]);
  const bgScale = useTransform(scrollY, [0, 800], [1, 1.15]);
  const overlayOpacity = useTransform(scrollY, [0, 600], [0.6, 0.9]);

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
      {/* Background video + image with parallax */}
      <motion.div
        className="absolute inset-0 will-change-transform"
        style={{ y: bgY, scale: bgScale }}
      >
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
        <Image
          src="/images/hero-bg.jpg"
          alt="Строительная компания ВЕР СТРОЙ — монолитные работы в Перми"
          fill
          priority
          className="object-cover [object-position:75%_center] sm:hidden"
          sizes="100vw"
          quality={85}
        />
      </motion.div>

      {/* Overlays */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-transparent"
        style={{ opacity: overlayOpacity }}
      />
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

      <div className="relative z-10 mx-auto flex w-full max-w-7xl 2xl:max-w-[1400px] 3xl:max-w-[1600px] px-6 lg:px-8 2xl:px-12 3xl:px-16">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-2xl 2xl:max-w-3xl 3xl:max-w-4xl py-20 sm:py-32 lg:py-36 xl:py-40"
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
            <TextReveal className="block text-3xl leading-[1.08] text-white sm:text-4xl lg:text-[3.5rem] xl:text-[4.25rem] 2xl:text-[5rem] 3xl:text-[6rem] uppercase sm:whitespace-nowrap" delay={0.3}>Строим то, что</TextReveal>
            <TextReveal className="block text-3xl leading-[1.08] text-white sm:text-4xl lg:text-[3.5rem] xl:text-[4.25rem] 2xl:text-[5rem] 3xl:text-[6rem] uppercase" delay={0.5}>ПРОСТОИТ</TextReveal>
            <TextReveal className="block text-3xl leading-[1.08] text-accent sm:text-4xl lg:text-[3.5rem] xl:text-[4.25rem] 2xl:text-[5rem] 3xl:text-[6rem] uppercase" delay={0.7}>ВЕКА</TextReveal>
          </motion.h1>

          {/* Services list */}
          <motion.div
            variants={fadeUp}
            className="mb-6 text-white/80 text-base sm:text-lg lg:text-xl font-light tracking-wide"
          >
            {/* Mobile: grid 2 columns */}
            <div className="grid grid-cols-2 gap-1 sm:hidden">
              {["Монолитные работы", "Кровельные работы", "Фасадные работы", "Кладочные работы", "Отделочные работы", "Электромонтаж"].map((item) => (
                <span key={item} className="hover:text-accent transition-colors duration-300 cursor-default">{item}</span>
              ))}
            </div>
            {/* Desktop: flex rows with dots */}
            <div className="hidden sm:flex sm:flex-col sm:gap-2">
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

          {/* Geography — mobile */}
          <motion.div
            variants={fadeUp}
            className="mb-12 text-sm text-white/40 tracking-wide font-light flex flex-col gap-0.5 sm:hidden"
          >
            <span>Пермь и вся Россия</span>
            <span>Коммерческие и промышленные объекты по всей России</span>
          </motion.div>
          {/* Geography — desktop */}
          <motion.p
            variants={fadeUp}
            className="mb-12 text-base text-white/40 tracking-wide font-light hidden sm:flex w-full justify-between items-center"
          >
            <span>Пермь и вся Россия</span>
            <span className="text-accent/40 text-[6px]">●</span>
            <span>Коммерческие и промышленные объекты по всей России</span>
          </motion.p>

          {/* Stats row */}
          <motion.div
            variants={fadeUp}
            className="mb-12 grid grid-cols-2 gap-x-8 gap-y-6 sm:flex sm:items-center sm:gap-10 lg:gap-12"
          >
            {[
              { end: 6, suffix: "+", label: "лет опыта", duration: 2 },
              { end: 22, suffix: "+", label: "объектов сдано", duration: 2 },
              { end: 25, suffix: " 000", label: "м³ бетона освоено", duration: 2.5 },
              { end: 150, suffix: "+", label: "работников", duration: 2.5 },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <CountUp
                  end={stat.end}
                  suffix={stat.suffix}
                  duration={stat.duration}
                  className="font-montserrat text-3xl font-bold text-accent sm:text-4xl lg:text-[2.75rem] 2xl:text-5xl"
                />
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
