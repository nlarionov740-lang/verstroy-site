"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

export default function Contacts() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [showMap, setShowMap] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  return (
    <section id="contacts" className="relative bg-bg-section overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent z-10" />

      <div ref={ref} className="grid lg:grid-cols-2">
        {/* ── Left — Contact Info ── */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease }}
          className="relative py-20 lg:py-28 px-6 lg:px-16 xl:px-24 flex flex-col justify-center"
        >
          <span className="text-accent text-sm font-semibold tracking-widest uppercase mb-4 block">
            Контакты
          </span>
          <h2 className="font-montserrat text-4xl lg:text-5xl font-bold text-white mb-3 leading-tight">
            Начнём{" "}
            <span className="text-accent">строить</span>{" "}
            вместе
          </h2>
          <p className="text-text-secondary text-lg mb-12">
            Рассчитаем стоимость за 1 рабочий день
          </p>

          <div className="space-y-6">
            {/* Phone */}
            <motion.a
              href="tel:+79504511611"
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2, ease }}
              whileHover={{ x: 4 }}
              className="group flex items-center gap-5 p-4 -ml-4 rounded-lg hover:bg-white/[0.03] transition-all duration-300"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-primary-dark transition-all duration-300">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
              </div>
              <div>
                <span className="text-xl font-semibold text-white group-hover:text-accent transition-colors duration-300">
                  8 (950) 451-16-11
                </span>
                <p className="text-text-muted text-sm mt-0.5">Пн — Пт, 9:00 — 18:00</p>
              </div>
            </motion.a>

            {/* Email */}
            <motion.a
              href="mailto:ver.stroy.company@mail.ru"
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3, ease }}
              whileHover={{ x: 4 }}
              className="group flex items-center gap-5 p-4 -ml-4 rounded-lg hover:bg-white/[0.03] transition-all duration-300"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-primary-dark transition-all duration-300">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </div>
              <div>
                <span className="text-lg sm:text-xl font-semibold text-white group-hover:text-accent transition-colors duration-300 break-all sm:break-normal">
                  ver.stroy.company@mail.ru
                </span>
                <p className="text-text-muted text-sm mt-0.5">Ответим в течение дня</p>
              </div>
            </motion.a>

            {/* Address — click to show/hide map */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4, ease }}
            >
              <motion.button
                type="button"
                onClick={() => setShowMap(!showMap)}
                whileHover={{ x: 4 }}
                className="group flex items-center gap-5 p-4 -ml-4 rounded-lg hover:bg-white/[0.03] transition-all duration-300 w-full text-left"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-primary-dark transition-all duration-300">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 0115 0z" />
                  </svg>
                </div>
                <div>
                  <span className="text-xl font-semibold text-white group-hover:text-accent transition-colors duration-300">г. Пермь</span>
                  <p className="text-text-muted text-sm mt-0.5">ул. Монастырская, д. 12, офис 407</p>
                </div>
                <motion.svg
                  animate={{ rotate: showMap ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-5 h-5 text-white/20 group-hover:text-accent ml-auto shrink-0"
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
                    <div className="rounded-lg overflow-hidden border border-white/10 h-[250px] mt-3">
                      <iframe
                        src="https://yandex.ru/map-widget/v1/?ll=56.233252,58.015566&z=17&pt=56.233252,58.015566,pm2rdm&l=map"
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        allowFullScreen
                        style={{ filter: "invert(0.9) hue-rotate(180deg) brightness(0.8) contrast(1.2)" }}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Social */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5, ease }}
              className="flex gap-3 pt-4 ml-0"
            >
              <a
                href="https://vk.com/ver.stroy"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-text-secondary hover:bg-accent hover:text-primary-dark hover:border-accent hover:scale-110 transition-all duration-300"
                aria-label="ВКонтакте"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.785 16.241s.288-.032.436-.194c.136-.148.132-.427.132-.427s-.02-1.304.587-1.496c.598-.189 1.366 1.26 2.18 1.817.616.422 1.084.33 1.084.33l2.178-.03s1.14-.07.599-.964c-.044-.073-.314-.661-1.618-1.869-1.366-1.265-1.183-1.06.462-3.246.998-1.328 1.398-2.14 1.273-2.487-.12-.331-.853-.244-.853-.244l-2.454.015s-.182-.025-.317.056c-.131.079-.216.263-.216.263s-.387 1.03-.904 1.906c-1.09 1.848-1.526 1.945-1.704 1.83-.414-.267-.31-1.075-.31-1.649 0-1.793.271-2.54-.53-2.733-.266-.064-.462-.106-1.143-.113-.874-.009-1.614.003-2.033.208-.279.136-.494.44-.363.457.162.022.529.099.723.363.25.341.242 1.11.242 1.11s.143 2.11-.335 2.372c-.329.18-.78-.187-1.748-1.865-.495-.859-.87-1.81-.87-1.81s-.072-.177-.2-.272c-.155-.115-.372-.152-.372-.152l-2.335.015s-.35.01-.479.163c-.114.135-.009.416-.009.416s1.82 4.258 3.877 6.403c1.886 1.967 4.028 1.838 4.028 1.838h.97z" />
                </svg>
              </a>
            </motion.div>
          </div>
        </motion.div>

        {/* ── Right — CTA Form ── */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3, ease }}
          className="relative bg-primary-dark py-20 lg:py-28 px-6 lg:px-16 xl:px-24 flex items-center justify-center"
        >
          {/* Subtle pattern */}
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          <div className="relative w-full max-w-md">
            <div className="bg-bg-section/60 backdrop-blur-md border border-white/10 rounded-lg p-8 lg:p-12">
              <h3 className="font-montserrat text-2xl lg:text-3xl font-bold text-white mb-3">
                Обсудим ваш проект
              </h3>
              <p className="text-text-secondary mb-8 leading-relaxed">
                Оставьте номер — перезвоним в течение часа в рабочее время.
              </p>

              {/* Form */}
              <form
                className="space-y-4"
                onSubmit={async (e) => {
                  e.preventDefault();
                  setFormStatus("loading");
                  const form = e.target as HTMLFormElement;
                  const formData = new FormData(form);
                  try {
                    const res = await fetch("/api/contact", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        name: formData.get("name"),
                        phone: formData.get("phone"),
                      }),
                    });
                    if (res.ok) {
                      setFormStatus("success");
                      form.reset();
                    } else {
                      setFormStatus("error");
                    }
                  } catch {
                    setFormStatus("error");
                  }
                }}
              >
                <input
                  name="name"
                  type="text"
                  placeholder="Ваше имя"
                  required
                  className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-sm text-white placeholder-white/30 focus:border-accent/50 focus:bg-white/[0.07] focus:outline-none focus:ring-1 focus:ring-accent/30 transition-all duration-300"
                />
                <input
                  name="phone"
                  type="tel"
                  placeholder="Телефон"
                  required
                  className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-sm text-white placeholder-white/30 focus:border-accent/50 focus:bg-white/[0.07] focus:outline-none focus:ring-1 focus:ring-accent/30 transition-all duration-300"
                />
                <motion.button
                  type="submit"
                  disabled={formStatus === "loading"}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative w-full py-4 bg-accent text-primary-dark font-semibold uppercase tracking-wider rounded-sm overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-accent/25 disabled:opacity-60"
                >
                  <span className="relative z-10">
                    {formStatus === "loading" ? "Отправка..." : "Перезвоните мне"}
                  </span>
                  <div className="absolute inset-0 bg-accent-light transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
                </motion.button>
              </form>

              {/* Status messages */}
              {formStatus === "success" && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-green-400 text-sm mt-4 text-center font-medium"
                >
                  Заявка отправлена! Перезвоним в течение часа.
                </motion.p>
              )}
              {formStatus === "error" && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-sm mt-4 text-center font-medium"
                >
                  Ошибка отправки. Позвоните нам: 8 (950) 451-16-11
                </motion.p>
              )}

              <p className="text-white/20 text-xs mt-4 text-center">
                Нажимая кнопку, вы соглашаетесь на обработку персональных данных
              </p>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
