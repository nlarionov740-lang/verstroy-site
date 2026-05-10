"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionTag from "./SectionTag";
import {
  PORTFOLIO,
  CATEGORIES,
  type PortfolioCategory,
} from "../data/portfolio";

export default function PortfolioGrid() {
  const [active, setActive] = useState<PortfolioCategory>("Все");

  const items =
    active === "Все"
      ? PORTFOLIO
      : PORTFOLIO.filter((p) => p.category === active);

  return (
    <section
      id="portfolio"
      className="py-24 lg:py-36 px-6 lg:px-16 bg-[#fafaf7]"
    >
      <div className="max-w-[1440px] mx-auto">
        <SectionTag number="07 / 11" label="ОБЪЕКТЫ" />
        <h2
          className="font-[family-name:var(--font-display)] font-extrabold tracking-[-0.04em] leading-[0.95] mt-6 max-w-3xl"
          style={{ fontSize: "clamp(28px, 4.5vw, 56px)" }}
        >
          15+ объектов по Уралу.
          <br />
          <span className="bg-[#ffd400] px-2 inline-block">Все наши.</span>
        </h2>

        {/* Фильтры */}
        <div className="flex flex-wrap gap-2 mt-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActive(cat)}
              className={`px-4 py-2 font-mono text-[11px] tracking-widest uppercase border transition ${
                active === cat
                  ? "bg-[#0a0a0a] text-[#fafaf7] border-[#0a0a0a]"
                  : "bg-transparent border-black/15 hover:border-black/40"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Bento-сетка */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-8">
          <AnimatePresence mode="popLayout">
            {items.map((item) => (
              <motion.article
                key={item.slug}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="group relative aspect-[4/5] bg-[#0a0a0a] overflow-hidden"
              >
                {/* Фото-плейсхолдер */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#2a2a2a] to-[#0a0a0a] flex items-center justify-center text-white/30 font-mono text-[10px] px-4 text-center">
                  {/* TODO: заменить на <Image src={item.cover} ... /> когда пути будут проверены */}
                  [ {item.title.toUpperCase()} ]
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition" />

                {/* Метки сверху */}
                <div className="absolute top-4 left-4 right-4 flex justify-between font-mono text-[9px] tracking-widest text-[#ffd400] z-10">
                  <span>{item.category.toUpperCase()}</span>
                  <span>{item.year}</span>
                </div>

                {/* Заголовок снизу */}
                <div className="absolute bottom-4 left-4 right-4 z-10">
                  <h3 className="text-white font-[family-name:var(--font-display)] font-extrabold text-xl leading-tight">
                    {item.title}
                  </h3>
                  <div className="font-mono text-[10px] tracking-widest text-white/60 mt-1">
                    {item.city} · {item.type}
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
