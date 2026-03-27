"use client";

import { motion } from "framer-motion";
import BrandLogo from "@/components/BrandLogo";

const stats = [
  { value: "6+", label: "лет на рынке" },
  { value: "150+", label: "специалистов в штате" },
  { value: "22+", label: "реализованных объектов" },
  { value: "25 000", label: "м³ бетона освоено" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-primary-dark border-t border-white/5">
      {/* Accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
      {/* Subtle noise */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20 lg:py-24">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Logo & description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="mb-4 inline-flex items-center"
              aria-label="ВЕР СТРОЙ — наверх"
            >
              <BrandLogo />
            </a>
            <p className="text-text-secondary text-base leading-relaxed max-w-xs mt-6">
              Монолитное строительство в Перми и по всей России.
              Надёжность. Качество. Сроки.
            </p>
          </motion.div>

          {/* Company stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-white font-montserrat font-semibold text-sm uppercase tracking-wider mb-6">
              Компания в цифрах
            </h4>
            <ul className="space-y-4">
              {stats.map((stat) => (
                <li key={stat.label} className="flex items-baseline gap-3">
                  <span className="font-montserrat text-xl font-semibold text-accent">
                    {stat.value}
                  </span>
                  <span className="text-text-secondary text-sm">
                    {stat.label}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contacts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-white font-montserrat font-semibold text-sm uppercase tracking-wider mb-6">
              Контакты
            </h4>
            <ul className="space-y-3 text-text-secondary text-sm">
              <li>
                <a href="tel:+79504511611" className="hover:text-accent transition-colors">
                  8 (950) 451-16-11
                </a>
              </li>
              <li>
                <a href="mailto:ver.stroy.company@mail.ru" className="hover:text-accent transition-colors">
                  ver.stroy.company@mail.ru
                </a>
              </li>
              <li>г. Пермь, ул. Монастырская, д. 12, оф. 407</li>
            </ul>
          </motion.div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-text-muted text-sm">
            &copy; {currentYear} ВЕР СТРОЙ. Все права защищены.
          </p>
          <div className="flex items-center gap-6">
            <p className="text-text-muted text-sm">
              Монолитное строительство в Перми
            </p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-text-muted text-sm hover:text-accent transition-colors"
            >
              ↑ Наверх
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
