"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";

const facts = [
  {
    num: "01",
    title: "Собственная опалубка и оборудование",
    desc: "Не зависим от арендных сроков, контролируем темп работ",
  },
  {
    num: "02",
    title: "Укомплектованные бригады",
    desc: "150+ квалифицированных специалистов, готовых к мобилизации на объект в любом регионе",
  },
  {
    num: "03",
    title: "Опыт Крайнего Севера",
    desc: "Зимнее бетонирование при экстремальных температурах с соблюдением всех технологических регламентов",
  },
  {
    num: "04",
    title: "Член СРО, все допуски",
    desc: "Работаем на объектах I и II уровней ответственности, включая промышленные и социальные",
  },
];


export default function About() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

  return (
    <section id="about" className="relative bg-bg-section overflow-hidden">
      {/* Top decorative line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent z-10" />
      {/* Radial glow */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-primary-light/5 rounded-full blur-[120px] pointer-events-none" />

      <div ref={ref} className="flex flex-col lg:flex-row min-h-[70vh]">
        {/* ── Left column — Photo (38% on desktop) ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, ease }}
          className="relative w-full lg:w-[38%] h-[50vh] lg:h-auto flex-shrink-0"
        >
          <Image
            src="/images/projects/ozon/016.jpg"
            alt="Монолитный каркас здания — объект ВЕР СТРОЙ"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 38vw"
          />
          {/* Gradient fade into content area — desktop */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-bg-section hidden lg:block" />
          {/* Mobile bottom fade */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg-section lg:hidden" />
        </motion.div>

        {/* ── Right column — Content (62% on desktop) ── */}
        <div className="relative w-full lg:w-[62%] px-6 lg:px-16 xl:px-20 py-16 lg:py-24 flex flex-col justify-center">
          <div className="max-w-2xl">
          {/* Label */}
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease }}
            className="text-accent text-sm font-semibold tracking-widest uppercase mb-4 block"
          >
            О компании
          </motion.span>

          {/* Main heading */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            className="font-montserrat font-bold text-white leading-tight"
          >
            <span className="block text-5xl lg:text-6xl xl:text-7xl tracking-tight text-center">
              ВЕР СТРОЙ
            </span>
            <span className="block text-accent font-semibold mt-2 text-lg lg:text-xl tracking-[0.40em] text-center" style={{ paddingLeft: "0.25em" }}>
              НАДЁЖНЫЙ ПОДРЯДЧИК
            </span>
          </motion.h2>

          {/* Gold accent divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease }}
            className="mt-8 h-[2px] w-16 bg-accent origin-left"
          />

          {/* Text blocks */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.35, ease }}
            className="mt-8 space-y-5 text-text-secondary text-lg leading-relaxed text-justify"
          >
            <p>
              Специализируемся на{" "}
              <span className="text-white font-medium">
                монолитном строительстве
              </span>{" "}
              — это наша ключевая экспертиза. Возводим каркасы зданий,
              фундаменты, перекрытия и несущие конструкции для объектов любого
              масштаба: от{" "}
              <span className="text-slate-300">частных домов</span> до{" "}
              <span className="text-slate-300">муниципальных учреждений</span>{" "}
              — больниц, школ, детских садов, ФОКов. Работаем как с{" "}
              <span className="text-slate-300">застройщиками</span>, так и с{" "}
              <span className="text-slate-300">
                генподрядными организациями
              </span>
              . Реализуем и собственные проекты в качестве генподрядчика.
            </p>

            <p>
              География — от{" "}
              <span className="text-white font-medium">
                Перми до Крайнего Севера
              </span>
              . Среди заказчиков —{" "}
              <span className="text-white font-medium">
                OZON, ЛУКОЙЛ, УКС Пермского края
              </span>
              . Строим объекты здравоохранения, спортивной и социальной
              инфраструктуры. Компания состоит в СРО и имеет все допуски для
              работы на объектах повышенной ответственности.
            </p>
          </motion.div>

          {/* ── Facts 2x2 grid ── */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-8">
            {facts.map((fact, i) => (
              <motion.div
                key={fact.num}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.45 + i * 0.1, ease }}
                className="group border-l-2 border-accent/30 hover:border-accent pl-5 transition-all duration-500 cursor-default hover:bg-white/[0.02] hover:pl-6 rounded-r-lg py-2 -my-2"
              >
                <span className="text-accent/40 group-hover:text-accent/80 font-montserrat text-sm font-semibold tracking-wider transition-colors duration-500">
                  {fact.num}
                </span>
                <h3 className="mt-1 text-white group-hover:text-accent font-semibold text-base leading-snug transition-colors duration-300">
                  {fact.title}
                </h3>
                <p className="mt-1.5 text-text-secondary group-hover:text-text-secondary/90 text-sm leading-relaxed transition-colors duration-500">
                  {fact.desc}
                </p>
              </motion.div>
            ))}
          </div>

          </div>
        </div>
      </div>
    </section>
  );
}
