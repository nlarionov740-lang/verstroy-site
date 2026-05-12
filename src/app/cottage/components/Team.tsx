// src/app/cottage/components/Team.tsx
import Image from "next/image";
import SectionTag from "./SectionTag";
import { TEAM } from "../data/team";

export default function Team() {
  return (
    <section className="py-24 lg:py-36 px-6 lg:px-16 bg-[#fafaf7]">
      <div className="max-w-[1440px] mx-auto">
        <SectionTag number="09 / 11" label="ПРОРАБЫ" />
        <h2
          className="font-[family-name:var(--font-display)] font-extrabold tracking-[-0.04em] leading-[0.95] mt-6 max-w-3xl"
          style={{ fontSize: "clamp(28px, 4.5vw, 56px)" }}
        >
          Ваш прораб —<br />
          <span className="bg-[#ffd400] px-2 inline-block">вот он.</span>
        </h2>
        <p className="text-sm text-black/60 mt-3 max-w-xl">
          Один человек ведёт стройку от котлована до ключей. Знакомитесь до подписания
          договора.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
          {TEAM.map((m, i) => (
            <article key={i} className="bg-white border border-black/10 overflow-hidden">
              <div className="relative aspect-[4/5] bg-gradient-to-br from-[#2a2a2a] to-[#0a0a0a] flex items-center justify-center">
                {m.photo ? (
                  <Image
                    src={m.photo}
                    alt={m.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="text-center text-[#d4b483]/60 font-mono text-[10px] tracking-widest">
                    [ PHOTO PENDING ]
                  </div>
                )}
                <div className="absolute top-4 left-4 right-4 flex justify-between font-mono text-[9px] tracking-widest text-[#ffd400]">
                  <span>VER STROY</span>
                  <span>0{i + 1}</span>
                </div>
              </div>
              <div className="p-6">
                <div className="font-mono text-[10px] tracking-widest opacity-50">
                  {m.role.toUpperCase()}
                </div>
                <h3 className="font-[family-name:var(--font-display)] font-extrabold text-xl mt-2">
                  {m.name}
                </h3>
                <div className="font-mono text-[11px] mt-3 bg-[#ffd400] inline-block px-2 py-0.5">
                  {m.experience}
                </div>
                <div className="mt-4 text-xs text-black/60">
                  <strong>Объекты:</strong> {m.objects.join(" · ")}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
