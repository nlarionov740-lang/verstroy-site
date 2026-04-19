"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import BrandLogo from "@/components/BrandLogo";

const navLinks = [
  { href: "#about", id: "about", label: "О компании" },
  { href: "#services", id: "services", label: "Направления" },
  { href: "#portfolio", id: "portfolio", label: "Портфолио" },
  { href: "#contacts", id: "contacts", label: "Контакты" },
];

const EASE = [0.25, 0.1, 0.25, 1] as const;

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const intersecting = entries.filter((e) => e.isIntersecting);
        if (intersecting.length === 0) return;
        const best = intersecting.reduce((a, b) =>
          a.intersectionRatio > b.intersectionRatio ? a : b
        );
        setActiveSection(best.target.id);
      },
      { threshold: [0.3, 0.5, 0.7], rootMargin: "-60px 0px 0px 0px" }
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (href: string) => {
    const wasOpen = mobileOpen;
    setMobileOpen(false);
    setTimeout(() => {
      const el = document.querySelector(href);
      if (el) {
        const headerHeight = scrolled ? 60 : 80;
        const top = el.getBoundingClientRect().top + window.scrollY - headerHeight;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }, wasOpen ? 350 : 0);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-primary-dark/95 backdrop-blur-md shadow-lg shadow-black/20 border-b border-accent/20"
            : "bg-primary-dark/40 backdrop-blur-sm"
        }`}
      >
        <div className="mx-auto max-w-7xl 2xl:max-w-[1400px] 3xl:max-w-[1600px] px-6 lg:px-8">
          <motion.div
            className="flex items-center justify-between"
            animate={{ height: scrolled ? 60 : 80 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            {/* Logo */}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="group inline-flex items-center"
              aria-label="ВЕР СТРОЙ — на главную"
            >
              <motion.span
                animate={{ scale: scrolled ? 0.85 : 1 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="inline-flex origin-left transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(212,168,67,0.6)]"
              >
                <BrandLogo compact />
              </motion.span>
            </a>

            {/* Desktop nav */}
            <motion.nav
              className="hidden md:flex items-center"
              animate={{ gap: scrolled ? 24 : 32 }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className={`relative text-xs uppercase tracking-[0.15em] font-medium transition-colors duration-300 group ${
                      isActive ? "text-accent" : "text-white/70 hover:text-white"
                    }`}
                  >
                    {link.label}
                    <span
                      className="absolute inset-x-0 -bottom-0.5 h-[1.5px] bg-gradient-to-r from-transparent via-accent to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-[400ms] origin-center"
                    />
                  </a>
                );
              })}

              {/* Vacancies */}
              <Link
                href="/vakansii"
                className="relative text-xs uppercase tracking-[0.15em] font-medium text-white/70 hover:text-white transition-colors duration-300 group"
              >
                Вакансии
                <span className="absolute inset-x-0 -bottom-0.5 h-[1.5px] bg-gradient-to-r from-transparent via-accent to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-[400ms] origin-center" />
              </Link>

              {/* Divider */}
              <div className="w-px h-6 bg-white/10" />

              {/* Phone CTA */}
              <a
                href="tel:+79504511611"
                className="px-4 py-2 text-sm font-semibold text-primary-dark bg-accent hover:bg-accent-light rounded-sm tracking-wide transition-all duration-300 hover:shadow-[0_0_20px_rgba(212,168,67,0.4)] whitespace-nowrap"
              >
                8 (950) 451-16-11
              </a>
            </motion.nav>

            {/* Burger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden relative z-50 w-11 h-11 flex flex-col items-center justify-center gap-1.5"
              aria-label="Меню"
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
            >
              <motion.span
                animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                className={`block w-6 h-0.5 origin-center transition-colors duration-300 ${
                  mobileOpen ? "bg-accent" : "bg-white"
                }`}
              />
              <motion.span
                animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                className={`block w-6 h-0.5 transition-colors duration-300 ${
                  mobileOpen ? "bg-accent" : "bg-white"
                }`}
              />
              <motion.span
                animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                className={`block w-6 h-0.5 origin-center transition-colors duration-300 ${
                  mobileOpen ? "bg-accent" : "bg-white"
                }`}
              />
            </button>
          </motion.div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 z-40 bg-primary-dark/95 backdrop-blur-xl md:hidden overflow-hidden"
          >
            {/* Watermark */}
            <div className="absolute inset-0 flex items-center justify-center text-[20rem] font-black text-white/[0.02] select-none pointer-events-none">
              ВС
            </div>

            <nav
              id="mobile-navigation"
              className="relative flex flex-col h-full px-8 pt-28 pb-10"
            >
              <div className="flex flex-col gap-7">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.1 }}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className="flex items-baseline text-2xl font-montserrat font-semibold text-white hover:text-accent transition-colors"
                  >
                    <span className="text-accent/40 text-xs font-mono mr-4">
                      {String(i + 1).padStart(2, "0")}.
                    </span>
                    {link.label}
                  </motion.a>
                ))}

                {/* Vacancies in mobile menu */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + navLinks.length * 0.1 }}
                  className="flex items-baseline"
                >
                  <span className="text-accent/40 text-xs font-mono mr-4">
                    {String(navLinks.length + 1).padStart(2, "0")}.
                  </span>
                  <Link
                    href="/vakansii"
                    onClick={() => setMobileOpen(false)}
                    className="text-2xl font-montserrat font-semibold text-white hover:text-accent transition-colors"
                  >
                    Вакансии
                  </Link>
                </motion.div>
              </div>

              {/* Phone */}
              <motion.a
                href="tel:+79504511611"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + (navLinks.length + 1) * 0.1 }}
                className="mt-10 self-start px-5 py-3 text-base font-semibold text-primary-dark bg-accent hover:bg-accent-light rounded-sm tracking-wide transition-all duration-300 hover:shadow-[0_0_20px_rgba(212,168,67,0.4)]"
              >
                8 (950) 451-16-11
              </motion.a>

              {/* Address footer */}
              <div className="mt-auto pt-10 flex flex-col gap-3">
                <a
                  href="https://vk.com/verstroy59"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs uppercase tracking-[0.2em] text-white/50 hover:text-accent transition-colors self-start"
                >
                  ВКонтакте →
                </a>
                <div className="text-xs text-white/30">
                  г. Пермь, ул. Монастырская, д. 12
                </div>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
