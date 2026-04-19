import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = "https://xn--b1agmtjagi.xn--p1ai";
const PAGE_URL = `${SITE_URL}/uslugi/generalniy-podryad`;

export const metadata: Metadata = {
  title: "Генеральный подряд в Перми",
  description:
    "Генеральный подряд в Перми. Полный цикл строительства от проектирования до сдачи. 150+ работников, собственная опалубка и оборудование.",
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: "Генеральный подряд в Перми — ВЕР СТРОЙ",
    description:
      "Генеральный подряд в Перми. Полный цикл строительства от проектирования до сдачи. 150+ работников.",
    url: PAGE_URL,
    type: "website",
  },
};

// Service JSON-LD для карточки услуги в Rich Results
const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Генеральный подряд",
  description:
    "Генеральный подряд на строительство в Пермском крае: полный цикл от проектирования и снабжения до технадзора и сдачи объекта заказчику.",
  provider: {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "ВЕР СТРОЙ",
  },
  areaServed: {
    "@type": "State",
    name: "Пермский край",
  },
  url: PAGE_URL,
};

export default function GeneralniyPodryadPage() {
  return (
    <div className="min-h-screen bg-bg-dark text-white px-6 py-16 lg:py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceJsonLd).replace(/</g, "\\u003c"),
        }}
      />
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
            и&nbsp;строительное оборудование позволяют выполнять ключевые
            этапы работ без привлечения сторонних ресурсов.
          </p>

          <p>
            Обеспечиваем комплексное управление проектом: планирование,
            снабжение, производство работ, технический надзор, сдача объекта
            заказчику. Работаем по&nbsp;договору генерального подряда
            с&nbsp;фиксированной стоимостью и&nbsp;сроками.
          </p>
        </div>

        <h2 className="font-montserrat text-xl lg:text-2xl font-bold mt-14 mb-6">
          Что входит в&nbsp;генеральный подряд
        </h2>

        <ul className="space-y-3 text-white/60 text-base leading-relaxed list-none">
          <li className="flex gap-3">
            <span className="text-accent shrink-0 mt-0.5">—</span>
            <span>
              Управление строительным проектом: сетевой график, контроль
              сроков, координация всех подрядчиков на&nbsp;площадке
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-accent shrink-0 mt-0.5">—</span>
            <span>
              Производство собственными силами: монолитные, кровельные,
              фасадные, кладочные работы &mdash; без субподряда на&nbsp;ключевых
              этапах
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-accent shrink-0 mt-0.5">—</span>
            <span>
              Строительный контроль: технический надзор за&nbsp;работами
              субподрядчиков, входной контроль материалов
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-accent shrink-0 mt-0.5">—</span>
            <span>
              Исполнительная документация: ведение журналов, актов скрытых
              работ, схем, паспортов материалов по&nbsp;ГОСТ
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-accent shrink-0 mt-0.5">—</span>
            <span>
              Снабжение: закупка материалов, логистика, складирование
              на&nbsp;объекте
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-accent shrink-0 mt-0.5">—</span>
            <span>
              Охрана труда и&nbsp;охрана окружающей среды: планы,
              инструктажи, ответственность перед надзорными органами
            </span>
          </li>
        </ul>

        <h2 className="font-montserrat text-xl lg:text-2xl font-bold mt-14 mb-6">
          Наш опыт
        </h2>

        <div className="space-y-6 text-white/60 text-base leading-relaxed">
          <div>
            <p className="text-white/80 font-semibold mb-1">
              ТЦ «Вера», Верещагино &mdash; собственный проект
            </p>
            <p>
              Торговый центр в&nbsp;г.&nbsp;Верещагино строится
              собственными силами компании в&nbsp;качестве застройщика
              и&nbsp;генерального подрядчика. Объект включает монолитный
              каркас, кровлю, фасадные и&nbsp;отделочные работы.
              Полный цикл управления проектом &mdash; от&nbsp;проектирования
              до&nbsp;ввода в&nbsp;эксплуатацию.
            </p>
          </div>
          <div>
            <p className="text-white/80 font-semibold mb-1">
              Промышленные и&nbsp;коммерческие объекты Пермского края
            </p>
            <p>
              Выступаем генеральным подрядчиком на&nbsp;строительстве
              производственных, складских и&nbsp;коммерческих объектов.
              Координируем работу нескольких субподрядных организаций,
              обеспечиваем сдачу в&nbsp;сроки по&nbsp;договору.
            </p>
          </div>
          <div>
            <p className="text-white/80 font-semibold mb-1">
              Объекты государственного заказа
            </p>
            <p>
              Имеем опыт работы с&nbsp;заказчиками государственного
              сектора: ведение исполнительной документации
              в&nbsp;соответствии с&nbsp;требованиями технадзора, работа
              в&nbsp;рамках 44-ФЗ. Знаем специфику приёмки объектов
              госзаказа.
            </p>
          </div>
        </div>

        <h2 className="font-montserrat text-xl lg:text-2xl font-bold mt-14 mb-6">
          Как мы&nbsp;работаем
        </h2>

        <ol className="space-y-5 text-white/60 text-base leading-relaxed list-none">
          <li className="flex gap-4">
            <span className="font-montserrat font-bold text-accent text-lg shrink-0 w-6">
              1
            </span>
            <div>
              <p className="text-white/80 font-semibold mb-1">
                Изучение проекта и&nbsp;технического задания
              </p>
              <p>
                Анализируем проектную документацию, объём работ, сроки,
                требования к&nbsp;объекту. Готовим организационно-технологическую
                схему строительства.
              </p>
            </div>
          </li>
          <li className="flex gap-4">
            <span className="font-montserrat font-bold text-accent text-lg shrink-0 w-6">
              2
            </span>
            <div>
              <p className="text-white/80 font-semibold mb-1">
                Сводная смета и&nbsp;формирование команды
              </p>
              <p>
                Составляем сводный сметный расчёт, определяем состав
                работ собственными силами и&nbsp;субподряд. Подбираем
                субподрядчиков под специализированные виды работ.
              </p>
            </div>
          </li>
          <li className="flex gap-4">
            <span className="font-montserrat font-bold text-accent text-lg shrink-0 w-6">
              3
            </span>
            <div>
              <p className="text-white/80 font-semibold mb-1">
                Договор генерального подряда
              </p>
              <p>
                Оформляем договор с&nbsp;фиксированной ценой, сроками,
                перечнем работ и&nbsp;ответственностью сторон.
                Согласовываем этапы и&nbsp;порядок приёмки.
              </p>
            </div>
          </li>
          <li className="flex gap-4">
            <span className="font-montserrat font-bold text-accent text-lg shrink-0 w-6">
              4
            </span>
            <div>
              <p className="text-white/80 font-semibold mb-1">
                Строительство, надзор и&nbsp;сдача объекта
              </p>
              <p>
                Ведём строительство по&nbsp;графику с&nbsp;еженедельной
                отчётностью заказчику. Сдача &mdash; по&nbsp;актам
                приёмки выполненных работ, полный комплект исполнительной
                документации, участие в&nbsp;комиссии по&nbsp;вводу
                в&nbsp;эксплуатацию.
              </p>
            </div>
          </li>
        </ol>

        <h2 className="font-montserrat text-xl lg:text-2xl font-bold mt-14 mb-6">
          Частые вопросы
        </h2>

        <div className="space-y-6 text-white/60 text-base leading-relaxed">
          <div>
            <p className="text-white/80 font-semibold mb-1">
              С&nbsp;какими объектами вы&nbsp;работаете?
            </p>
            <p>
              Коммерческое, промышленное и&nbsp;гражданское строительство.
              Торговые и&nbsp;бизнес-центры, производственные и&nbsp;складские
              здания, спортивные объекты, медицинские учреждения.
              Площадь от&nbsp;1&nbsp;000&nbsp;м&sup2. Рассматриваем
              каждый запрос индивидуально.
            </p>
          </div>
          <div>
            <p className="text-white/80 font-semibold mb-1">
              Работаете ли&nbsp;вы&nbsp;без проектной документации?
            </p>
            <p>
              Нет. Для получения разрешения на&nbsp;строительство
              необходима проектная документация с&nbsp;государственной
              экспертизой. Можем помочь с&nbsp;подбором проектировщика
              или взять на&nbsp;себя часть функций технического заказчика.
            </p>
          </div>
          <div>
            <p className="text-white/80 font-semibold mb-1">
              Как фиксируется стоимость при генеральном подряде?
            </p>
            <p>
              Работаем по&nbsp;договору с&nbsp;твёрдой ценой или
              открытой книгой затрат &mdash; в&nbsp;зависимости от
              стадии готовности проекта. При полной проектной документации
              фиксируем стоимость на&nbsp;весь объём работ.
            </p>
          </div>
        </div>

        <div className="mt-14 p-6 border border-white/10 rounded-lg bg-white/5">
          <p className="text-white/80 text-base leading-relaxed mb-5">
            Расскажите об&nbsp;объекте: тип здания, площадь, сроки,
            стадия готовности проекта. Встретимся, изучим документацию
            и&nbsp;предложим схему работы в&nbsp;рамках генерального
            подряда.
          </p>
          <Link
            href="/#contacts"
            className="inline-block px-8 py-3 bg-accent text-primary-dark font-montserrat font-semibold rounded hover:bg-accent-light transition-colors duration-300"
          >
            Обсудить проект
          </Link>
        </div>

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
