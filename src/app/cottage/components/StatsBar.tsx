"use client";

import CountUp from "@/components/CountUp";

const STATS = [
  { value: 15, suffix: "+", label: "ОБЪЕКТОВ" },
  { value: 8200, suffix: " м³", label: "БЕТОНА УЛОЖЕНО" },
  { value: 0, suffix: "", label: "БРОШЕННЫХ СТРОЕК" },
  { value: 6, suffix: "", label: "ЛЕТ НА РЫНКЕ" },
];

export default function StatsBar() {
  return (
    <section className="bg-[#0a0a0a] text-[#fafaf7] py-20 px-6 lg:px-16">
      <div className="max-w-[1440px] mx-auto">
        <div className="font-mono text-[10px] tracking-[0.25em] uppercase opacity-60 flex gap-3 mb-10">
          <span>VER STROY</span>
          <span>·</span>
          <span>04 / 11</span>
          <span>·</span>
          <span>ЦИФРЫ</span>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
        {STATS.map((s) => (
          <div key={s.label} className="border-l-2 border-[#ffd400] pl-5">
            <div
              className="font-[family-name:var(--font-display)] font-extrabold leading-none"
              style={{ fontSize: "clamp(40px, 6vw, 72px)" }}
            >
              <CountUp end={s.value} duration={1.5} />
              <span>{s.suffix}</span>
            </div>
            <div className="font-mono text-[10px] tracking-[0.2em] text-white/60 mt-3">
              {s.label}
            </div>
          </div>
        ))}
        </div>
      </div>
    </section>
  );
}
