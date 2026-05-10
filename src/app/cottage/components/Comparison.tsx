"use client";

import { motion } from "framer-motion";
import SectionTag from "./SectionTag";

export default function Comparison() {
  return (
    <section className="relative py-24 lg:py-36 px-6 lg:px-16 bg-[#fafaf7]">
      <div className="max-w-[1440px] mx-auto">
        <SectionTag number="02 / 11" label="ОТ ТЦ К КОТТЕДЖУ" />

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="font-[family-name:var(--font-display)] font-extrabold tracking-[-0.04em] leading-[0.95] mt-6 max-w-3xl"
          style={{ fontSize: "clamp(28px, 4.5vw, 56px)" }}
        >
          Та же опалубка. Та же команда. <br />
          <span className="bg-[#ffd400] px-2 inline-block">Та же арматура.</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12">
          <ComparisonCard
            tag="ТЦ ВЕРА · ВЕРЕЩАГИНО · 2024"
            label="КОММЕРЧЕСКИЙ ОБЪЕКТ"
            // TODO: заменить на реальное фото колонн ТЦ из covers/photos
            placeholder="[ ТЦ ВЕРА · МОНОЛИТ ]"
          />
          <ComparisonCard
            tag="КОТТЕДЖ 280 М² · ПЕРМЬ · 2025"
            label="ЧАСТНЫЙ ЗАКАЗЧИК"
            placeholder="[ AI: КОТТЕДЖ · ОПАЛУБКА ]"
            isAi
          />
        </div>
      </div>
    </section>
  );
}

function ComparisonCard({
  tag,
  label,
  placeholder,
  isAi = false,
}: {
  tag: string;
  label: string;
  placeholder: string;
  isAi?: boolean;
}) {
  return (
    <div className="relative aspect-[4/5] bg-gradient-to-br from-[#2a2a2a] to-[#0a0a0a] flex items-center justify-center text-[#888] font-mono text-xs overflow-hidden">
      <div className="text-center">{placeholder}</div>
      <div className="absolute top-4 left-4 right-4 flex justify-between font-mono text-[9px] text-[#d4b483] tracking-widest">
        <span>{tag}</span>
        <span>{label}</span>
      </div>
      {isAi && (
        <div className="absolute bottom-4 left-4 font-mono text-[8px] text-[#d4b483]/60">
          AI-PHOTO · NANO BANANA PRO
        </div>
      )}
    </div>
  );
}
