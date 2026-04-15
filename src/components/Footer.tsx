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

      <div className="mx-auto max-w-7xl 2xl:max-w-[1400px] 3xl:max-w-[1600px] px-6 lg:px-16 py-20 lg:py-28">
        {/* Decorative line */}
        <div className="flex items-center gap-4 mb-14 lg:mb-16">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/10" />
          <span className="text-[11px] uppercase tracking-[0.35em] text-white/20 font-montserrat">
            ВЕР СТРОЙ — Пермь
          </span>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/10" />
        </div>

        {/* Main grid — 2 columns on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">

          {/* LEFT — logo + description + contacts */}
          <motion.div
            className="flex flex-col gap-10"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {/* Logo + description */}
            <div className="flex flex-col gap-10">
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
                  width={48}
                  height={48}
                  className="shrink-0"
                  loading="lazy"
                />
                <span className="flex flex-col">
                  <span className="font-montserrat font-semibold uppercase text-xl tracking-[0.3em] leading-none text-white">
                    ВЕР <span className="text-accent">СТРОЙ</span>
                  </span>
                  <span className="mt-2 text-[11px] uppercase tracking-[0.2em] text-white/35">
                    Строительная компания
                  </span>
                </span>
              </a>

              <p className="text-white/50 text-[15px] leading-[1.8]">
                Строим в Пермском крае с 2020 года — от фундамента до сдачи объекта.
                Монолит, фасады, кровля — выполняем своими силами.
              </p>
            </div>

            {/* Contacts — horizontal grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
              <div className="flex flex-col gap-2">
                <span className="text-[11px] uppercase tracking-[0.2em] text-white/25 font-montserrat">
                  Телефон
                </span>
                <a
                  href="tel:+79504511611"
                  className="text-[16px] font-montserrat font-medium text-white hover:text-accent transition-colors whitespace-nowrap"
                >
                  8 (950) 451-16-11
                </a>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-[11px] uppercase tracking-[0.2em] text-white/25 font-montserrat">
                  Email
                </span>
                <a
                  href="mailto:ver.stroy.company@mail.ru"
                  className="text-[15px] text-white/50 hover:text-accent transition-colors sm:break-normal break-all"
                >
                  ver.stroy.company@mail.ru
                </a>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-[11px] uppercase tracking-[0.2em] text-white/25 font-montserrat">
                  Адрес
                </span>
                <a
                  href="https://yandex.ru/maps/-/CHEFj0g"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="not-italic text-[15px] text-white/50 hover:text-accent transition-colors"
                >
                  г. Пермь, ул. Монастырская, д. 12, оф. 407
                </a>
              </div>
            </div>
          </motion.div>

          {/* RIGHT — services */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <h4 className="text-[11px] uppercase tracking-[0.25em] text-white/25 font-montserrat font-semibold mb-8">
              Специализация
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
                  <span className="w-5 h-px bg-accent/40 group-hover:bg-accent group-hover:w-7 transition-all duration-300 shrink-0" />
                  <a href="#services" className="text-[15px] text-white/50 hover:text-white/80 transition-colors">
                    {service}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <motion.div
          className="mx-auto max-w-7xl 2xl:max-w-[1400px] 3xl:max-w-[1600px] px-6 lg:px-16 py-6 flex flex-col sm:flex-row justify-between items-center gap-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-white/20 text-[13px]">
            &copy; {currentYear} ВЕР СТРОЙ. Все права защищены.
          </p>
          <div className="flex items-center gap-6 text-[13px] text-white/20">
            <a href="/privacy" className="hover:text-accent transition-colors">Политика конфиденциальности</a>
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
        </motion.div>
      </div>
    </footer>
  );
}
