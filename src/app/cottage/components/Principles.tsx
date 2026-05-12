// src/app/cottage/components/Principles.tsx
"use client";

import { motion } from "framer-motion";
import SectionTag from "./SectionTag";
import { PRINCIPLES } from "../data/principles";

export default function Principles() {
  return (
    <section className="py-24 lg:py-36 px-6 lg:px-16 bg-[#fafaf7]">
      <div className="max-w-[1440px] mx-auto">
        <SectionTag number="05 / 11" label="ПРИНЦИПЫ" />
        <h2
          className="font-[family-name:var(--font-display)] font-extrabold tracking-[-0.04em] leading-[0.95] mt-6 max-w-3xl"
          style={{ fontSize: "clamp(28px, 4.5vw, 56px)" }}
        >
          5 принципов, которые отличают <br />
          <span className="bg-[#ffd400] px-2 inline-block">наш монолит.</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
          {PRINCIPLES.map((p, i) => (
            <motion.article
              key={p.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`bg-white border border-black/10 p-6 lg:p-8 ${
                i === 3 ? "md:col-start-1" : ""
              }`}
            >
              <div className="font-mono text-[10px] tracking-[0.25em] opacity-50">
                {p.number}
              </div>
              <h3 className="font-[family-name:var(--font-display)] font-extrabold text-xl lg:text-2xl mt-4 leading-tight">
                {p.title}
              </h3>
              <p className="text-sm text-black/70 leading-relaxed mt-3">
                {p.description}
              </p>
              <div className="mt-5 pt-4 border-t border-black/10 font-mono text-[10px] tracking-[0.2em] uppercase">
                <span className="bg-[#ffd400] px-1.5 py-0.5">→</span>{" "}
                {p.proof}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
