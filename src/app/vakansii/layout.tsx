import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Вакансии — работа в строительной компании Пермь",
  description:
    "Вакансии ВЕР СТРОЙ в Перми. Бетонщик, арматурщик, каменщик, отделочник, монтажник, сварщик. Официальное трудоустройство, вахта, зарплата от 70 000 руб.",
  keywords: [
    "вакансии строительная компания Пермь",
    "работа бетонщик Пермь",
    "работа каменщик Пермь",
    "работа сварщик Пермь",
    "работа монтажник Пермь",
    "работа отделочник Пермь",
    "вахта строительство Пермь",
    "ВЕР СТРОЙ вакансии",
  ],
  alternates: {
    canonical: "/vakansii",
  },
  openGraph: {
    title: "Вакансии — ВЕР СТРОЙ | Работа в строительстве Пермь",
    description:
      "Открытые вакансии строительной компании ВЕР СТРОЙ. Бетонщики, каменщики, отделочники, монтажники, сварщики. Официально, вахта, от 70 000 руб.",
    url: "/vakansii",
    type: "website",
  },
};

// ─── JSON-LD: JobPosting для каждой вакансии ──────────────────────────────────
// Структурированные данные для Google Jobs / Яндекс.Работа.
// Даты публикации и действительности обновляются каждый месяц в рамках SEO-аудита.

const SITE_URL = "https://xn--b1agmtjagi.xn--p1ai";
const DATE_POSTED = "2026-04-19";
const VALID_THROUGH = "2026-07-19";

// Единая организация-работодатель для всех вакансий
const hiringOrganization = {
  "@type": "Organization",
  name: "ВЕР СТРОЙ",
  sameAs: SITE_URL,
  logo: `${SITE_URL}/icon.svg`,
} as const;

// Единое место работы — Пермский край
const jobLocation = {
  "@type": "Place",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Пермь",
    addressRegion: "Пермский край",
    addressCountry: "RU",
  },
} as const;

// Конструктор MonetaryAmount для зарплаты "от N руб. в месяц"
function salary(minValue: number, maxValue: number) {
  return {
    "@type": "MonetaryAmount",
    currency: "RUB",
    value: {
      "@type": "QuantitativeValue",
      minValue,
      maxValue,
      unitText: "MONTH",
    },
  } as const;
}

// Массив вакансий — данные синхронизированы с page.tsx
const jobPostings = [
  {
    title: "Бетонщик / Арматурщик",
    description:
      "Монолитные работы в Пермском крае. Монтаж и демонтаж опалубки, армирование, укладка и уплотнение бетонных смесей, уход за бетоном. Опыт от 2 лет, умение читать чертежи. Официальное трудоустройство, вахта или 5×2, проживание и питание за счёт компании.",
    baseSalary: salary(80000, 130000),
  },
  {
    title: "Каменщик",
    description:
      "Кирпичная кладка, кладка из газобетона и блоков на объектах ВЕР СТРОЙ в Пермском крае. Наружные и внутренние стены, армированная кладка, перемычки, облицовка. Опыт от 3 лет. Официально по ТК РФ, вахта или 5×2, стабильная зарплата без задержек.",
    baseSalary: salary(75000, 120000),
  },
  {
    title: "Отделочник",
    description:
      "Внутренняя и внешняя отделка: штукатурка (машинная и ручная), стяжки, плитка, шпаклёвка, покраска, монтаж ГКЛ. Опыт от 2 лет. Официальное оформление с первого дня, постоянная занятость на нескольких объектах, выплаты 2 раза в месяц.",
    baseSalary: salary(70000, 110000),
  },
  {
    title: "Монтажник",
    description:
      "Общестроительные и монтажные работы: монтаж металлоконструкций, лестниц, ограждений, технологических площадок, такелажные работы. Опыт от 2 лет, допуск на высоту. Вахта с компенсацией проезда, проживание и питание за счёт компании, полный комплект СИЗ.",
    baseSalary: salary(75000, 120000),
  },
  {
    title: "Сварщик",
    description:
      "Ручная дуговая сварка (РДС) и полуавтомат (MIG/MAG): металлоконструкции, арматурные каркасы, закладные детали, подварка швов. Опыт от 3 лет, квалификационное удостоверение. Современное сварочное оборудование, вахта или 5×2, зарплата одна из лучших в отрасли.",
    baseSalary: salary(85000, 140000),
  },
];

// Собираем один граф со всеми JobPosting — валидно для schema.org и рендерится в Rich Results
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": jobPostings.map((job) => ({
    "@type": "JobPosting",
    title: job.title,
    description: job.description,
    datePosted: DATE_POSTED,
    validThrough: VALID_THROUGH,
    employmentType: "FULL_TIME",
    industry: "Construction",
    hiringOrganization,
    jobLocation,
    baseSalary: job.baseSalary,
  })),
};

export default function VakansiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      {/* Структурированные данные JobPosting для поисковых систем */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
