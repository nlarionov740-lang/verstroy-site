// src/app/cottage/components/FAQ.tsx
import SectionTag from "./SectionTag";
import { FAQ_ITEMS } from "../data/faq";

export default function FAQ() {
  return (
    <section className="py-24 lg:py-36 px-6 lg:px-16 bg-[#fafaf7]">
      <div className="max-w-[1100px] mx-auto">
        <SectionTag number="10 / 11" label="ВОПРОСЫ" />
        <h2
          className="font-[family-name:var(--font-display)] font-extrabold tracking-[-0.04em] leading-[0.95] mt-6"
          style={{ fontSize: "clamp(28px, 4.5vw, 56px)" }}
        >
          Что обычно спрашивают.
        </h2>

        <div className="mt-12 divide-y divide-black/10 border-t border-b border-black/10">
          {FAQ_ITEMS.map((item, i) => (
            <details key={i} className="group">
              <summary className="cursor-pointer py-6 flex items-start gap-6 select-none list-none">
                <span className="font-mono text-[11px] tracking-widest opacity-50 shrink-0 mt-1.5">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex-1 font-bold text-lg leading-snug">
                  {item.q}
                </span>
                <span className="font-mono text-xl shrink-0 mt-1 transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="pl-[64px] pr-6 pb-6 text-sm text-black/70 leading-relaxed">
                {item.a}
              </p>
            </details>
          ))}
        </div>

        <div className="mt-12 flex flex-col sm:flex-row gap-3">
          <a
            href="/договор-образец.pdf"
            className="inline-flex items-center gap-2 px-5 py-3 border border-black/15 hover:border-black/40 font-mono text-[11px] tracking-widest uppercase transition"
          >
            ↓ Скачать образец договора
          </a>
          <a
            href="#cta"
            className="inline-flex items-center gap-2 px-5 py-3 bg-[#0a0a0a] text-white font-mono text-[11px] tracking-widest uppercase hover:bg-[#1a1a1a] transition"
          >
            → Задать свой вопрос
          </a>
        </div>
      </div>
    </section>
  );
}
