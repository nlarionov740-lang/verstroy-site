"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const guarantees = [
  {
    title: "Гарантия 5 лет",
    description: "Фиксируем в договоре на все виды работ",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
  {
    title: "Сдаём в срок",
    description: "Штрафные санкции за просрочку — в каждом контракте",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Прозрачная смета",
    description: "Фиксированная цена без скрытых доплат",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
  },
  {
    title: "Свои бригады",
    description: "150+ штатных специалистов, без субподряда на ключевых этапах",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
  },
];

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

export default function Stats() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section className="relative py-24 lg:py-32 bg-bg-section overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
      {/* Radial accent glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-accent/[0.03] rounded-full blur-[120px] pointer-events-none" />

      <div ref={ref}>
        {/* Header — in container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease }}
          className="text-center mb-16 lg:mb-20 mx-auto max-w-7xl px-6 lg:px-8"
        >
          <span className="text-accent text-sm font-semibold tracking-widest uppercase mb-4 block">
            Гарантии
          </span>
          <h2 className="font-montserrat text-4xl lg:text-5xl font-bold text-white">
            Почему выбирают нас
          </h2>
        </motion.div>

        {/* 4 Numbered Pillars — fullwidth */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
          {guarantees.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 * i, ease }}
              className="group relative px-8 lg:px-12 py-16 lg:py-20 xl:min-h-[420px]
                         border-b border-white/[0.06]
                         xl:border-b-0 xl:border-r xl:border-white/[0.06]
                         xl:last:border-r-0
                         hover:bg-gradient-to-t hover:from-accent/[0.07] hover:to-transparent
                         transition-all duration-500 cursor-default"
            >
              {/* Ghost number */}
              <span className="absolute top-8 right-10 font-montserrat text-[6rem] lg:text-[8rem] font-bold text-white/[0.06] leading-none select-none group-hover:text-accent/[0.08] transition-colors duration-700">
                0{i + 1}
              </span>

              {/* Gold bar bottom — slides from center on hover */}
              <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-accent/80 via-accent to-accent/80 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />

              {/* Icon */}
              <div className="relative w-16 h-16 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-6 group-hover:bg-accent/20 group-hover:border-accent/40 group-hover:shadow-[0_0_20px_rgba(212,168,67,0.15)] transition-all duration-500">
                {item.icon}
              </div>

              {/* Decorative accent dash */}
              <div className="relative w-8 h-[2px] bg-accent/30 mb-6 group-hover:w-12 group-hover:bg-accent/60 transition-all duration-500" />

              {/* Title */}
              <h3 className="relative font-montserrat text-xl font-semibold text-white mb-4 group-hover:text-accent transition-colors duration-300">
                {item.title}
              </h3>

              {/* Description */}
              <p className="relative text-text-secondary text-sm leading-relaxed max-w-[280px] group-hover:text-text-secondary/90 transition-colors duration-300">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
