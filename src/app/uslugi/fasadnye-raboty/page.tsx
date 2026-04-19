import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = "https://xn--b1agmtjagi.xn--p1ai";
const PAGE_URL = `${SITE_URL}/uslugi/fasadnye-raboty`;

export const metadata: Metadata = {
  title: "Фасадные работы в Перми",
  description:
    "Фасадные работы в Перми и Пермском крае. Вентилируемые фасады, композитные панели, штукатурные системы, утепление. Опыт при -40°C.",
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: "Фасадные работы в Перми — ВЕР СТРОЙ",
    description:
      "Фасадные работы в Перми и Пермском крае. Вентилируемые фасады, композитные панели, штукатурные системы, утепление.",
    url: PAGE_URL,
    type: "website",
  },
};

// Service JSON-LD для карточки услуги в Rich Results
const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Фасадные работы",
  description:
    "Фасадные работы в Пермском крае: навесные вентилируемые фасады (НВФ), композитные панели, штукатурные системы, утепление и облицовка зданий.",
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

export default function FasadnyeRabotyPage() {
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

        <h2 className="font-montserrat text-xl lg:text-2xl font-bold mt-14 mb-6">
          Виды работ
        </h2>

        <ul className="space-y-3 text-white/60 text-base leading-relaxed list-none">
          <li className="flex gap-3">
            <span className="text-accent shrink-0 mt-0.5">—</span>
            <span>
              Навесной вентилируемый фасад (НВФ): монтаж несущей подсистемы,
              утеплителя, облицовки из&nbsp;керамогранита, фиброцемента,
              металлокассет
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-accent shrink-0 mt-0.5">—</span>
            <span>
              Композитный фасад: алюминиевые панели Alucobond, Alpolic,
              российские аналоги; монтаж на&nbsp;алюминиевой и&nbsp;стальной
              подсистеме
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-accent shrink-0 mt-0.5">—</span>
            <span>
              Тонкослойные штукатурные системы СФТК: базовый слой,
              армирование сеткой, декоративная штукатурка
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-accent shrink-0 mt-0.5">—</span>
            <span>
              Утепление фасадов: минеральная вата, пенополистирол,
              пирог для климатического района I&ndash;IV по&nbsp;ГОСТ
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-accent shrink-0 mt-0.5">—</span>
            <span>
              Устройство цокольной части, отливов, парапетных крышек,
              примыканий к&nbsp;проёмам
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-accent shrink-0 mt-0.5">—</span>
            <span>
              Фасадные работы с&nbsp;лесов и&nbsp;люльки: монтаж, демонтаж,
              обеспечение безопасности
            </span>
          </li>
        </ul>

        <h2 className="font-montserrat text-xl lg:text-2xl font-bold mt-14 mb-6">
          Наш опыт
        </h2>

        <div className="space-y-6 text-white/60 text-base leading-relaxed">
          <div>
            <p className="text-white/80 font-semibold mb-1">
              Школа, Верещагино &mdash; вентилируемый фасад
            </p>
            <p>
              Монтаж навесного вентилируемого фасада на&nbsp;здании
              образовательного учреждения. Работы выполнялись в&nbsp;условиях
              действующего учебного процесса с&nbsp;соблюдением требований
              по&nbsp;безопасности. Применена система с&nbsp;алюминиевой
              подсистемой и&nbsp;облицовкой керамогранитом.
            </p>
          </div>
          <div>
            <p className="text-white/80 font-semibold mb-1">
              ЛУКОЙЛ, Усинск и&nbsp;Нижний Одесс &mdash; промышленные объекты
            </p>
            <p>
              Фасадные работы на&nbsp;нескольких объектах нефтяной компании
              в&nbsp;Республике Коми. Температурный диапазон эксплуатации
              от&nbsp;&minus;40 до&nbsp;+35&thinsp;&deg;C. Подбирали
              материалы с&nbsp;расчётными характеристиками для
              I&nbsp;климатического района. Работали вахтовым методом.
            </p>
          </div>
          <div>
            <p className="text-white/80 font-semibold mb-1">
              Коммерческие объекты &mdash; композитный фасад
            </p>
            <p>
              Монтаж фасадов из&nbsp;композитных алюминиевых панелей
              на&nbsp;торговых и&nbsp;офисных зданиях Пермского края.
              Точность стыков и&nbsp;геометрии &mdash; ключевое требование
              для этого типа облицовки. Допуски по&nbsp;плоскостности
              &mdash; не&nbsp;более 2&nbsp;мм на&nbsp;2&nbsp;м рейки.
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
                Обмер фасадов и&nbsp;изучение проекта
              </p>
              <p>
                Выезжаем на&nbsp;объект, производим обмеры, изучаем
                конструктив здания и&nbsp;проектное решение по&nbsp;фасаду.
                Выявляем сложные узлы: проёмы, температурные швы, угловые
                элементы.
              </p>
            </div>
          </li>
          <li className="flex gap-4">
            <span className="font-montserrat font-bold text-accent text-lg shrink-0 w-6">
              2
            </span>
            <div>
              <p className="text-white/80 font-semibold mb-1">
                Подбор системы и&nbsp;смета
              </p>
              <p>
                Рекомендуем фасадную систему под требования заказчика,
                бюджет и&nbsp;климатические условия. Смета составляется
                по&nbsp;реальным обмерам с&nbsp;разбивкой по&nbsp;видам
                работ и&nbsp;материалам.
              </p>
            </div>
          </li>
          <li className="flex gap-4">
            <span className="font-montserrat font-bold text-accent text-lg shrink-0 w-6">
              3
            </span>
            <div>
              <p className="text-white/80 font-semibold mb-1">
                Договор и&nbsp;поставка материалов
              </p>
              <p>
                Оформляем договор, согласовываем спецификацию материалов.
                При необходимости берём на&nbsp;себя закупку и&nbsp;доставку
                на&nbsp;объект.
              </p>
            </div>
          </li>
          <li className="flex gap-4">
            <span className="font-montserrat font-bold text-accent text-lg shrink-0 w-6">
              4
            </span>
            <div>
              <p className="text-white/80 font-semibold mb-1">
                Монтаж и&nbsp;сдача
              </p>
              <p>
                Монтаж ведётся с&nbsp;промежуточными актами скрытых
                работ (крепление подсистемы, укладка утеплителя).
                Передаём исполнительные схемы, паспорта материалов,
                акты КС-2/КС-3.
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
              Какой фасад лучше: вентилируемый или штукатурный?
            </p>
            <p>
              Для Пермского края (климатический район I&thinsp;В) НВФ
              предпочтительнее: вентиляционный зазор выводит влагу из
              утеплителя, система не&nbsp;трескается при циклах заморозки-оттаивания.
              Штукатурный фасад дешевле, но&nbsp;требует точного соблюдения
              технологии и&nbsp;больше подвержен трещинообразованию.
            </p>
          </div>
          <div>
            <p className="text-white/80 font-semibold mb-1">
              Можно ли&nbsp;монтировать фасад зимой?
            </p>
            <p>
              НВФ и&nbsp;композитные системы монтируются при температуре
              до&nbsp;&minus;20&thinsp;&deg;C без ограничений. Штукатурные
              системы &mdash; только при положительных температурах
              или в&nbsp;тепляке. Уточняем условия при составлении
              графика.
            </p>
          </div>
          <div>
            <p className="text-white/80 font-semibold mb-1">
              Какие документы нужны для начала работ?
            </p>
            <p>
              Рабочий проект на&nbsp;фасад или архитектурные решения
              с&nbsp;узлами. Если проекта нет &mdash; поможем подготовить
              техническое задание для проектировщика или разработаем
              рабочую документацию на&nbsp;типовые системы.
            </p>
          </div>
        </div>

        <div className="mt-14 p-6 border border-white/10 rounded-lg bg-white/5">
          <p className="text-white/80 text-base leading-relaxed mb-5">
            Пришлите фотографии объекта и&nbsp;площадь фасадов &mdash;
            подберём систему и&nbsp;дадим предварительную стоимость
            фасадных работ без выезда. Обмер и&nbsp;точная смета &mdash;
            после выезда инженера.
          </p>
          <Link
            href="/#contacts"
            className="inline-block px-8 py-3 bg-accent text-primary-dark font-montserrat font-semibold rounded hover:bg-accent-light transition-colors duration-300"
          >
            Узнать стоимость фасада
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
