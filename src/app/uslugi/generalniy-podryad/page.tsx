import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Генеральный подряд в Перми",
  description:
    "Генеральный подряд в Перми. Полный цикл строительства от проектирования до сдачи. 150+ работников, собственная опалубка и оборудование.",
  alternates: {
    canonical: "/uslugi/generalniy-podryad",
  },
  openGraph: {
    title: "Генеральный подряд в Перми — ВЕР СТРОЙ",
    description:
      "Генеральный подряд в Перми. Полный цикл строительства от проектирования до сдачи. 150+ работников.",
    url: "/uslugi/generalniy-podryad",
    type: "website",
  },
};

export default function GeneralniyPodryadPage() {
  return (
    <div className="min-h-screen bg-bg-dark text-white px-6 py-16 lg:py-24">
      <div className="max-w-2xl mx-auto">
        <h1 className="font-montserrat text-3xl lg:text-4xl font-bold mb-8">
          Генеральный подряд в&nbsp;Перми
        </h1>

        <div className="space-y-5 text-white/60 text-base leading-relaxed">
          <p>
            Берём на&nbsp;себя полный цикл строительства &mdash;
            от&nbsp;проектирования до&nbsp;сдачи объекта. Координация
            субподрядчиков, контроль качества, ведение исполнительной
            документации.
          </p>

          <p>
            В&nbsp;штате компании 150+ работников. Собственная опалубка
            и&nbsp;строительное оборудование позволяют выполнять ключевые этапы
            работ без привлечения сторонних ресурсов.
          </p>

          <p>
            Обеспечиваем комплексное управление проектом: планирование,
            снабжение, производство работ, технический надзор, сдача объекта
            заказчику. Работаем по&nbsp;договору генерального подряда
            с&nbsp;фиксированной стоимостью и&nbsp;сроками.
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
