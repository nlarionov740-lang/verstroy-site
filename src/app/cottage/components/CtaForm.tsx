"use client";

import { useState } from "react";
import BlueprintGrid from "./BlueprintGrid";
import SectionTag from "./SectionTag";

export default function CtaForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [area, setArea] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          // existing /api/contact игнорирует доп. поля — это OK,
          // расширенные поля обрабатывает /api/cottage/quote из калькулятора
          source: "cottage-landing",
          email,
          area,
          message,
        }),
      });
      if (!res.ok) {
        const { error } = await res.json().catch(() => ({}));
        throw new Error(error || "Ошибка отправки");
      }
      setSubmitted(true);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Ошибка");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="cta"
      className="relative py-24 lg:py-36 px-6 lg:px-16 bg-[#0a0a0a] text-[#fafaf7] overflow-hidden"
    >
      <BlueprintGrid color="#ffd400" opacity={0.05} cellSize={40} />
      <div className="relative max-w-[1100px] mx-auto">
        <SectionTag number="11 / 11" label="ЗАЯВКА" className="text-[#ffd400] opacity-100" />
        <h2
          className="font-[family-name:var(--font-display)] font-extrabold tracking-[-0.04em] leading-[0.95] mt-6"
          style={{ fontSize: "clamp(36px, 6vw, 80px)" }}
        >
          Расчёт сметы<br />
          <span className="bg-[#ffd400] text-[#0a0a0a] px-3 inline-block">за 24 часа.</span>
        </h2>
        <p className="text-white/60 mt-4 max-w-2xl">
          Бесплатно. Без обязательств. Подпишем NDA по запросу.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-10 mt-12">
          {/* Форма */}
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Field label="Имя" value={name} onChange={setName} required />
              <Field label="Телефон" type="tel" value={phone} onChange={setPhone} required />
              <Field label="Email" type="email" value={email} onChange={setEmail} />
              <Field label="Площадь дома, м²" value={area} onChange={setArea} />
              <div>
                <label className="font-mono text-[10px] tracking-widest uppercase text-white/50">
                  Сообщение
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full mt-2 px-4 py-3 bg-white/5 border border-white/15 text-white placeholder-white/30 focus:outline-none focus:border-[#ffd400]"
                />
              </div>
              {/* TODO: Yandex SmartCaptcha widget — подключить когда ключ доступен */}
              <button
                type="submit"
                disabled={submitting}
                className="bg-[#ffd400] text-[#0a0a0a] px-8 py-4 font-bold tracking-widest text-sm hover:bg-[#ffea00] disabled:opacity-50 transition"
              >
                {submitting ? "ОТПРАВКА..." : "ОТПРАВИТЬ ЗАЯВКУ →"}
              </button>
            </form>
          ) : (
            <div className="border border-[#ffd400] p-8">
              <div className="font-mono text-[10px] tracking-widest text-[#ffd400]">
                STATUS / SUBMITTED
              </div>
              <h3 className="font-[family-name:var(--font-display)] font-extrabold text-3xl mt-3">
                Заявка получена.
              </h3>
              <p className="text-white/70 mt-3">
                Мы свяжемся с вами в течение 24 часов.
              </p>
            </div>
          )}

          {/* Контакты */}
          <aside className="space-y-3">
            <ContactBlock
              tag="ТЕЛЕФОН"
              href="tel:+79504511611"
              label="+7 950 451 16 11"
            />
            <ContactBlock
              tag="TELEGRAM"
              href="https://t.me/verstroy"
              label="@verstroy"
            />
            <ContactBlock
              tag="EMAIL"
              href="mailto:ver.stroy.company@mail.ru"
              label="ver.stroy.company@mail.ru"
            />
            <ContactBlock
              tag="ОФИС"
              href="#"
              label="г. Пермь, ул. Монастырская, 12, оф. 407"
            />
          </aside>
        </div>

        <div className="mt-16 pt-6 border-t border-white/10 flex flex-col sm:flex-row gap-3 justify-between text-[10px] font-mono tracking-widest text-white/40 uppercase">
          <span>© {new Date().getFullYear()} ООО «ВЕР СТРОЙ»</span>
          <a href="/privacy" className="hover:text-white/70 transition">
            Политика конфиденциальности
          </a>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  type = "text",
  value,
  onChange,
  required = false,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}) {
  return (
    <div>
      <label className="font-mono text-[10px] tracking-widest uppercase text-white/50">
        {label}
        {required ? " *" : ""}
      </label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full mt-2 px-4 py-3 bg-white/5 border border-white/15 text-white placeholder-white/30 focus:outline-none focus:border-[#ffd400]"
      />
    </div>
  );
}

function ContactBlock({
  tag,
  href,
  label,
}: {
  tag: string;
  href: string;
  label: string;
}) {
  return (
    <a
      href={href}
      className="block border border-white/15 p-5 hover:border-[#ffd400] transition group"
    >
      <div className="font-mono text-[10px] tracking-widest text-[#ffd400]">
        {tag}
      </div>
      <div className="mt-2 font-bold text-lg group-hover:text-[#ffd400] transition">
        {label}
      </div>
    </a>
  );
}
