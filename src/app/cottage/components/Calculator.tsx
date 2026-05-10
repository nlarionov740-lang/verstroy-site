"use client";

import { useMemo, useState } from "react";
import SectionTag from "./SectionTag";
import { calculate, formatRub } from "../lib/calculator";
import type {
  BoxType,
  FloorType,
  FinishType,
  EngineeringKey,
} from "../data/pricing";

const BOX_OPTIONS: Array<{ value: BoxType; label: string; hint: string }> = [
  { value: "monolith", label: "Монолит", hint: "Самый прочный, наш профиль" },
  { value: "aerated", label: "Газобетон", hint: "Оптимально по цене" },
  { value: "brick", label: "Кирпич", hint: "Классика, дольше срок" },
];

const FLOOR_OPTIONS: Array<{ value: FloorType; label: string }> = [
  { value: "one", label: "1 этаж" },
  { value: "two", label: "2 этажа" },
  { value: "twoAttic", label: "2 + мансарда" },
];

const FINISH_OPTIONS: Array<{ value: FinishType; label: string; hint: string }> =
  [
    { value: "rough", label: "Под чистовую", hint: "Стены готовы под обои" },
    { value: "full", label: "Под ключ", hint: "Заехали и живёте" },
  ];

const ENGINEERING_OPTIONS: Array<{ key: EngineeringKey; label: string }> = [
  { key: "warmFloor", label: "Тёплый пол" },
  { key: "boilerRoom", label: "Котельная" },
  { key: "sewer", label: "Канализация" },
  { key: "well", label: "Скважина" },
];

export default function Calculator() {
  const [area, setArea] = useState(280);
  const [boxType, setBoxType] = useState<BoxType>("monolith");
  const [floorType, setFloorType] = useState<FloorType>("two");
  const [finishType, setFinishType] = useState<FinishType>("rough");
  const [engineering, setEngineering] = useState<EngineeringKey[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const result = useMemo(
    () =>
      calculate({ area, boxType, floorType, finishType, engineering }),
    [area, boxType, floorType, finishType, engineering]
  );

  const toggleEng = (key: EngineeringKey) => {
    setEngineering((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/cottage/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          phone,
          area,
          boxType,
          floorType,
          finishType,
          engineering,
          total: result.total,
        }),
      });
      if (!res.ok) {
        const { error } = await res.json().catch(() => ({}));
        throw new Error(error || "Ошибка отправки");
      }
      setSubmitted(true);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Ошибка отправки");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="py-24 lg:py-36 px-6 lg:px-16 bg-[#fafaf7]" id="calculator">
      <div className="max-w-[1440px] mx-auto">
        <SectionTag number="08 / 11" label="КАЛЬКУЛЯТОР" />
        <h2
          className="font-[family-name:var(--font-display)] font-extrabold tracking-[-0.04em] leading-[0.95] mt-6 max-w-3xl"
          style={{ fontSize: "clamp(28px, 4.5vw, 56px)" }}
        >
          Прикинем смету<br />
          <span className="bg-[#ffd400] px-2 inline-block">прямо сейчас.</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-6 mt-12">
          {/* Левая часть — параметры */}
          <div className="bg-white border border-black/10 p-6 lg:p-10 space-y-8">
            {/* Площадь */}
            <div>
              <label className="font-mono text-[10px] tracking-widest uppercase opacity-60">
                Площадь · {area} м²
              </label>
              <input
                type="range"
                min={100}
                max={500}
                step={10}
                value={area}
                onChange={(e) => setArea(Number(e.target.value))}
                className="w-full mt-3 accent-[#ffd400]"
              />
              <div className="flex justify-between font-mono text-[9px] opacity-50 mt-1">
                <span>100</span>
                <span>500</span>
              </div>
            </div>

            {/* Тип коробки */}
            <RadioGroup
              label="Тип коробки"
              options={BOX_OPTIONS.map((o) => ({
                value: o.value,
                label: o.label,
                hint: o.hint,
              }))}
              value={boxType}
              onChange={(v) => setBoxType(v as BoxType)}
            />

            {/* Этажность */}
            <RadioGroup
              label="Этажность"
              options={FLOOR_OPTIONS}
              value={floorType}
              onChange={(v) => setFloorType(v as FloorType)}
            />

            {/* Отделка */}
            <RadioGroup
              label="Отделка"
              options={FINISH_OPTIONS.map((o) => ({
                value: o.value,
                label: o.label,
                hint: o.hint,
              }))}
              value={finishType}
              onChange={(v) => setFinishType(v as FinishType)}
            />

            {/* Инженерия */}
            <div>
              <div className="font-mono text-[10px] tracking-widest uppercase opacity-60">
                Инженерия
              </div>
              <div className="grid grid-cols-2 gap-2 mt-3">
                {ENGINEERING_OPTIONS.map((o) => {
                  const checked = engineering.includes(o.key);
                  return (
                    <button
                      key={o.key}
                      type="button"
                      onClick={() => toggleEng(o.key)}
                      className={`px-4 py-3 text-left border transition ${
                        checked
                          ? "bg-[#0a0a0a] text-[#fafaf7] border-[#0a0a0a]"
                          : "bg-white border-black/15 hover:border-black/40"
                      }`}
                    >
                      <span className="font-mono text-[10px] tracking-widest opacity-60 block">
                        {checked ? "✓" : "○"}
                      </span>
                      <span className="font-bold text-sm">{o.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Правая часть — итог + форма */}
          <aside className="bg-[#0a0a0a] text-[#fafaf7] p-6 lg:p-10 sticky lg:top-8 self-start">
            <div className="font-mono text-[10px] tracking-widest text-[#ffd400]">
              ОРИЕНТИРОВОЧНО
            </div>
            <div
              className="font-[family-name:var(--font-display)] font-extrabold leading-none mt-3"
              style={{ fontSize: "clamp(36px, 5vw, 64px)" }}
            >
              {formatRub(result.total)}
            </div>
            <div className="font-mono text-[10px] tracking-widest text-white/60 mt-2">
              {area} М² · {BOX_OPTIONS.find((b) => b.value === boxType)?.label}
            </div>
            <p className="text-xs text-white/50 mt-6 leading-relaxed">
              Точная смета — после выезда инженера на участок. Бесплатно.
            </p>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="mt-6 space-y-3">
                <input
                  type="tel"
                  placeholder="Телефон"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/15 text-white placeholder-white/40 focus:outline-none focus:border-[#ffd400]"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/15 text-white placeholder-white/40 focus:outline-none focus:border-[#ffd400]"
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-[#ffd400] text-[#0a0a0a] py-4 font-bold tracking-widest text-sm hover:bg-[#ffea00] disabled:opacity-50 transition"
                >
                  {submitting ? "ОТПРАВКА..." : "ПОЛУЧИТЬ ДЕТАЛЬНУЮ СМЕТУ"}
                </button>
              </form>
            ) : (
              <div className="mt-6 p-4 border border-[#ffd400] text-[#ffd400] font-mono text-xs">
                ✓ ОТПРАВЛЕНО. МЫ СВЯЖЕМСЯ В ТЕЧЕНИЕ 24 ЧАСОВ.
              </div>
            )}
          </aside>
        </div>
      </div>
    </section>
  );
}

function RadioGroup<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: Array<{ value: T; label: string; hint?: string }>;
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div>
      <div className="font-mono text-[10px] tracking-widest uppercase opacity-60">
        {label}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-3">
        {options.map((o) => (
          <button
            key={o.value}
            type="button"
            onClick={() => onChange(o.value)}
            className={`px-4 py-3 text-left border transition ${
              value === o.value
                ? "bg-[#0a0a0a] text-[#fafaf7] border-[#0a0a0a]"
                : "bg-white border-black/15 hover:border-black/40"
            }`}
          >
            <div className="font-bold text-sm">{o.label}</div>
            {o.hint && (
              <div
                className={`text-[10px] mt-1 ${
                  value === o.value ? "text-white/60" : "text-black/50"
                }`}
              >
                {o.hint}
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
