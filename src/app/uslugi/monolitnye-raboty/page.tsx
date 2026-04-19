import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = "https://xn--b1agmtjagi.xn--p1ai";
const PAGE_URL = `${SITE_URL}/uslugi/monolitnye-raboty`;

export const metadata: Metadata = {
  title: "Монолитные работы в Перми",
  description:
    "Монолитные работы в Перми и Пермском крае. Каркасы зданий, фундаменты, перекрытия, колонны. Собственная опалубка, 6+ лет опыта, 22+ объектов.",
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: "Монолитные работы в Перми — ВЕР СТРОЙ",
    description:
      "Монолитные работы в Перми и Пермском крае. Каркасы зданий, фундаменты, перекрытия, колонны. Собственная опалубка, 6+ лет опыта.",
    url: PAGE_URL,
    type: "website",
  },
};

// Service JSON-LD для карточки услуги в Rich Results
const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Монолитные работы",
  description:
    "Монолитные работы в Пермском крае: монолитный каркас зданий, устройство фундаментов, перекрытий и колонн. Собственная опалубка, 6+ лет опыта.",
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

export default function MonolitnyeRabotyPage() {
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
            возведение монолитных каркасов, бетонирование перекрытий
            и&nbsp;стен, монтаж и&nbsp;демонтаж опалубки. Контроль качества
            на&nbsp;каждом этапе.
          </p>
        </div>

        <h2 className="font-montserrat text-xl lg:text-2xl font-bold mt-14 mb-6">
          Виды работ
        </h2>

        <ul className="space-y-3 text-white/60 text-base leading-relaxed list-none">
          <li className="flex gap-3">
            <span className="text-accent shrink-0 mt-0.5">—</span>
            <span>
              Устройство монолитных фундаментов: плитные, ленточные,
              свайно-ростверковые
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-accent shrink-0 mt-0.5">—</span>
            <span>
              Возведение монолитных каркасов зданий: колонны, ригели, пилоны
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-accent shrink-0 mt-0.5">—</span>
            <span>
              Бетонирование монолитных перекрытий: плоские, ребристые,
              безбалочные
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-accent shrink-0 mt-0.5">—</span>
            <span>
              Монолитные стены и&nbsp;ядра жёсткости, лестничные клетки
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-accent shrink-0 mt-0.5">—</span>
            <span>
              Монтаж и&nbsp;демонтаж рамной и&nbsp;щитовой опалубки
              (собственный парк)
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-accent shrink-0 mt-0.5">—</span>
            <span>
              Армирование конструкций: вязка, сварка, установка закладных
              деталей
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-accent shrink-0 mt-0.5">—</span>
            <span>
              Зимнее бетонирование: прогрев, укрытие, температурный контроль
            </span>
          </li>
        </ul>

        <h2 className="font-montserrat text-xl lg:text-2xl font-bold mt-14 mb-6">
          Наш опыт
        </h2>

        <div className="space-y-6 text-white/60 text-base leading-relaxed">
          <div>
            <p className="text-white/80 font-semibold mb-1">
              РЦ OZON, Пермь — распределительный центр
            </p>
            <p>
              Монолитный каркас крупного логистического объекта. Выполнено
              290&nbsp;фотофиксаций хода работ, что подтверждает полное
              сопровождение каждого этапа. Объём бетона &mdash; тысячи кубометров,
              работы велись в&nbsp;непрерывном режиме с&nbsp;соблюдением
              графика генерального подрядчика.
            </p>
          </div>
          <div>
            <p className="text-white/80 font-semibold mb-1">
              Онкологический центр, Пермь
            </p>
            <p>
              Монолитные конструкции медицинского учреждения повышенной
              ответственности. Особые требования к&nbsp;точности геометрии,
              классу бетона и&nbsp;ведению исполнительной документации.
              Работы выполнены в&nbsp;полном соответствии с&nbsp;проектом
              и&nbsp;требованиями технадзора заказчика.
            </p>
          </div>
          <div>
            <p className="text-white/80 font-semibold mb-1">
              ЖК Good Style, Пермь
            </p>
            <p>
              Монолитный каркас жилого комплекса. Работы выполнялись
              в&nbsp;плотном квартале с&nbsp;ограниченным пятном застройки,
              что потребовало нестандартных решений по&nbsp;организации
              опалубочных работ и&nbsp;логистике материалов.
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
                Выезд на&nbsp;объект и&nbsp;изучение проекта
              </p>
              <p>
                Инженер выезжает на&nbsp;площадку, изучает проектную
                документацию, оценивает условия производства работ. Срок
                &mdash; 1&ndash;2 рабочих дня.
              </p>
            </div>
          </li>
          <li className="flex gap-4">
            <span className="font-montserrat font-bold text-accent text-lg shrink-0 w-6">
              2
            </span>
            <div>
              <p className="text-white/80 font-semibold mb-1">
                Расчёт и&nbsp;согласование сметы
              </p>
              <p>
                Составляем локальную смету по&nbsp;объёмам из&nbsp;проекта,
                согласовываем с&nbsp;заказчиком. Фиксируем стоимость
                материалов и&nbsp;работ.
              </p>
            </div>
          </li>
          <li className="flex gap-4">
            <span className="font-montserrat font-bold text-accent text-lg shrink-0 w-6">
              3
            </span>
            <div>
              <p className="text-white/80 font-semibold mb-1">
                Заключение договора
              </p>
              <p>
                Оформляем договор субподряда с&nbsp;фиксированными сроками,
                ценой и&nbsp;перечнем работ. Приступаем к&nbsp;производству
                по&nbsp;согласованному графику.
              </p>
            </div>
          </li>
          <li className="flex gap-4">
            <span className="font-montserrat font-bold text-accent text-lg shrink-0 w-6">
              4
            </span>
            <div>
              <p className="text-white/80 font-semibold mb-1">
                Сдача работ и&nbsp;исполнительная документация
              </p>
              <p>
                Сдаём выполненные работы по&nbsp;актам КС-2/КС-3. Ведём
                и&nbsp;передаём полный комплект исполнительной документации:
                журналы работ, паспорта материалов, акты скрытых работ.
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
              Работаете ли&nbsp;вы&nbsp;зимой?
            </p>
            <p>
              Да. Выполняем монолитные работы при температурах до&nbsp;&minus;25&thinsp;&deg;C.
              Используем противоморозные добавки в&nbsp;бетон, электропрогрев
              конструкций, термоукрытие. Технология зимнего бетонирования
              соответствует СП&nbsp;70.13330.
            </p>
          </div>
          <div>
            <p className="text-white/80 font-semibold mb-1">
              Предоставляете ли&nbsp;вы&nbsp;собственную опалубку?
            </p>
            <p>
              Да, у&nbsp;компании собственный парк рамной и&nbsp;щитовой
              опалубки. Это исключает зависимость от&nbsp;сторонних поставщиков
              и&nbsp;снижает затраты заказчика.
            </p>
          </div>
          <div>
            <p className="text-white/80 font-semibold mb-1">
              Берётесь ли&nbsp;вы&nbsp;за&nbsp;небольшие объёмы?
            </p>
            <p>
              Работаем с&nbsp;объектами от&nbsp;500&nbsp;м&sup2; перекрытий
              и&nbsp;выше. Для точечных работ (отдельные конструкции, доделки)
              рассматриваем каждый запрос индивидуально.
            </p>
          </div>
        </div>

        <div className="mt-14 p-6 border border-white/10 rounded-lg bg-white/5">
          <p className="text-white/80 text-base leading-relaxed mb-5">
            Пришлите проектную документацию или объём работ &mdash;
            рассчитаем стоимость монолитных работ в&nbsp;течение 1&nbsp;рабочего
            дня. Возможен выезд инженера на&nbsp;объект.
          </p>
          <Link
            href="/#contacts"
            className="inline-block px-8 py-3 bg-accent text-primary-dark font-montserrat font-semibold rounded hover:bg-accent-light transition-colors duration-300"
          >
            Получить расчёт стоимости
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
