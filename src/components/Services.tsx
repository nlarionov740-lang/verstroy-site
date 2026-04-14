"use client";

import { motion, useInView } from "framer-motion";
import { useState, useRef, useCallback, useEffect } from "react";

interface TiltState {
  rotateX: number;
  rotateY: number;
  mouseX: number;
  mouseY: number;
  borderAngle: number;
}

const services = [
  {
    title: "Монолитные работы",
    description:
      "Каркасы зданий, перекрытия, стены, колонны — полный спектр монолитного железобетона. Собственный парк опалубки.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-8 h-8">
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
      <svg viewBox="0 0 48 48" fill="none" className="w-8 h-8">
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
      <svg viewBox="0 0 48 48" fill="none" className="w-8 h-8">
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
      <svg viewBox="0 0 48 48" fill="none" className="w-8 h-8">
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
      <svg viewBox="0 0 48 48" fill="none" className="w-8 h-8">
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
      <svg viewBox="0 0 48 48" fill="none" className="w-8 h-8">
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
      <svg viewBox="0 0 48 48" fill="none" className="w-8 h-8">
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
      <svg viewBox="0 0 48 48" fill="none" className="w-8 h-8">
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
      "Автокраны, экскаваторы, бетононасосы, погрузчики. Аренда с оператором и без.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-8 h-8">
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

function ServiceCard({
  service,
  index,
  isHovered,
  isFaded,
  isInView,
  onMouseEnter,
  onMouseLeave,
  canHover,
}: {
  service: (typeof services)[number];
  index: number;
  isHovered: boolean;
  isFaded: boolean;
  isInView: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  canHover: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState<TiltState>({
    rotateX: 0,
    rotateY: 0,
    mouseX: 0,
    mouseY: 0,
    borderAngle: 0,
  });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!canHover || !cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateY = ((x - centerX) / centerX) * 8;
      const rotateX = ((centerY - y) / centerY) * 8;

      // Angle from center for border glow
      const angle = Math.atan2(y - centerY, x - centerX) * (180 / Math.PI) + 180;

      setTilt({ rotateX, rotateY, mouseX: x, mouseY: y, borderAngle: angle });
    },
    [canHover]
  );

  const handleEnter = useCallback(() => {
    setIsHovering(true);
    onMouseEnter();
  }, [onMouseEnter]);

  const handleLeave = useCallback(() => {
    setIsHovering(false);
    setTilt({ rotateX: 0, rotateY: 0, mouseX: 0, mouseY: 0, borderAngle: 0 });
    onMouseLeave();
  }, [onMouseLeave]);

  const num = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      className="h-full"
      initial={{ opacity: 0, y: 30 }}
      animate={
        isInView
          ? { opacity: isFaded ? 0.5 : 1, y: 0 }
          : { opacity: 0, y: 30 }
      }
      transition={{
        delay: index * 0.06,
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.03] p-8 lg:p-10 h-full flex flex-col will-change-transform"
        style={{
          transform:
            canHover && isHovering
              ? `perspective(800px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale3d(1.04, 1.04, 1.04)`
              : "perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
          transition: isHovering
            ? "transform 0.15s ease-out"
            : "transform 0.5s ease-out",
          borderColor: isHovered
            ? "rgba(36,53,88,0.6)"
            : "rgba(255,255,255,0.06)",
          boxShadow: isHovered
            ? "0 25px 60px rgba(0,0,0,0.5), 0 0 40px rgba(27,42,74,0.3), 0 0 80px rgba(212,168,67,0.06)"
            : "none",
        }}
      >
        {/* Border glow follows mouse */}
        {canHover && (
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              padding: '1px',
              background: isHovering
                ? `conic-gradient(from ${tilt.borderAngle - 30}deg, transparent 0%, rgba(212,168,67,0.7) 8%, #E4BE6A 15%, rgba(212,168,67,0.7) 22%, transparent 30%)`
                : 'transparent',
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
              transition: isHovering ? 'none' : 'background 0.4s ease',
              zIndex: 20,
            }}
          />
        )}

        {/* Flashlight overlay */}
        {canHover && (
          <div
            className="absolute inset-0 pointer-events-none rounded-xl"
            style={{
              background:
                isHovering
                  ? `radial-gradient(circle 350px at ${tilt.mouseX}px ${tilt.mouseY}px, rgba(36,53,88,0.5), transparent)`
                  : "none",
            }}
          />
        )}

        {/* Dot grid parallax */}
        <div
          className="absolute inset-0 pointer-events-none rounded-2xl"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
            opacity: isHovering ? 0.07 : 0.025,
            transform: isHovering && cardRef.current
              ? `translate(${((tilt.mouseX / cardRef.current.offsetWidth) - 0.5) * 10}px, ${((tilt.mouseY / cardRef.current.offsetHeight) - 0.5) * 10}px)`
              : 'translate(0, 0)',
            transition: 'opacity 400ms ease, transform 0.15s ease-out',
          }}
        />

        {/* Top row: icon left, number right */}
        <div className="flex items-start justify-between relative z-10">
          <div
            className="relative overflow-visible"
            style={{
              color: isHovered ? "#E4BE6A" : "rgba(255,255,255,0.25)",
              transform: isHovered ? "scale(1.5) rotate(8deg)" : "scale(1) rotate(0deg)",
              filter: isHovered
                ? "drop-shadow(0 0 16px rgba(212,168,67,0.7)) drop-shadow(0 0 40px rgba(212,168,67,0.3))"
                : "none",
              transition: "color 400ms ease, transform 400ms cubic-bezier(0.16,1,0.3,1), filter 400ms ease",
            }}
          >
            {isHovering && canHover && (
              <motion.span
                className="absolute inset-0 rounded-full"
                style={{ background: 'radial-gradient(circle, rgba(212,168,67,0.35) 0%, transparent 70%)' }}
                initial={{ scale: 0.4, opacity: 0.7 }}
                animate={{ scale: 2.5, opacity: 0 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
              />
            )}
            {service.icon}
          </div>
          <motion.span
            key={isHovered ? 'h' : 'd'}
            initial={{ rotateX: -90, opacity: 0 }}
            animate={{ rotateX: 0, opacity: 1 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="font-montserrat text-[40px] font-bold leading-none select-none inline-block"
            style={{
              color: isHovered ? "rgba(228,190,106,0.6)" : "rgba(255,255,255,0.04)",
              textShadow: isHovered ? "0 0 30px rgba(212,168,67,0.5)" : "none",
              transformOrigin: 'top center',
            }}
          >
            {num}
          </motion.span>
        </div>

        {/* Divider line */}
        <div
          className="h-px bg-accent/50 my-5 origin-center relative z-10"
          style={{
            transform: isHovered ? "scaleX(1)" : "scaleX(0)",
            boxShadow: isHovered ? '0 0 10px rgba(212,168,67,0.4)' : 'none',
            transition: "transform 400ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 400ms ease",
          }}
        />

        {/* Bottom: title + description */}
        <div className="relative z-10 mt-auto">
          <h3
            className="font-montserrat text-xl lg:text-2xl font-semibold"
            style={{
              color: isHovered ? "#E4BE6A" : "#fff",
              transform: isHovered ? "translateX(6px)" : "translateX(0)",
              letterSpacing: isHovered ? '-0.02em' : '0em',
              transition: "color 350ms ease, transform 400ms cubic-bezier(0.16,1,0.3,1), letter-spacing 300ms ease",
            }}
          >
            {service.title}
          </h3>
          {canHover ? (
            <div className="font-inter text-sm text-white/50 mt-3 flex flex-wrap gap-x-[0.3em] relative z-10">
              {service.description.split(' ').map((word, wi) => (
                <motion.span
                  key={wi}
                  initial={false}
                  animate={isHovered
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 8 }
                  }
                  transition={{
                    duration: 0.25,
                    delay: isHovered ? wi * 0.02 : 0,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </div>
          ) : (
            <p
              className="font-inter text-sm text-white/50 mt-3"
              style={{
                opacity: 1,
                transform: "translateY(0)",
              }}
            >
              {service.description}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Services() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [canHover, setCanHover] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover)");
    setCanHover(mq.matches);
    const handler = (e: MediaQueryListEvent) => setCanHover(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const handleMouseEnter = useCallback((i: number) => {
    setHoveredIndex(i);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoveredIndex(null);
  }, []);

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

      {/* Header */}
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

      {/* Grid */}
      <div ref={sectionRef} className="px-3 lg:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {services.map((service, i) => (
            <ServiceCard
              key={service.title}
              service={service}
              index={i}
              isHovered={hoveredIndex === i}
              isFaded={hoveredIndex !== null && hoveredIndex !== i}
              isInView={isInView}
              onMouseEnter={() => handleMouseEnter(i)}
              onMouseLeave={handleMouseLeave}
              canHover={canHover}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
