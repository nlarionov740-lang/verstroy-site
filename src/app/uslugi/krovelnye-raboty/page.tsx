import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Кровельные работы в Перми",
  description:
    "Кровельные работы в Перми и Пермском крае. Плоские и скатные кровли, мембранные покрытия, утепление, пароизоляция. Опыт на Крайнем Севере.",
  alternates: {
    canonical: "/uslugi/krovelnye-raboty",
  },
  openGraph: {
    title: "Кровельные работы в Перми — ВЕР СТРОЙ",
    description:
      "Кровельные работы в Перми и Пермском крае. Плоские и скатные кровли, мембранные покрытия, утепление, пароизоляция.",
    url: "/uslugi/krovelnye-raboty",
    type: "website",
  },
};

export default function KrovelnyeRabotyPage() {
  return (
    <div className="min-h-screen bg-bg-dark text-white px-6 py-16 lg:py-24">
      <div className="max-w-2xl mx-auto">
        <h1 className="font-montserrat text-3xl lg:text-4xl font-bold mb-8">
          Кровельные работы в&nbsp;Перми и&nbsp;Пермском крае
        </h1>

        <div className="space-y-5 text-white/60 text-base leading-relaxed">
          <p>
            Выполняем устройство плоских и&nbsp;скатных кровель любой сложности.
            Работаем с&nbsp;мембранными, мастичными и&nbsp;рулонными покрытиями.
            Полный комплекс: утепление, пароизоляция, гидроизоляция,
            водоотведение.
          </p>

          <p>
            Имеем опыт работы на&nbsp;Крайнем Севере &mdash; объекты
            в&nbsp;Усинске и&nbsp;Инте (Республика Коми). Знаем специфику
            устройства кровель в&nbsp;условиях экстремально низких температур
            и&nbsp;повышенных снеговых нагрузок.
          </p>

          <p>
            Гарантируем качество выполненных работ, соблюдение технологии
            и&nbsp;сроков. Работаем на&nbsp;коммерческих, промышленных
            и&nbsp;жилых объектах.
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
