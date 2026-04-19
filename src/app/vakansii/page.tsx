"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import WeldingSparks from "@/components/WeldingSparks";
import BlueprintBackground from "@/components/BlueprintBackground";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Vacancy {
  id: string;
  title: string;
  subtitle: string;
  requirements: string[];
  duties: string[];
  conditions: string[];
  salary: string;
  schedule: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const vacancies: Vacancy[] = [
  {
    id: "monolithic",
    title: "Бетонщик / Арматурщик",
    subtitle: "Монолитные работы",
    salary: "от 120 000 руб.",
    schedule: "Гибкий график",
    requirements: [
      "Опыт монолитных работ от 2 лет",
      "Навыки вязки арматуры и установки опалубки",
      "Опыт бетонирования конструкций различного класса",
      "Допуск к работам на высоте — приветствуется",
    ],
    duties: [
      "Монтаж и демонтаж опалубки (рамная, щитовая, туннельная)",
      "Армирование — вязка, сборка каркасов по чертежам",
      "Укладка и уплотнение бетонных смесей",
      "Уход за бетоном в период твердения",
      "Соблюдение технологических карт и ППР",
    ],
    conditions: [
      "Зарплата от 120 000 руб. — без задержек, на карту",
      "Официальное трудоустройство по ТК РФ",
      "Вахтовый метод или сменный график — по договорённости",
      "Проживание и питание на вахте за счёт компании",
      "Спецодежда и СИЗ — полный комплект за наш счёт",
      "Объекты в Пермском крае и регионах присутствия",
    ],
  },
  {
    id: "mason",
    title: "Каменщик",
    subtitle: "Кирпичная кладка, газоблок, блоки",
    salary: "от 100 000 руб.",
    schedule: "Гибкий график",
    requirements: [
      "Опыт каменщика от 2 лет",
      "Владение кладкой из кирпича, газобетонных блоков, керамического блока",
      "Знание технологии армированной кладки",
      "Опыт кладки с оконными и дверными проёмами",
      "4–6 разряд — приветствуется",
    ],
    duties: [
      "Кирпичная кладка наружных и внутренних стен по проекту",
      "Кладка из газобетонных блоков с клеем и армированием",
      "Устройство перемычек, облицовочной кладки",
      "Контроль геометрии — по уровню, отвесу, шнуру",
      "Приёмка и расход материалов по норме",
    ],
    conditions: [
      "Зарплата от 100 000 руб. — стабильная, без задержек",
      "Официальное трудоустройство",
      "Вахтовый метод или местная работа — обсуждается",
      "Проживание на вахте — за счёт компании",
      "Полный соцпакет: ТК РФ, больничный, отпуск",
      "Постоянная загрузка — объекты в очереди",
    ],
  },
  {
    id: "finisher",
    title: "Отделочник",
    subtitle: "Внутренняя и внешняя отделка",
    salary: "от 120 000 руб.",
    schedule: "Гибкий график",
    requirements: [
      "Опыт отделочных работ от 2 лет",
      "Штукатурные работы — машинные и ручные",
      "Устройство стяжек, укладка плитки",
      "Шпаклёвка, окраска, поклейка обоев",
      "Монтаж ГКЛ-конструкций — плюс",
    ],
    duties: [
      "Штукатурка стен и потолков (ручная, машинная)",
      "Устройство цементных и самовыравнивающихся стяжек",
      "Укладка керамической плитки и керамогранита",
      "Шпаклёвка под покраску, финишная отделка",
      "Монтаж подвесных потолков и ГКЛ-перегородок",
    ],
    conditions: [
      "Зарплата от 120 000 руб.",
      "Официальное оформление с первого дня",
      "Постоянная занятость — несколько объектов в работе",
      "Инструмент и расходники — за счёт компании",
      "Карьерный рост: бригадир, мастер участка",
      "Выплаты 2 раза в месяц",
    ],
  },
  {
    id: "installer",
    title: "Монтажник",
    subtitle: "Общестроительные и монтажные работы",
    salary: "от 120 000 руб.",
    schedule: "Вахта / Сменный",
    requirements: [
      "Опыт монтажных работ в строительстве от 2 лет",
      "Монтаж металлоконструкций, ограждений, лестниц",
      "Навыки работы с болтовыми и сварными соединениями",
      "Допуск к работам на высоте (группа 1–2)",
      "Опыт работы на промышленных объектах — плюс",
    ],
    duties: [
      "Монтаж металлических конструкций по проектной документации",
      "Установка лестниц, ограждений, технологических площадок",
      "Монтаж закладных деталей и анкерных систем",
      "Такелажные работы — строповка, перемещение грузов",
      "Контроль геометрии и качества соединений",
    ],
    conditions: [
      "Зарплата от 120 000 руб. — своевременно",
      "Официальное трудоустройство по ТК РФ",
      "Вахтовый метод — компенсация проезда",
      "Проживание и питание на вахте за счёт организации",
      "Полный комплект СИЗ и спецодежды",
      "Опыт работы на объектах ЛУКОЙЛ, OZON — в портфолио бригады",
    ],
  },
  {
    id: "welder",
    title: "Сварщик",
    subtitle: "Ручная дуговая, полуавтомат",
    salary: "от 150 000 руб.",
    schedule: "Вахта 30/60 или 60/30",
    requirements: [
      "Опыт сварочных работ от 3 лет",
      "Действующий НАКС — обязательно",
      "Ручная дуговая сварка (РДС)",
      "Полуавтоматическая сварка (MIG/MAG) — желательно",
      "Умение работать с металлоконструкциями по чертежам",
    ],
    duties: [
      "Сварка металлоконструкций, закладных деталей, анкеров",
      "Сварка арматурных каркасов и закладных",
      "Подварка швов при монтаже конструкций",
      "Контроль геометрии и качества сварных швов",
      "Ведение журнала сварочных работ",
    ],
    conditions: [
      "Зарплата от 150 000 руб. — одна из лучших в отрасли",
      "Официальное трудоустройство",
      "Вахтовый метод или местная работа — договоримся",
      "Сварочное оборудование современное — всё наше",
      "Проживание и питание на вахте — бесплатно",
      "Постоянная загрузка: несколько объектов параллельно",
    ],
  },
];

const specialtyOptions = vacancies.map((v) => v.title + " — " + v.subtitle);

// ─── Ease ─────────────────────────────────────────────────────────────────────

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

// ─── Phone formatter ──────────────────────────────────────────────────────────

function formatPhone(v: string) {
  let d = v.replace(/\D/g, "");
  if (!d) return "";
  if (d[0] === "8") d = "7" + d.slice(1);
  else if (d[0] !== "7") d = "7" + d;
  d = d.slice(0, 11);
  let r = "+7";
  if (d.length > 1) r += " (" + d.slice(1, 4);
  if (d.length > 4) r += ") " + d.slice(4, 7);
  if (d.length > 7) r += "-" + d.slice(7, 9);
  if (d.length > 9) r += "-" + d.slice(9, 11);
  return r;
}

// ─── FloatingInput ────────────────────────────────────────────────────────────

function FloatingInput({
  name,
  label,
  type = "text",
  required = false,
  value,
  onChange,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const [focused, setFocused] = useState(false);
  const floated = focused || value.length > 0;

  return (
    <div className="relative">
      <input
        name={name}
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder=" "
        autoComplete={type === "tel" ? "tel" : "name"}
        className="peer w-full px-5 pt-7 pb-2 bg-white/5 border border-white/20 rounded-lg text-white focus:border-accent/50 focus:bg-white/[0.07] focus:outline-none focus:shadow-[0_0_0_3px_rgba(212,168,67,0.15)] transition-all duration-300"
      />
      <label
        className={`absolute left-5 transition-all duration-300 pointer-events-none ${
          floated
            ? "top-2 text-xs text-accent"
            : "top-1/2 -translate-y-1/2 text-sm text-white/30"
        }`}
      >
        {label}
      </label>
    </div>
  );
}

// ─── VacancyCard ──────────────────────────────────────────────────────────────

function VacancyCard({
  vacancy,
  index,
  onApply,
}: {
  vacancy: Vacancy;
  index: number;
  onApply: (specialty: string) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease }}
      className="bg-white/[0.03] border border-white/[0.09] rounded-2xl overflow-hidden"
    >
      {/* Header */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full text-left px-6 py-6 lg:px-8 lg:py-7 flex items-start justify-between gap-4 hover:bg-white/[0.02] transition-colors duration-200"
        aria-expanded={open}
      >
        <div className="flex flex-col gap-1.5">
          <span className="text-accent text-xs font-semibold uppercase tracking-widest">
            {vacancy.subtitle}
          </span>
          <h3 className="font-montserrat text-xl lg:text-2xl font-bold text-white">
            {vacancy.title}
          </h3>
          <div className="flex flex-wrap gap-3 mt-2">
            <span className="inline-flex items-center gap-1.5 text-sm text-white/60">
              <svg className="w-4 h-4 text-accent/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75" />
              </svg>
              {vacancy.salary}
            </span>
            <span className="w-px h-4 bg-white/10 self-center" />
            <span className="inline-flex items-center gap-1.5 text-sm text-white/60">
              <svg className="w-4 h-4 text-accent/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {vacancy.schedule}
            </span>
          </div>
        </div>

        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="shrink-0 mt-1 w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-white/40"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </motion.span>
      </button>

      {/* Expanded content */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-7 lg:px-8 lg:pb-8 border-t border-white/[0.07] pt-6">
              <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
                {/* Требования */}
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-4">
                    Требования
                  </h4>
                  <ul className="space-y-2.5">
                    {vacancy.requirements.map((r, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-white/65 leading-relaxed">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-accent/60 shrink-0" />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Обязанности */}
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-4">
                    Обязанности
                  </h4>
                  <ul className="space-y-2.5">
                    {vacancy.duties.map((d, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-white/65 leading-relaxed">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-accent/60 shrink-0" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Условия */}
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-4">
                    Условия
                  </h4>
                  <ul className="space-y-2.5">
                    {vacancy.conditions.map((c, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-white/65 leading-relaxed">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400/60 shrink-0" />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-7 pt-6 border-t border-white/[0.07]">
                <button
                  type="button"
                  onClick={() => onApply(`${vacancy.title} — ${vacancy.subtitle}`)}
                  className="inline-flex items-center gap-2 px-7 py-3 bg-accent text-primary-dark font-semibold text-sm uppercase tracking-wider rounded-lg hover:bg-accent-light transition-colors duration-300"
                >
                  Откликнуться на вакансию
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Apply Form ───────────────────────────────────────────────────────────────

function ApplyForm({
  preselect,
  onClose,
}: {
  preselect: string;
  onClose: () => void;
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [specialty, setSpecialty] = useState(preselect);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(formatPhone(e.target.value.replace(/\D/g, "")));
    if (status !== "idle" && status !== "loading") setStatus("idle");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const digits = phone.replace(/\D/g, "");
    if (digits.length < 11) { setStatus("error"); return; }
    setStatus("loading");
    try {
      const res = await fetch("/api/vacancy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, specialty }),
      });
      if (res.ok) { setStatus("success"); }
      else { setStatus("error"); }
    } catch { setStatus("error"); }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        transition={{ duration: 0.35, ease }}
        className="relative w-full max-w-md bg-bg-section border border-white/10 rounded-2xl p-8 shadow-2xl"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-white/30 hover:text-white transition-colors rounded-lg hover:bg-white/5"
          aria-label="Закрыть"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h3 className="font-montserrat text-2xl font-bold text-white mb-1">
          Откликнуться
        </h3>
        <p className="text-white/50 text-sm mb-7">
          Оставьте контакты — HR-менеджер свяжется в течение рабочего дня
        </p>

        {status === "success" ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-4 py-6 text-center"
          >
            <div className="w-14 h-14 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center">
              <svg className="w-7 h-7 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-green-400 font-semibold">Заявка отправлена</p>
            <p className="text-white/40 text-sm">Мы позвоним вам в ближайшее время</p>
            <button
              type="button"
              onClick={onClose}
              className="mt-2 px-6 py-2.5 border border-white/10 text-white/60 text-sm rounded-lg hover:bg-white/5 transition-colors"
            >
              Закрыть
            </button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <FloatingInput name="name" label="Ваше имя" required value={name} onChange={(e) => setName(e.target.value)} />
            <FloatingInput name="phone" label="Телефон" type="tel" required value={phone} onChange={handlePhoneChange} />

            {/* Specialty select */}
            <div className="relative">
              <select
                name="specialty"
                required
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
                className="w-full px-5 py-4 bg-white/5 border border-white/20 rounded-lg text-white focus:border-accent/50 focus:outline-none focus:shadow-[0_0_0_3px_rgba(212,168,67,0.15)] transition-all duration-300 appearance-none text-sm"
              >
                <option value="" disabled className="bg-bg-section">Выберите специальность</option>
                {specialtyOptions.map((s) => (
                  <option key={s} value={s} className="bg-bg-section">{s}</option>
                ))}
              </select>
              <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            {status === "error" && (
              <p className="text-red-400 text-sm">
                Проверьте номер телефона или позвоните: 8 (950) 451-16-11
              </p>
            )}

            <motion.button
              type="submit"
              disabled={status === "loading"}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="w-full py-4 bg-accent text-primary-dark font-semibold uppercase tracking-wider rounded-lg hover:bg-accent-light transition-colors duration-300 disabled:opacity-60 text-sm mt-2"
            >
              {status === "loading" ? "Отправка..." : "Отправить заявку"}
            </motion.button>

            <p className="text-white/25 text-[11px] text-center pt-1">
              Нажимая кнопку, вы соглашаетесь на{" "}
              <Link href="/privacy" className="underline hover:text-accent transition-colors">
                обработку персональных данных
              </Link>
            </p>
          </form>
        )}
      </motion.div>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function VakansiPage() {
  const [applySpecialty, setApplySpecialty] = useState<string | null>(null);
  const heroRef = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const sparksOpacity = useTransform(scrollYProgress, [0, 0.3, 0.6], [0, 0, 1]);

  return (
    <>
      {/* Overlay form */}
      <AnimatePresence>
        {applySpecialty !== null && (
          <ApplyForm
            preselect={applySpecialty}
            onClose={() => setApplySpecialty(null)}
          />
        )}
      </AnimatePresence>

      <div className="min-h-screen bg-bg-dark text-white">

        {/* ── Hero ── */}
        <section ref={heroRef} className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 px-6 overflow-hidden">
          {isMobile ? (
            <motion.div
              style={{ opacity: sparksOpacity }}
              className="absolute inset-0 pointer-events-none"
            >
              <WeldingSparks scrollProgress={scrollYProgress} />
            </motion.div>
          ) : (
            <WeldingSparks />
          )}
          <BlueprintBackground />
          {/* Background glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent/[0.06] rounded-full blur-[120px] pointer-events-none" />

          <div className="relative z-10 mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease }}
            >
              <span className="text-accent text-xs font-semibold uppercase tracking-[0.3em] mb-5 block">
                ВЕР СТРОЙ — г. Пермь
              </span>

              <h1 className="font-montserrat text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-6">
                Работа в строительной<br />
                <span className="text-accent">компании</span>
              </h1>

              <p className="text-white/60 text-lg lg:text-xl leading-relaxed max-w-2xl mb-10">
                Ищем опытных специалистов для работы на коммерческих и промышленных объектах
                в Пермском крае. Официальное трудоустройство, стабильная зарплата, вахта.
              </p>

              {/* Stats */}
              <div className="flex flex-wrap gap-8">
                {[
                  { value: "150+", label: "работников в штате" },
                  { value: "22+", label: "завершённых объектов" },
                  { value: "6+", label: "лет на рынке" },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 + i * 0.1, ease }}
                    className="flex flex-col"
                  >
                    <span className="font-montserrat text-3xl font-bold text-accent">{stat.value}</span>
                    <span className="text-sm text-white/40 mt-0.5">{stat.label}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Why us ── */}
        <section className="bg-bg-section px-6 py-16 lg:py-20 border-y border-white/[0.06]">
          <div className="mx-auto max-w-6xl">
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease }}
              className="font-montserrat text-2xl lg:text-3xl font-bold text-white mb-10 text-center"
            >
              Почему работают у нас
            </motion.h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                {
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75" />
                    </svg>
                  ),
                  title: "Зарплата без задержек",
                  text: "Выплаты 2 раза в месяц, на карту. Без серых схем — только официально.",
                },
                {
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                    </svg>
                  ),
                  title: "Официальное оформление",
                  text: "Трудовой договор по ТК РФ с первого рабочего дня. Больничный, отпуск, страховка.",
                },
                {
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819" />
                    </svg>
                  ),
                  title: "Крупные объекты",
                  text: "Работаем с OZON, ЛУКОЙЛ, УКС Пермского края. Репутация в резюме — ваш актив.",
                },
                {
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 0115 0z" />
                    </svg>
                  ),
                  title: "Вахта с обеспечением",
                  text: "Проживание и питание на вахте — бесплатно. Компенсация проезда от Перми.",
                },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease }}
                  className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-6"
                >
                  <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center text-accent mb-4">
                    {item.icon}
                  </div>
                  <h3 className="font-montserrat font-semibold text-white text-base mb-2">
                    {item.title}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed">{item.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Vacancies list ── */}
        <section className="px-6 py-16 lg:py-24">
          <div className="mx-auto max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease }}
              className="mb-10"
            >
              <span className="text-accent text-xs font-semibold uppercase tracking-[0.3em] mb-3 block">
                Открытые позиции
              </span>
              <h2 className="font-montserrat text-3xl lg:text-4xl font-bold text-white">
                Актуальные вакансии
              </h2>
            </motion.div>

            <div className="space-y-3">
              {vacancies.map((vacancy, i) => (
                <VacancyCard
                  key={vacancy.id}
                  vacancy={vacancy}
                  index={i}
                  onApply={(s) => setApplySpecialty(s)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ── Application form (inline) ── */}
        <section id="apply" className="bg-bg-section border-t border-white/[0.06] px-6 py-16 lg:py-24">
          <div className="mx-auto max-w-4xl">
            <div className="grid lg:grid-cols-2 gap-12 items-start">

              {/* Left — info */}
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease }}
              >
                <span className="text-accent text-xs font-semibold uppercase tracking-[0.3em] mb-4 block">
                  Отдел кадров
                </span>
                <h2 className="font-montserrat text-3xl lg:text-4xl font-bold text-white mb-5 leading-tight">
                  Свяжитесь с HR-менеджером
                </h2>
                <p className="text-white/55 text-base leading-relaxed mb-8">
                  Оставьте заявку — мы свяжемся в течение рабочего дня,
                  ответим на вопросы и уточним детали по вашей специальности.
                </p>

                <div className="space-y-5">
                  <a
                    href="tel:+79504511611"
                    className="group flex items-center gap-4 p-4 rounded-xl hover:bg-white/[0.04] transition-colors duration-200 -mx-4"
                  >
                    <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-primary-dark transition-colors duration-300 shrink-0">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-white font-semibold text-lg group-hover:text-accent transition-colors">
                        8 (950) 451-16-11
                      </p>
                      <p className="text-white/40 text-sm">Пн — Пт, 9:00 — 18:00</p>
                    </div>
                  </a>

                  <a
                    href="mailto:ver.stroy.company@mail.ru"
                    className="group flex items-center gap-4 p-4 rounded-xl hover:bg-white/[0.04] transition-colors duration-200 -mx-4"
                  >
                    <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-primary-dark transition-colors duration-300 shrink-0">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-white font-semibold group-hover:text-accent transition-colors break-all sm:break-normal">
                        ver.stroy.company@mail.ru
                      </p>
                      <p className="text-white/40 text-sm">Ответим в течение дня</p>
                    </div>
                  </a>
                </div>
              </motion.div>

              {/* Right — form */}
              <motion.div
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15, ease }}
              >
                <InlineApplyForm />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Back link ── */}
        <div className="px-6 py-8 text-center border-t border-white/[0.05]">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-white/35 hover:text-accent transition-colors duration-300"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            На главную
          </Link>
        </div>

      </div>
    </>
  );
}

// ─── Inline apply form (bottom section) ──────────────────────────────────────

function InlineApplyForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(formatPhone(e.target.value.replace(/\D/g, "")));
    if (status !== "idle" && status !== "loading") setStatus("idle");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const digits = phone.replace(/\D/g, "");
    if (digits.length < 11 || !specialty) { setStatus("error"); return; }
    setStatus("loading");
    try {
      const res = await fetch("/api/vacancy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, specialty }),
      });
      if (res.ok) { setStatus("success"); setName(""); setPhone(""); setSpecialty(""); }
      else { setStatus("error"); }
    } catch { setStatus("error"); }
  };

  return (
    <div className="bg-white/[0.03] border border-white/[0.09] rounded-2xl p-7">
      <h3 className="font-montserrat text-xl font-bold text-white mb-1">Оставьте заявку</h3>
      <p className="text-white/45 text-sm mb-6">Перезвоним и обсудим условия</p>

      {status === "success" ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-4 py-8 text-center"
        >
          <div className="w-14 h-14 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center">
            <svg className="w-7 h-7 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="text-green-400 font-semibold">Заявка отправлена</p>
          <p className="text-white/40 text-sm">HR-менеджер свяжется с вами в ближайшее рабочее время</p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <FloatingInput name="name" label="Ваше имя" required value={name} onChange={(e) => { setName(e.target.value); if (status !== "idle") setStatus("idle"); }} />
          <FloatingInput name="phone" label="Телефон" type="tel" required value={phone} onChange={handlePhoneChange} />

          <div className="relative">
            <select
              name="specialty"
              required
              value={specialty}
              onChange={(e) => { setSpecialty(e.target.value); if (status !== "idle") setStatus("idle"); }}
              className="w-full px-5 py-4 bg-white/5 border border-white/20 rounded-lg text-white focus:border-accent/50 focus:outline-none focus:shadow-[0_0_0_3px_rgba(212,168,67,0.15)] transition-all duration-300 appearance-none text-sm"
            >
              <option value="" disabled className="bg-bg-section text-white/40">Специальность</option>
              {specialtyOptions.map((s) => (
                <option key={s} value={s} className="bg-bg-section">{s}</option>
              ))}
            </select>
            <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          {status === "error" && (
            <p className="text-red-400 text-xs">Проверьте данные или позвоните: 8 (950) 451-16-11</p>
          )}

          <motion.button
            type="submit"
            disabled={status === "loading"}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="w-full py-4 bg-accent text-primary-dark font-semibold uppercase tracking-wider rounded-lg hover:bg-accent-light transition-colors duration-300 disabled:opacity-60 text-sm"
          >
            {status === "loading" ? "Отправка..." : "Отправить"}
          </motion.button>

          <p className="text-white/20 text-[11px] text-center">
            Нажимая кнопку, вы соглашаетесь на{" "}
            <Link href="/privacy" className="underline hover:text-accent transition-colors">
              обработку персональных данных
            </Link>
          </p>
        </form>
      )}
    </div>
  );
}
