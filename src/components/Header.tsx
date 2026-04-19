"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import BrandLogo from "@/components/BrandLogo";

const navLinks = [
  { href: "#about", label: "О компании" },
  { href: "#services", label: "Направления" },
  { href: "#portfolio", label: "Портфолио" },
  { href: "#contacts", label: "Контакты" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

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

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    // Small delay to let mobile menu close before scrolling
    setTimeout(() => {
      const el = document.querySelector(href);
      if (el) {
        const headerHeight = 96;
        const top = el.getBoundingClientRect().top + window.scrollY - headerHeight;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }, mobileOpen ? 350 : 0);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-primary/95 backdrop-blur-md shadow-lg shadow-black/20"
            : "bg-primary-dark/36 backdrop-blur-sm"
        }`}
      >
        <div className="mx-auto max-w-7xl 2xl:max-w-[1400px] 3xl:max-w-[1600px] px-6 lg:px-8">
          <div className="flex h-18 items-center justify-between md:h-20">
            {/* Logo */}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="flex items-center"
              aria-label="ВЕР СТРОЙ — на главную"
            >
              <BrandLogo compact />
            </a>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className="relative text-sm font-medium text-text-secondary hover:text-white transition-colors duration-300 group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
                </a>
              ))}

              {/* Vacancies */}
              <Link
                href="/vakansii"
                className="relative text-sm font-medium text-text-secondary hover:text-white transition-colors duration-300 group"
              >
                Вакансии
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
              </Link>

              {/* Phone */}
              <a
                href="tel:+79504511611"
                className="ml-2 text-sm font-semibold text-accent hover:text-accent-light transition-colors duration-300"
              >
                8 (950) 451-16-11
              </a>
            </nav>

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
                className="block w-6 h-0.5 bg-white origin-center"
              />
              <motion.span
                animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                className="block w-6 h-0.5 bg-white"
              />
              <motion.span
                animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                className="block w-6 h-0.5 bg-white origin-center"
              />
            </button>
          </div>
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
            className="fixed inset-0 z-40 bg-primary-dark/98 backdrop-blur-xl md:hidden"
          >
            <nav id="mobile-navigation" className="flex flex-col items-center justify-center h-full gap-8">
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
                  className="text-2xl font-montserrat font-semibold text-white hover:text-accent transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}

              {/* Vacancies in mobile menu — Next.js Link + закрытие меню по клику */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + navLinks.length * 0.1 }}
              >
                <Link
                  href="/vakansii"
                  onClick={() => setMobileOpen(false)}
                  className="text-2xl font-montserrat font-semibold text-white hover:text-accent transition-colors"
                >
                  Вакансии
                </Link>
              </motion.div>

              {/* Phone in mobile menu */}
              <motion.a
                href="tel:+79504511611"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + navLinks.length * 0.1 }}
                className="mt-4 text-lg font-semibold text-accent hover:text-accent-light transition-colors"
              >
                8 (950) 451-16-11
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
