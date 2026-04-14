"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState, useRef, useCallback } from "react";
import GradientMesh from "./GradientMesh";

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

interface MouseState {
  x: number;
  y: number;
}

function GuaranteeCard({
  item,
  index,
  inView,
}: {
  item: (typeof guarantees)[number];
  index: number;
  inView: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mouse, setMouse] = useState<MouseState>({ x: 0, y: 0 });
  const [iconOffset, setIconOffset] = useState<MouseState>({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMouse({ x, y });

      // Parallax: icon moves toward cursor, coefficient 0.15
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      setIconOffset({
        x: (x - centerX) * 0.15,
        y: (y - centerY) * 0.15,
      });
    },
    [],
  );

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setIconOffset({ x: 0, y: 0 });
    setMouse({ x: 0, y: 0 });
  }, []);

  const num = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12, ease }}
      whileHover={{ y: -10, transition: { type: "spring", stiffness: 400, damping: 25 } }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative p-8 lg:p-12 xl:p-14 rounded-2xl cursor-default overflow-hidden min-h-[280px] lg:min-h-[340px]"
      style={{
        background: "rgba(255,255,255,0.04)",
        backdropFilter: "blur(4px)",
        border: isHovered
          ? "1px solid rgba(212,168,67,0.3)"
          : "1px solid rgba(255,255,255,0.08)",
        boxShadow: isHovered
          ? "0 20px 50px rgba(0,0,0,0.4), 0 0 40px rgba(212,168,67,0.15)"
          : "none",
        transition: "border 400ms ease, box-shadow 400ms ease",
      }}
    >
      {/* Flashlight overlay */}
      {isHovered && (
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none z-10"
          style={{
            background: `radial-gradient(circle 300px at ${mouse.x}px ${mouse.y}px, rgba(36,53,88,0.4), transparent)`,
          }}
        />
      )}

      {/* Ghost number */}
      <span
        className="absolute top-4 right-6 font-montserrat text-[6rem] lg:text-[8rem] font-bold leading-none select-none pointer-events-none z-0"
        style={{
          color: isHovered ? "rgba(212,168,67,0.12)" : "rgba(255,255,255,0.04)",
          transform: isHovered ? "rotate(5deg)" : "rotate(0deg)",
          transition: "color 400ms ease, transform 400ms ease",
        }}
      >
        {num}
      </span>

      {/* Icon with parallax */}
      <div
        className="relative z-20 w-16 h-16 lg:w-18 lg:h-18 rounded-xl flex items-center justify-center text-accent mb-8"
        style={{
          background: isHovered ? "rgba(212,168,67,0.2)" : "rgba(212,168,67,0.1)",
          border: isHovered
            ? "1px solid rgba(212,168,67,0.4)"
            : "1px solid rgba(212,168,67,0.2)",
          boxShadow: isHovered
            ? "0 0 20px rgba(212,168,67,0.2)"
            : "none",
          transform: isHovered
            ? `translate(${iconOffset.x}px, ${iconOffset.y}px) scale(1.1)`
            : "translate(0px, 0px) scale(1)",
          transition: "background 400ms ease, border 400ms ease, box-shadow 400ms ease, transform 0.5s ease",
        }}
      >
        {item.icon}
      </div>

      {/* Gold dash */}
      <div
        className="relative z-20 h-[2px] mb-6"
        style={{
          width: isHovered ? "3rem" : "2rem",
          background: isHovered ? "rgba(212,168,67,0.6)" : "rgba(212,168,67,0.3)",
          transition: "width 500ms ease, background 500ms ease",
        }}
      />

      {/* Title */}
      <h3
        className="relative z-20 font-montserrat text-xl lg:text-2xl font-semibold mb-4"
        style={{
          color: isHovered ? "var(--accent)" : "#FFFFFF",
          transition: "color 300ms ease",
        }}
      >
        {item.title}
      </h3>

      {/* Description */}
      <p className="relative z-20 font-inter text-sm text-white/50 leading-relaxed max-w-[280px]">
        {item.description}
      </p>

      {/* Gold line bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[2px] z-20"
        style={{
          background: "linear-gradient(to right, rgba(212,168,67,0.8), var(--accent), rgba(212,168,67,0.8))",
          transform: isHovered ? "scaleX(1)" : "scaleX(0)",
          transformOrigin: "center",
          transition: "transform 400ms ease",
        }}
      />
    </motion.div>
  );
}

export default function Stats() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section className="relative py-24 lg:py-32 bg-bg-section overflow-hidden">
      <GradientMesh />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-accent/[0.03] rounded-full blur-[120px] pointer-events-none" />

      <div ref={ref}>
        {/* Header */}
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

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3 px-3 lg:px-4">
          {guarantees.map((item, i) => (
            <GuaranteeCard
              key={item.title}
              item={item}
              index={i}
              inView={inView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
