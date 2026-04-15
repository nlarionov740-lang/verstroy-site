import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Монолитные работы в Перми",
  description:
    "Монолитные работы в Перми и Пермском крае. Каркасы зданий, фундаменты, перекрытия, колонны. Собственная опалубка, 6+ лет опыта, 22+ объектов.",
  alternates: {
    canonical: "/uslugi/monolitnye-raboty",
  },
  openGraph: {
    title: "Монолитные работы в Перми — ВЕР СТРОЙ",
    description:
      "Монолитные работы в Перми и Пермском крае. Каркасы зданий, фундаменты, перекрытия, колонны. Собственная опалубка, 6+ лет опыта.",
    url: "/uslugi/monolitnye-raboty",
    type: "website",
  },
};

export default function MonolitnyeRabotyPage() {
  return (
    <div className="min-h-screen bg-bg-dark text-white px-6 py-16 lg:py-24">
      <div className="max-w-2xl mx-auto">
        <h1 className="font-montserrat text-3xl lg:text-4xl font-bold mb-8">
          Монолитные работы в&nbsp;Перми и&nbsp;Пермском крае
        </h1>

        <div className="space-y-5 text-white/60 text-base leading-relaxed">
          <p>
            Специализируемся на&nbsp;монолитном строительстве &mdash; каркасы
            зданий, фундаменты, перекрытия, колонны, стены. В&nbsp;распоряжении
            компании собственный парк опалубки, что позволяет выполнять работы
            любой сложности без привлечения сторонних ресурсов.
          </p>

          <p>
            За&nbsp;6+ лет работы выполнили более 22&nbsp;объектов. Среди наших
            заказчиков &mdash; OZON, ЛУКОЙЛ, УКС Пермского края. Работаем как
            субподрядчик на&nbsp;крупных коммерческих и&nbsp;промышленных
            объектах.
          </p>

          <p>
            Выполняем полный цикл монолитных работ: устройство фундаментов,
            возведение монолитных каркасов, бетонирование перекрытий и&nbsp;стен,
            монтаж и&nbsp;демонтаж опалубки. Контроль качества на&nbsp;каждом
            этапе.
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
