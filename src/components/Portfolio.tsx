"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useAnimationFrame } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Keyboard, Zoom } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/zoom";
import Image from "next/image";
import { projects, getProjectPhotos, getCoverUrl, type Project } from "@/data/projects";

/* ── Interactive ticker with drag + auto-scroll ── */
function TickerMarquee({
  items,
  activeFilter,
  onFilter,
  visible,
}: {
  items: string[];
  activeFilter: string;
  onFilter: (v: string) => void;
  visible: boolean;
}) {
  const x = useMotionValue(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const isHovered = useRef(false);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartVal = useRef(0);
  const speed = 0.6; // px per frame

  // Auto-scroll when not interacting
  useAnimationFrame(() => {
    if (isHovered.current || isDragging.current) return;
    const track = trackRef.current;
    if (!track) return;
    const half = track.scrollWidth / 2;
    let next = x.get() - speed;
    if (next <= -half) next += half;
    x.set(next);
  });

  // Wrap position after drag
  const wrapX = () => {
    const track = trackRef.current;
    if (!track) return;
    const half = track.scrollWidth / 2;
    let cur = x.get();
    while (cur <= -half) cur += half;
    while (cur > 0) cur -= half;
    x.set(cur);
  };

  const onMouseEnter = () => { isHovered.current = true; };
  const onMouseLeave = () => {
    isHovered.current = false;
    isDragging.current = false;
    wrapX();
  };
  const onPointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    dragStartX.current = e.clientX;
    dragStartVal.current = x.get();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const delta = e.clientX - dragStartX.current;
    x.set(dragStartVal.current + delta);
  };
  const onPointerUp = () => {
    isDragging.current = false;
    wrapX();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={visible ? { opacity: 1 } : {}}
      transition={{ duration: 0.8, delay: 0.15 }}
      className="mb-14 relative overflow-hidden py-2 select-none"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      style={{ touchAction: "pan-y" }}
    >
      {/* Fade edges */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-r from-bg-section to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-l from-bg-section to-transparent" />

      <motion.div
        ref={trackRef}
        style={{ x }}
        className="flex shrink-0 items-center"
      >
        {[...Array(2)].map((_, setIndex) => (
          <div key={setIndex} className="flex shrink-0 items-center">
            {items.map((text) => (
              <span key={`${setIndex}-${text}`} className="flex shrink-0 items-center">
                <button
                  onClick={() => onFilter(text)}
                  className={`whitespace-nowrap font-montserrat text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight transition-all duration-300 cursor-pointer hover:text-accent ${
                    text === activeFilter
                      ? "text-accent drop-shadow-[0_0_12px_rgba(212,168,67,0.3)]"
                      : "text-white/20 hover:text-white/50"
                  }`}
                >
                  {text}
                </button>
                <span className="mx-5 text-accent/40 text-lg select-none" aria-hidden="true">&#xB7;</span>
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}

export default function Portfolio() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [activeFilter, setActiveFilter] = useState("Все работы");
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });

  const tickerItems = [
    "Все работы",
    "Монолитные работы",
    "Фасадные работы",
    "Кровельные работы",
    "Кладочные работы",
  ];

  const filteredProjects = activeFilter === "Все работы"
    ? projects
    : projects.filter((p) => {
        if (activeFilter === "Монолитные работы") return p.type.startsWith("Монолит");
        if (activeFilter === "Кровельные работы") return p.type === "Кровля";
        if (activeFilter === "Фасадные работы") return p.type === "Фасад";
        if (activeFilter === "Кладочные работы") return p.type === "Кладка";
        return false;
      });

  const photos = selectedProject
    ? getProjectPhotos(selectedProject.slug, selectedProject.photoCount)
    : [];

  const openGallery = useCallback((project: Project, startIndex = 0) => {
    setCurrentSlide(startIndex);
    setSelectedProject(project);
    document.body.style.overflow = "hidden";
  }, []);

  const closeGallery = useCallback(() => {
    setSelectedProject(null);
    setSwiperInstance(null);
    document.body.style.overflow = "";
  }, []);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeGallery();
    };
    if (selectedProject) {
      window.addEventListener("keydown", handleKey);
      return () => window.removeEventListener("keydown", handleKey);
    }
  }, [selectedProject, closeGallery]);

  return (
    <section id="portfolio" className="relative py-24 lg:py-32 bg-bg-section">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

      <div ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 mx-auto max-w-7xl px-6 lg:px-8"
        >
          <span className="text-accent text-sm font-semibold tracking-widest uppercase mb-4 block">
            Портфолио
          </span>
          <h2 className="font-montserrat text-4xl lg:text-5xl font-bold text-white mb-4">
            Как мы строим
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Фотографии с объектов — не для красоты. Это фиксация технологии: как укладываем, как льём, как собираем.
          </p>
        </motion.div>

        {/* Ticker / marquee — fullwidth */}
        <TickerMarquee
          items={tickerItems}
          activeFilter={activeFilter}
          onFilter={setActiveFilter}
          visible={inView}
        />

        {/* Projects grid — FULLWIDTH */}
        <div className="px-1 sm:px-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-1 sm:gap-2">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, i) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: 0.04 * i }}
                  onClick={() => openGallery(project)}
                  className="group relative cursor-pointer overflow-hidden aspect-[4/5]"
                >
                  {/* Cover photo */}
                  <Image
                    src={getCoverUrl(project.slug)}
                    alt={project.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1536px) 33vw, 25vw"
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-500" />

                  {/* Hover: inset accent border */}
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-accent/40 transition-colors duration-300 pointer-events-none z-10" />

                  {/* Photo count badge */}
                  <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full bg-black/40 backdrop-blur-md px-2.5 py-1 text-xs text-white/80 z-10">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
                    </svg>
                    {project.photoCount}
                  </div>

                  {/* Content — bottom */}
                  <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 flex flex-col z-10">
                    <span className="text-accent text-[11px] font-semibold tracking-[0.15em] uppercase mb-1.5">
                      {project.type}
                    </span>
                    <h3 className="font-montserrat text-lg sm:text-xl 2xl:text-2xl font-semibold text-white leading-tight mb-0.5 group-hover:text-accent transition-colors duration-300">
                      {project.name}
                    </h3>
                    <span className="text-white/50 text-sm">
                      {project.location}
                    </span>

                    {/* "Смотреть" — slides up on hover */}
                    <div className="mt-3 flex items-center gap-2 text-accent text-sm font-medium translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400">
                      <span>Смотреть проект</span>
                      <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Full-screen Gallery Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-[#060606]"
          >
            {/* Watermark pattern — ВЕР СТРОЙ repeated across the background */}
            <div
              className="absolute inset-0 overflow-hidden pointer-events-none select-none"
              aria-hidden="true"
            >
              <div
                className="absolute inset-[-50%] w-[200%] h-[200%] opacity-[0.03]"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='120'%3E%3Ctext x='10' y='45' font-family='system-ui,sans-serif' font-size='18' font-weight='700' fill='white' letter-spacing='8' transform='rotate(-15 160 60)'%3EВЕР СТРОЙ%3C/text%3E%3Ctext x='170' y='100' font-family='system-ui,sans-serif' font-size='18' font-weight='700' fill='white' letter-spacing='8' transform='rotate(-15 160 60)'%3EВЕР СТРОЙ%3C/text%3E%3C/svg%3E")`,
                  backgroundSize: "320px 120px",
                }}
              />
            </div>

            {/* Top bar */}
            <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-5 sm:px-8 py-5">
              <div className="min-w-0 flex items-center gap-4">
                <h3 className="font-montserrat text-lg sm:text-xl font-bold text-white truncate">
                  {selectedProject.name}
                </h3>
                <div className="hidden sm:flex items-center gap-2 text-white/30 text-sm">
                  <span>{selectedProject.location}</span>
                  <span className="w-1 h-1 rounded-full bg-white/15" />
                  <span>{selectedProject.type}</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                {/* Counter pill */}
                <div className="flex items-center gap-1.5 rounded-full bg-white/8 px-4 py-2 text-sm tabular-nums backdrop-blur-sm">
                  <span className="text-accent font-bold">{currentSlide + 1}</span>
                  <span className="text-white/20">/</span>
                  <span className="text-white/40">{photos.length}</span>
                </div>

                <button
                  onClick={closeGallery}
                  className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-white/8 text-white/60 hover:bg-white/15 hover:text-white transition-all"
                  aria-label="Закрыть"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Swiper */}
            <div className="absolute inset-0 z-10 flex items-center pt-16 pb-14">
              <Swiper
                modules={[Navigation, Keyboard, Zoom]}
                navigation
                keyboard={{ enabled: true }}
                zoom={{ maxRatio: 3 }}
                initialSlide={currentSlide}
                onSwiper={setSwiperInstance}
                onSlideChange={(swiper) => setCurrentSlide(swiper.activeIndex)}
                className="w-full h-full portfolio-swiper"
                spaceBetween={0}
                slidesPerView={1}
              >
                {photos.map((photo, index) => (
                  <SwiperSlide key={index} className="flex items-center justify-center">
                    <div className="swiper-zoom-container flex items-center justify-center w-full h-full">
                      <Image
                        src={photo}
                        alt={`${selectedProject.name} — фото ${index + 1}`}
                        width={1400}
                        height={1050}
                        className="max-w-full max-h-full object-contain"
                        loading={index < 3 ? "eager" : "lazy"}
                        quality={85}
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Bottom progress bar */}
            <div className="absolute bottom-0 left-0 right-0 z-20">
              <div className="mx-8 sm:mx-16 mb-5 flex items-center gap-4">
                {/* Thin progress track */}
                <div className="flex-1 h-[3px] rounded-full bg-white/8 overflow-hidden">
                  <motion.div
                    className="h-full bg-accent rounded-full"
                    initial={false}
                    animate={{ width: `${((currentSlide + 1) / photos.length) * 100}%` }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
