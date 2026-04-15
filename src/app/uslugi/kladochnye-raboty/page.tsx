import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Кладочные работы в Перми",
  description:
    "Кладочные работы в Перми и Пермском крае. Кирпич, газоблок, керамические блоки. Несущие стены, перегородки. Любые объёмы.",
  alternates: {
    canonical: "/uslugi/kladochnye-raboty",
  },
  openGraph: {
    title: "Кладочные работы в Перми — ВЕР СТРОЙ",
    description:
      "Кладочные работы в Перми и Пермском крае. Кирпич, газоблок, керамические блоки. Несущие стены, перегородки.",
    url: "/uslugi/kladochnye-raboty",
    type: "website",
  },
};

export default function KladochnyeRabotyPage() {
  return (
    <div className="min-h-screen bg-bg-dark text-white px-6 py-16 lg:py-24">
      <div className="max-w-2xl mx-auto">
        <h1 className="font-montserrat text-3xl lg:text-4xl font-bold mb-8">
          Кладочные работы в&nbsp;Перми и&nbsp;Пермском крае
        </h1>

        <div className="space-y-5 text-white/60 text-base leading-relaxed">
          <p>
            Выполняем кладочные работы из&nbsp;кирпича, газоблока
            и&nbsp;керамических блоков. Возведение несущих стен
            и&nbsp;перегородок с&nbsp;контролем геометрии и&nbsp;качества швов.
          </p>

          <p>
            Работаем на&nbsp;объектах любого масштаба &mdash; от&nbsp;частных
            домов до&nbsp;промышленных зданий. Соблюдаем проектные решения,
            нормативы по&nbsp;толщине швов и&nbsp;перевязке рядов.
          </p>

          <p>
            Собственные бригады каменщиков с&nbsp;опытом работы на&nbsp;крупных
            объектах. Обеспечиваем стабильное качество и&nbsp;соблюдение сроков
            при любых объёмах.
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
