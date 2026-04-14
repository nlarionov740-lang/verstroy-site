"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const services = [
  "Монолитные работы",
  "Строительство «под ключ»",
  "Генеральный подряд",
  "Промышленные объекты",
  "Коммерческая недвижимость",
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-primary-dark border-t border-white/5">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 lg:px-12 py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 lg:gap-24">

          {/* LEFT — logo + description + contacts */}
          <motion.div
            className="lg:col-span-3 flex flex-col gap-10"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="inline-flex items-center gap-4"
              aria-label="ВЕР СТРОЙ, прокрутить наверх"
            >
              <Image
                src="/images/logo-icon.png"
                alt="ВЕР СТРОЙ"
                width={52}
                height={52}
                className="shrink-0"
                priority
              />
              <span className="flex flex-col">
                <span className="font-montserrat font-semibold uppercase text-2xl tracking-[0.32em] leading-none text-white">
                  ВЕР <span className="text-accent">СТРОЙ</span>
                </span>
                <span className="mt-2 text-[12px] uppercase tracking-[0.28em] text-white/40">
                  Строительная компания
                </span>
              </span>
            </a>

            <p className="text-white/60 text-[16px] leading-[1.85] max-w-[420px]">
              Строим в Пермском крае с 2020 года — от фундамента до сдачи объекта. Каждый проект ведём сами, без субподряда на ключевых этапах.
            </p>

            <div className="flex flex-col sm:flex-row gap-8 sm:gap-12 pt-2">
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] text-white/30 mb-2">Телефон</p>
                <a href="tel:+79504511611" className="text-[18px] font-montserrat font-medium text-white hover:text-accent transition-colors">
                  8 (950) 451-16-11
                </a>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] text-white/30 mb-2">Email</p>
                <a href="mailto:ver.stroy.company@mail.ru" className="text-[15px] text-white/60 hover:text-accent transition-colors break-all">
                  ver.stroy.company@mail.ru
                </a>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] text-white/30 mb-2">Адрес</p>
                <address className="not-italic text-[15px] text-white/60 leading-[1.6]">
                  г. Пермь, ул. Монастырская,<br />д. 12, оф. 407
                </address>
              </div>
            </div>
          </motion.div>

          {/* RIGHT — services */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <h4 className="text-[11px] uppercase tracking-[0.25em] text-white/30 font-montserrat font-semibold mb-8">
              Направления работ
            </h4>
            <ul className="space-y-5">
              {services.map((service, i) => (
                <motion.li
                  key={service}
                  className="group flex items-center gap-4"
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.07 }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-accent/50 group-hover:bg-accent transition-colors shrink-0" />
                  <span className="text-[16px] text-white/60 hover:text-white transition-colors cursor-default leading-snug">
                    {service}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="mx-auto max-w-7xl px-6 lg:px-12 py-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-white/25 text-[13px]">
            &copy; {currentYear} ВЕР СТРОЙ. Все права защищены.
          </p>
          <div className="flex items-center gap-6 text-[13px] text-white/25">
            <span>Строительная компания в Перми</span>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center gap-2 hover:text-accent transition-colors"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M6 10V2M2 6l4-4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Наверх
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
