import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = "https://xn--b1agmtjagi.xn--p1ai";
const PAGE_URL = `${SITE_URL}/uslugi/kladochnye-raboty`;

export const metadata: Metadata = {
  title: "Кладочные работы в Перми",
  description:
    "Кладочные работы в Перми и Пермском крае. Кирпич, газоблок, керамические блоки. Несущие стены, перегородки. Любые объёмы.",
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: "Кладочные работы в Перми — ВЕР СТРОЙ",
    description:
      "Кладочные работы в Перми и Пермском крае. Кирпич, газоблок, керамические блоки. Несущие стены, перегородки.",
    url: PAGE_URL,
    type: "website",
  },
};

// Service JSON-LD для карточки услуги в Rich Results
const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Кладочные работы",
  description:
    "Кладочные работы в Пермском крае: кирпичная кладка, кладка из газоблока и керамических блоков. Несущие стены, перегородки, облицовка.",
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

export default function KladochnyeRabotyPage() {
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

        <h2 className="font-montserrat text-xl lg:text-2xl font-bold mt-14 mb-6">
          Виды работ
        </h2>

        <ul className="space-y-3 text-white/60 text-base leading-relaxed list-none">
          <li className="flex gap-3">
            <span className="text-accent shrink-0 mt-0.5">—</span>
            <span>
              Кладка несущих стен из&nbsp;полнотелого и&nbsp;пустотелого
              кирпича: рядовая, декоративная, в&nbsp;два&nbsp;кирпича
              и&nbsp;более
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-accent shrink-0 mt-0.5">—</span>
            <span>
              Кладка из&nbsp;газобетонных блоков: Ytong, Bonolit,
              Hebel; клеевой и&nbsp;цементный растворы
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-accent shrink-0 mt-0.5">—</span>
            <span>
              Кладка из&nbsp;керамических поризованных блоков (тёплая
              керамика): теплоэффективные стены без дополнительного
              утепления
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-accent shrink-0 mt-0.5">—</span>
            <span>
              Межквартирные и&nbsp;межкомнатные перегородки: кирпич
              120&nbsp;мм, газоблок 100&ndash;200&nbsp;мм
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-accent shrink-0 mt-0.5">—</span>
            <span>
              Армирование кладки: кладочные сетки, арматурные стержни
              в&nbsp;швах, анкерные связи с&nbsp;монолитным каркасом
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-accent shrink-0 mt-0.5">—</span>
            <span>
              Перемычки над проёмами: сборные железобетонные, монолитные
              по&nbsp;опалубке, кирпичные рядовые и&nbsp;клинчатые
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-accent shrink-0 mt-0.5">—</span>
            <span>
              Расшивка и&nbsp;расстановка швов декоративной кладки,
              облицовочный кирпич
            </span>
          </li>
        </ul>

        <h2 className="font-montserrat text-xl lg:text-2xl font-bold mt-14 mb-6">
          Наш опыт
        </h2>

        <div className="space-y-6 text-white/60 text-base leading-relaxed">
          <div>
            <p className="text-white/80 font-semibold mb-1">
              ФОК (физкультурно-оздоровительный комплекс), Пермь
            </p>
            <p>
              Кладочные работы на&nbsp;крупном спортивном объекте:
              несущие стены, внутренние перегородки, кладка технических
              помещений. Повышенные требования к&nbsp;геометрии при
              больших пролётах здания. Объём &mdash; несколько тысяч
              кубометров кладки. Работы выполнены в&nbsp;нормативные
              сроки бригадами из&nbsp;собственного штата.
            </p>
          </div>
          <div>
            <p className="text-white/80 font-semibold mb-1">
              Жилые комплексы Пермского края
            </p>
            <p>
              Выполняем кладку межквартирных перегородок и&nbsp;заполнение
              проёмов в&nbsp;монолитном каркасе жилых домов. Скорость
              и&nbsp;ритмичность работ &mdash; ключевые требования
              генерального подрядчика при строительстве многоэтажных
              жилых объектов. Работали параллельно на&nbsp;нескольких
              секциях.
            </p>
          </div>
          <div>
            <p className="text-white/80 font-semibold mb-1">
              Производственные и&nbsp;складские здания
            </p>
            <p>
              Кладка стен промышленных зданий из&nbsp;кирпича
              и&nbsp;газоблока. Специфика &mdash; большие площади,
              простые решения, высокий темп выработки. Соблюдаем
              требования по&nbsp;отклонению вертикали &mdash; не&nbsp;более
              10&nbsp;мм на&nbsp;этаж.
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
                Выезд и&nbsp;изучение проекта
              </p>
              <p>
                Смотрим планы, разрезы, спецификацию материалов.
                Уточняем требования к&nbsp;материалу кладки, классу
                раствора, армированию. Оцениваем объём работ.
              </p>
            </div>
          </li>
          <li className="flex gap-4">
            <span className="font-montserrat font-bold text-accent text-lg shrink-0 w-6">
              2
            </span>
            <div>
              <p className="text-white/80 font-semibold mb-1">
                Расчёт и&nbsp;смета
              </p>
              <p>
                Считаем объём кладки по&nbsp;проекту, стоимость
                материалов и&nbsp;работ. При необходимости предлагаем
                альтернативные материалы с&nbsp;сохранением технических
                характеристик.
              </p>
            </div>
          </li>
          <li className="flex gap-4">
            <span className="font-montserrat font-bold text-accent text-lg shrink-0 w-6">
              3
            </span>
            <div>
              <p className="text-white/80 font-semibold mb-1">
                Договор и&nbsp;организация поставки
              </p>
              <p>
                Фиксируем цену, сроки, марку материала. По&nbsp;запросу
                берём на&nbsp;себя закупку и&nbsp;доставку блоков
                и&nbsp;кирпича на&nbsp;объект.
              </p>
            </div>
          </li>
          <li className="flex gap-4">
            <span className="font-montserrat font-bold text-accent text-lg shrink-0 w-6">
              4
            </span>
            <div>
              <p className="text-white/80 font-semibold mb-1">
                Производство работ и&nbsp;сдача
              </p>
              <p>
                Ведём журнал производства работ, сдаём выполненные
                объёмы по&nbsp;актам. Передаём паспорта материалов,
                результаты входного контроля, акты КС-2/КС-3.
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
              Что выбрать: газоблок или кирпич?
            </p>
            <p>
              Газоблок быстрее в&nbsp;монтаже, дешевле по&nbsp;стоимости
              работ и&nbsp;лучше держит тепло при одинаковой толщине стены.
              Кирпич прочнее на&nbsp;сжатие, долговечнее и&nbsp;подходит
              для лицевой кладки. Выбор зависит от&nbsp;конструктивного
              решения и&nbsp;требований проекта.
            </p>
          </div>
          <div>
            <p className="text-white/80 font-semibold mb-1">
              Выполняете ли&nbsp;вы&nbsp;зимнюю кладку?
            </p>
            <p>
              Да. Используем противоморозные добавки в&nbsp;раствор
              при температурах до&nbsp;&minus;15&thinsp;&deg;C.
              При&nbsp;более низких температурах устраиваем тепляк.
              Зимняя кладка требует особого контроля прочности раствора
              на&nbsp;начальном этапе твердения.
            </p>
          </div>
          <div>
            <p className="text-white/80 font-semibold mb-1">
              Берётесь ли&nbsp;за&nbsp;небольшие объёмы?
            </p>
            <p>
              Работаем с&nbsp;заказами от&nbsp;100&nbsp;м&sup2; кладки.
              При комплексном субподряде &mdash; без ограничений
              по&nbsp;минимальному объёму. Свяжитесь с&nbsp;нами
              &mdash; обсудим.
            </p>
          </div>
        </div>

        <div className="mt-14 p-6 border border-white/10 rounded-lg bg-white/5">
          <p className="text-white/80 text-base leading-relaxed mb-5">
            Пришлите поэтажный план или проект &mdash; посчитаем
            объём кладки и&nbsp;стоимость работ. Если проекта нет,
            выедем на&nbsp;объект и&nbsp;сделаем обмер.
          </p>
          <Link
            href="/#contacts"
            className="inline-block px-8 py-3 bg-accent text-primary-dark font-montserrat font-semibold rounded hover:bg-accent-light transition-colors duration-300"
          >
            Рассчитать стоимость кладки
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
