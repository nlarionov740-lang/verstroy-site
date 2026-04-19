"use client";

import { useState, useEffect, useRef, useSyncExternalStore } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useMagnetic } from "@/hooks/useMagnetic";
import { useMobileActive } from "@/hooks/useMobileActive";

const HOVER_QUERY = "(hover: hover)";
const subscribeHover = (cb: () => void) => {
  const mq = window.matchMedia(HOVER_QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};
const getHoverSnapshot = () => window.matchMedia(HOVER_QUERY).matches;
const getServerHoverSnapshot = () => false;

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

function useIsOnline() {
  const [online, setOnline] = useState<boolean | null>(null);
  useEffect(() => {
    const check = () => {
      const now = new Date();
      const day = now.getDay(); // 0=Sun
      const h = now.getHours();
      setOnline(day >= 1 && day <= 5 && h >= 9 && h < 18);
    };
    check();
    const id = setInterval(check, 60_000);
    return () => clearInterval(id);
  }, []);
  return online;
}

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
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const [focused, setFocused] = useState(false);
  const hasValue = (value ?? "").length > 0;
  const floated = focused || hasValue;

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

function MagneticWrap({ children }: { children: React.ReactNode }) {
  const { ref, onMouseMove, onMouseLeave, style } = useMagnetic<HTMLDivElement>({ strength: 0.25 });
  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={style}
      className="inline-block w-full"
    >
      {children}
    </div>
  );
}

export default function Contacts() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [showMap, setShowMap] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [phoneMasked, setPhoneMasked] = useState("");
  const [nameValue, setNameValue] = useState("");
  const isOnline = useIsOnline();

  const canHover = useSyncExternalStore(
    subscribeHover,
    getHoverSnapshot,
    getServerHoverSnapshot
  );

  const contactsRef = useRef<HTMLDivElement>(null);
  const contactsActive = useMobileActive(contactsRef, { threshold: 0.4 });

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "");
    setPhoneMasked(formatPhone(raw));
    if (formStatus !== "idle" && formStatus !== "loading") setFormStatus("idle");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const digits = phoneMasked.replace(/\D/g, "");
    if (digits.length < 11) {
      setFormStatus("error");
      return;
    }
    setFormStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: nameValue,
          phone: phoneMasked,
        }),
      });
      if (res.ok) {
        setFormStatus("success");
        setNameValue("");
        setPhoneMasked("");
      } else {
        setFormStatus("error");
      }
    } catch {
      setFormStatus("error");
    }
  };

  return (
    <section id="contacts" className="relative bg-bg-section overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-accent/[0.04] rounded-full blur-[120px]" />
      </div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent z-10" />

      <div ref={ref} className="relative grid lg:grid-cols-2">
        <div className="hidden lg:block absolute left-1/2 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />
        {/* ── Left — Contact Info ── */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease }}
          className="relative py-20 lg:py-28 px-6 lg:px-12 xl:px-16 2xl:px-20 3xl:px-24 flex flex-col justify-center"
        >
          {/* Online indicator — hidden until client hydration */}
          {isOnline !== null && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1, ease }}
            className="flex items-center gap-2.5 mb-6"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span
                className={`absolute inline-flex h-full w-full rounded-full opacity-75 ${
                  isOnline ? "animate-ping bg-green-400" : "bg-white/20"
                }`}
              />
              <span
                className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                  isOnline ? "bg-green-400" : "bg-white/30"
                }`}
              />
            </span>
            <span className={`text-sm font-medium ${isOnline ? "text-green-400" : "text-white/40"}`}>
              {isOnline ? "Сейчас на связи" : "Офлайн — ответим в рабочее время"}
            </span>
          </motion.div>
          )}

          <span className="text-accent text-sm font-semibold tracking-widest uppercase mb-4 block">
            Контакты
          </span>
          <h2 className="font-montserrat text-4xl lg:text-5xl font-bold text-white mb-3 leading-tight">
            Расскажите про{" "}
            <motion.span
              className="text-accent inline-block"
              style={{
                background: "linear-gradient(90deg, #D4A843, #f5d07a, #D4A843)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
              animate={{ backgroundPosition: ["0% center", "200% center"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              объект
            </motion.span>
          </h2>
          <p className="text-text-secondary text-lg mb-12">
            Считаем смету за 1 рабочий день. Выезд на объект бесплатно.
          </p>

          <div className="space-y-2" ref={contactsRef} data-active={contactsActive}>
            {/* Phone */}
            <motion.a
              href="tel:+79504511611"
              initial={{ opacity: 0, x: -40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2, ease }}
              whileHover={canHover ? { scale: 1.02, x: 8 } : undefined}
              whileTap={!canHover ? { scale: 0.98 } : undefined}
              data-active={contactsActive}
              className="group/item flex items-center gap-5 p-5 -ml-4 rounded-xl hover:bg-white/[0.04] data-[active=true]:bg-white/[0.04] transition-all duration-300"
            >
              <div className="relative flex-shrink-0 w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center text-accent group-hover/item:bg-accent group-hover/item:text-primary-dark group-data-[active=true]/item:bg-accent group-data-[active=true]/item:text-primary-dark transition-all duration-300 group-hover/item:shadow-xl group-hover/item:shadow-accent/20 group-data-[active=true]/item:shadow-xl group-data-[active=true]/item:shadow-accent/20">
                <span className="absolute inset-[-4px] rounded-2xl border-2 border-accent opacity-0 group-hover/item:opacity-100 group-data-[active=true]/item:opacity-100 scale-90 group-hover/item:scale-100 group-data-[active=true]/item:scale-100 transition-all duration-300" />
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
              </div>
              <div>
                <span className="text-xl font-semibold text-white group-hover/item:text-accent group-data-[active=true]/item:text-accent transition-colors duration-300">
                  8 (950) 451-16-11
                </span>
                <p className="text-text-muted text-sm mt-0.5">Пн — Пт, 9:00 — 18:00</p>
              </div>
            </motion.a>

            {/* Email */}
            <motion.a
              href="mailto:ver.stroy.company@mail.ru"
              initial={{ opacity: 0, x: -40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3, ease }}
              whileHover={canHover ? { scale: 1.02, x: 8 } : undefined}
              whileTap={!canHover ? { scale: 0.98 } : undefined}
              data-active={contactsActive}
              className="group/item flex items-center gap-5 p-5 -ml-4 rounded-xl hover:bg-white/[0.04] data-[active=true]:bg-white/[0.04] transition-all duration-300"
            >
              <div className="relative flex-shrink-0 w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center text-accent group-hover/item:bg-accent group-hover/item:text-primary-dark group-data-[active=true]/item:bg-accent group-data-[active=true]/item:text-primary-dark transition-all duration-300 group-hover/item:shadow-xl group-hover/item:shadow-accent/20 group-data-[active=true]/item:shadow-xl group-data-[active=true]/item:shadow-accent/20">
                <span className="absolute inset-[-4px] rounded-2xl border-2 border-accent opacity-0 group-hover/item:opacity-100 group-data-[active=true]/item:opacity-100 scale-90 group-hover/item:scale-100 group-data-[active=true]/item:scale-100 transition-all duration-300" />
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </div>
              <div>
                <span className="text-lg sm:text-xl font-semibold text-white group-hover/item:text-accent group-data-[active=true]/item:text-accent transition-colors duration-300 break-all sm:break-normal">
                  ver.stroy.company@mail.ru
                </span>
                <p className="text-text-muted text-sm mt-0.5">Ответим в течение дня</p>
              </div>
            </motion.a>

            {/* Address — click to show/hide map */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4, ease }}
            >
              <motion.button
                type="button"
                onClick={() => setShowMap(!showMap)}
                whileHover={canHover ? { scale: 1.02, x: 8 } : undefined}
                whileTap={!canHover ? { scale: 0.98 } : undefined}
                data-active={contactsActive}
                className="group/item flex items-center gap-5 p-5 -ml-4 rounded-xl hover:bg-white/[0.04] data-[active=true]:bg-white/[0.04] transition-all duration-300 w-full text-left"
              >
                <div className="relative flex-shrink-0 w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center text-accent group-hover/item:bg-accent group-hover/item:text-primary-dark group-data-[active=true]/item:bg-accent group-data-[active=true]/item:text-primary-dark transition-all duration-300 group-hover/item:shadow-xl group-hover/item:shadow-accent/20 group-data-[active=true]/item:shadow-xl group-data-[active=true]/item:shadow-accent/20">
                  <span className="absolute inset-[-4px] rounded-2xl border-2 border-accent opacity-0 group-hover/item:opacity-100 group-data-[active=true]/item:opacity-100 scale-90 group-hover/item:scale-100 group-data-[active=true]/item:scale-100 transition-all duration-300" />
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 0115 0z" />
                  </svg>
                </div>
                <div>
                  <span className="text-xl font-semibold text-white group-hover/item:text-accent group-data-[active=true]/item:text-accent transition-colors duration-300">г. Пермь</span>
                  <p className="text-text-muted text-sm mt-0.5">ул. Монастырская, д. 12, офис 407</p>
                </div>
                <motion.svg
                  animate={{ rotate: showMap ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-5 h-5 text-white/20 group-hover/item:text-accent group-data-[active=true]/item:text-accent ml-auto shrink-0"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </motion.svg>
              </motion.button>

              {/* Map — expands on click */}
              <AnimatePresence>
                {showMap && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease }}
                    className="overflow-hidden ml-0"
                  >
                    <div className="relative rounded-xl overflow-hidden mt-3">
                      <div className="absolute inset-0 rounded-xl p-px bg-gradient-to-br from-accent/30 via-transparent to-accent/10" style={{ zIndex: 1, pointerEvents: "none" }} />
                      <div className="relative bg-primary-dark h-[250px]">
                        <iframe
                          src="https://yandex.ru/map-widget/v1/?ll=56.233252,58.015566&z=17&pt=56.233252,58.015566,pm2rdm&l=map"
                          width="100%"
                          height="100%"
                          loading="lazy"
                          className="border-0"
                          style={{ filter: "invert(0.9) hue-rotate(180deg) brightness(0.8) contrast(1.2)" }}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

          </div>
        </motion.div>

        {/* ── Right — CTA Form ── */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3, ease }}
          className="relative bg-transparent py-20 lg:py-28 px-6 lg:px-12 xl:px-16 2xl:px-20 3xl:px-24 flex items-center justify-center"
        >

          <div className="relative w-full max-w-md 2xl:max-w-lg">
              <div className="relative bg-white/[0.03] backdrop-blur-xl rounded-2xl p-8 lg:p-12 border border-white/[0.10] shadow-[0_0_60px_-20px_rgba(212,168,67,0.12)]">
                <h3 className="font-montserrat text-2xl lg:text-3xl font-bold text-white mb-2">
                  Оставьте заявку
                </h3>
                <p className="text-text-secondary mb-10 leading-relaxed">
                  Укажите номер — перезвоним и обсудим детали
                </p>

                {/* Form */}
                <form className="space-y-5" onSubmit={handleSubmit}>
                  <FloatingInput
                    name="name"
                    label="Ваше имя"
                    required
                    value={nameValue}
                    onChange={(e) => {
                      setNameValue(e.target.value);
                      if (formStatus !== "idle" && formStatus !== "loading") setFormStatus("idle");
                    }}
                  />
                  <FloatingInput
                    name="phone"
                    label="Телефон"
                    type="tel"
                    required
                    value={phoneMasked}
                    onChange={handlePhoneChange}
                  />

                  <MagneticWrap>
                    <motion.button
                      type="submit"
                      disabled={formStatus === "loading"}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="group relative w-full py-4.5 bg-accent text-primary-dark font-semibold uppercase tracking-wider rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-accent/25 disabled:opacity-60"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {formStatus === "loading" ? (
                          <>
                            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Отправка...
                          </>
                        ) : (
                          "Перезвоните мне"
                        )}
                      </span>
                      <div className="absolute inset-0 bg-white/20 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
                    </motion.button>
                  </MagneticWrap>
                </form>

                {/* Trust line */}
                <div className="flex flex-wrap items-center justify-center gap-4 mt-8 text-white/30 text-xs">
                  <span className="flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5 text-accent/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Ответ за 1 час
                  </span>
                  <span className="w-px h-3 bg-white/10" />
                  <span className="flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5 text-accent/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                    </svg>
                    Без обязательств
                  </span>
                </div>

                {/* Status messages */}
                <AnimatePresence mode="wait">
                  {formStatus === "success" && (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center gap-3 bg-green-500/10 border border-green-500/20 rounded-xl p-4 mt-6"
                    >
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                        <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-green-400 text-sm font-medium">Заявка отправлена!</p>
                        <p className="text-green-400/60 text-xs mt-0.5">Перезвоним в течение часа</p>
                      </div>
                    </motion.div>
                  )}
                  {formStatus === "error" && (
                    <motion.div
                      key="error"
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 rounded-xl p-4 mt-6"
                    >
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                        <svg className="w-4 h-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-red-400 text-sm font-medium">Не удалось отправить</p>
                        <p className="text-red-400/60 text-xs mt-0.5">
                          Позвоните: <a href="tel:+79504511611" className="underline">8 (950) 451-16-11</a>
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <p className="text-white/40 text-[11px] mt-6 text-center">
                  Нажимая кнопку, вы соглашаетесь на{" "}
                  <a href="/privacy" className="underline hover:text-accent transition-colors">
                    обработку персональных данных
                  </a>
                </p>
              </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
