import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = "https://xn--b1agmtjagi.xn--p1ai";
const PAGE_URL = `${SITE_URL}/uslugi/krovelnye-raboty`;

export const metadata: Metadata = {
  title: "Кровельные работы в Перми",
  description:
    "Кровельные работы в Перми и Пермском крае. Плоские и скатные кровли, мембранные покрытия, утепление, пароизоляция. Опыт на Крайнем Севере.",
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: "Кровельные работы в Перми — ВЕР СТРОЙ",
    description:
      "Кровельные работы в Перми и Пермском крае. Плоские и скатные кровли, мембранные покрытия, утепление, пароизоляция.",
    url: PAGE_URL,
    type: "website",
  },
};

// Service JSON-LD для карточки услуги в Rich Results
const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Кровельные работы",
  description:
    "Кровельные работы в Пермском крае: мембранные, мастичные и рулонные покрытия, утепление, пароизоляция, гидроизоляция плоских и скатных кровель.",
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

export default function KrovelnyeRabotyPage() {
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

        <h2 className="font-montserrat text-xl lg:text-2xl font-bold mt-14 mb-6">
          Виды работ
        </h2>

        <ul className="space-y-3 text-white/60 text-base leading-relaxed list-none">
          <li className="flex gap-3">
            <span className="text-accent shrink-0 mt-0.5">—</span>
            <span>
              Плоские кровли с&nbsp;мембранным покрытием ПВХ и&nbsp;ТПО:
              однослойные и&nbsp;двухслойные системы
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-accent shrink-0 mt-0.5">—</span>
            <span>
              Рулонные кровли из&nbsp;битумно-полимерных материалов:
              наплавляемые покрытия, техноэласт, унифлекс
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-accent shrink-0 mt-0.5">—</span>
            <span>
              Утепление кровли: минеральная вата, PIR-плиты, пенополистирол
              под нагрузку
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-accent shrink-0 mt-0.5">—</span>
            <span>
              Пароизоляция и&nbsp;воздухозащитные плёнки: укладка,
              проклейка стыков, примыкания к&nbsp;конструкциям
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-accent shrink-0 mt-0.5">—</span>
            <span>
              Внутренние и&nbsp;наружные системы водоотведения: воронки,
              парапетные лотки, ливневая канализация
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-accent shrink-0 mt-0.5">—</span>
            <span>
              Устройство примыканий, парапетов, аэраторов, пешеходных зон
              на&nbsp;кровле
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-accent shrink-0 mt-0.5">—</span>
            <span>
              Ремонт и&nbsp;восстановление кровельного ковра: частичный
              и&nbsp;капитальный
            </span>
          </li>
        </ul>

        <h2 className="font-montserrat text-xl lg:text-2xl font-bold mt-14 mb-6">
          Наш опыт
        </h2>

        <div className="space-y-6 text-white/60 text-base leading-relaxed">
          <div>
            <p className="text-white/80 font-semibold mb-1">
              ЛУКОЙЛ, Усинск &mdash; объекты Крайнего Севера
            </p>
            <p>
              Кровельные работы на&nbsp;промышленных объектах нефтяной
              компании при температурах до&nbsp;&minus;40&thinsp;&deg;C.
              Специфика: высокие снеговые нагрузки IV&nbsp;района,
              сезонное промерзание основания, ограниченный строительный
              сезон. Применяли холодостойкие мастики и&nbsp;мембраны,
              рассчитанные на&nbsp;эксплуатацию в&nbsp;арктическом климате.
            </p>
          </div>
          <div>
            <p className="text-white/80 font-semibold mb-1">
              Промышленные и&nbsp;коммерческие объекты Пермского края
            </p>
            <p>
              Регулярно выполняем кровельные работы на&nbsp;объектах
              производственного и&nbsp;складского назначения. Площади
              от&nbsp;1&nbsp;000 до&nbsp;10&nbsp;000&nbsp;м&sup2;.
              Работаем в&nbsp;сжатые сроки с&nbsp;соблюдением требований
              по&nbsp;технадзору и&nbsp;исполнительной документации.
            </p>
          </div>
          <div>
            <p className="text-white/80 font-semibold mb-1">
              Ремонт кровель зданий с&nbsp;действующим производством
            </p>
            <p>
              Опыт производства работ без остановки деятельности
              предприятия. Организуем секционный ремонт с&nbsp;защитой
              проёмов и&nbsp;внутренних помещений от&nbsp;осадков.
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
                Обследование кровли
              </p>
              <p>
                Выезжаем на&nbsp;объект, осматриваем несущие конструкции,
                кровельный пирог, состояние водоотводящих элементов.
                При ремонте определяем объём повреждений.
              </p>
            </div>
          </li>
          <li className="flex gap-4">
            <span className="font-montserrat font-bold text-accent text-lg shrink-0 w-6">
              2
            </span>
            <div>
              <p className="text-white/80 font-semibold mb-1">
                Подбор системы и&nbsp;составление сметы
              </p>
              <p>
                Рекомендуем оптимальный состав кровельного пирога под
                нагрузки и&nbsp;климатические условия объекта. Смета
                &mdash; по&nbsp;реальным объёмам из&nbsp;обмеров.
              </p>
            </div>
          </li>
          <li className="flex gap-4">
            <span className="font-montserrat font-bold text-accent text-lg shrink-0 w-6">
              3
            </span>
            <div>
              <p className="text-white/80 font-semibold mb-1">
                Договор и&nbsp;согласование графика
              </p>
              <p>
                Фиксируем стоимость, сроки, перечень работ и&nbsp;применяемые
                материалы. Согласовываем график с&nbsp;учётом погодных
                ограничений.
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
                Выполняем работы с&nbsp;промежуточными актами скрытых
                работ. Передаём паспорта материалов, гарантийные талоны
                производителей, акты КС-2/КС-3.
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
              В&nbsp;какое время года можно выполнять кровельные работы?
            </p>
            <p>
              Мембранные кровли монтируются при температуре от&nbsp;&minus;15&thinsp;&deg;C,
              наплавляемые &mdash; от&nbsp;0&thinsp;&deg;C. При отрицательных
              температурах возможно устройство с&nbsp;применением тепловых
              пушек и&nbsp;временного укрытия. Оптимальный сезон для
              Перми &mdash; май&ndash;октябрь.
            </p>
          </div>
          <div>
            <p className="text-white/80 font-semibold mb-1">
              Даёте ли&nbsp;гарантию на&nbsp;кровлю?
            </p>
            <p>
              Гарантия на&nbsp;работы &mdash; 2&nbsp;года. Производители
              мембран (Технониколь, Firestone, Sika) дают гарантию
              на&nbsp;материал 10&ndash;15&nbsp;лет при условии правильного
              монтажа. Передаём полный пакет документов для гарантийного
              обслуживания.
            </p>
          </div>
          <div>
            <p className="text-white/80 font-semibold mb-1">
              Возможен ли&nbsp;ремонт без полного демонтажа старой кровли?
            </p>
            <p>
              Зависит от&nbsp;состояния основания и&nbsp;существующего
              кровельного пирога. После обследования даём заключение:
              в&nbsp;ряде случаев новый слой укладывается поверх
              существующего, что сокращает стоимость и&nbsp;сроки на&nbsp;30&ndash;40%.
            </p>
          </div>
        </div>

        <div className="mt-14 p-6 border border-white/10 rounded-lg bg-white/5">
          <p className="text-white/80 text-base leading-relaxed mb-5">
            Нужна оценка состояния кровли или расчёт стоимости монтажа?
            Инженер выезжает на&nbsp;объект в&nbsp;Перми бесплатно.
            Результат &mdash; смета и&nbsp;рекомендации по&nbsp;системе
            в&nbsp;течение 2&nbsp;рабочих дней.
          </p>
          <Link
            href="/#contacts"
            className="inline-block px-8 py-3 bg-accent text-primary-dark font-montserrat font-semibold rounded hover:bg-accent-light transition-colors duration-300"
          >
            Вызвать инженера на&nbsp;объект
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
