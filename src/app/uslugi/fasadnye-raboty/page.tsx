import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Фасадные работы в Перми",
  description:
    "Фасадные работы в Перми и Пермском крае. Вентилируемые фасады, композитные панели, штукатурные системы, утепление. Опыт при -40\u00B0C.",
  alternates: {
    canonical: "/uslugi/fasadnye-raboty",
  },
  openGraph: {
    title: "Фасадные работы в Перми — ВЕР СТРОЙ",
    description:
      "Фасадные работы в Перми и Пермском крае. Вентилируемые фасады, композитные панели, штукатурные системы, утепление.",
    url: "/uslugi/fasadnye-raboty",
    type: "website",
  },
};

export default function FasadnyeRabotyPage() {
  return (
    <div className="min-h-screen bg-bg-dark text-white px-6 py-16 lg:py-24">
      <div className="max-w-2xl mx-auto">
        <h1 className="font-montserrat text-3xl lg:text-4xl font-bold mb-8">
          Фасадные работы в&nbsp;Перми и&nbsp;Пермском крае
        </h1>

        <div className="space-y-5 text-white/60 text-base leading-relaxed">
          <p>
            Выполняем монтаж навесных вентилируемых фасадов, композитных
            и&nbsp;штукатурных систем. Полный комплекс работ: утепление,
            облицовка, устройство подсистемы.
          </p>

          <p>
            Работали на&nbsp;объектах ЛУКОЙЛ в&nbsp;условиях Крайнего Севера при
            температурах до&nbsp;&minus;40&thinsp;&deg;C. Знаем, как обеспечить
            надёжность фасада в&nbsp;суровых климатических условиях.
          </p>

          <p>
            Подбираем оптимальные материалы и&nbsp;технологии под конкретный
            объект. Работаем с&nbsp;алюминиевыми и&nbsp;стальными подсистемами,
            керамогранитом, композитом, фиброцементом.
          </p>
        </div>

        <Link
          href="/#contacts"
          className="inline-block mt-10 px-8 py-3 bg-accent text-primary-dark font-montserrat font-semibold rounded hover:bg-accent-light transition-colors duration-300"
        >
          Оставить заявку
        </Link>

        <div className="mt-8">
          <Link
            href="/"
            className="inline-block text-sm text-white/40 hover:text-accent transition-colors duration-300"
          >
            &larr; Назад на главную
          </Link>
        </div>
      </div>
    </div>
  );
}
