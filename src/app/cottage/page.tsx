import type { Metadata } from "next";
import Hero from "./components/Hero";
import Comparison from "./components/Comparison";
import InteractiveBlueprint from "./components/InteractiveBlueprint";
import StatsBar from "./components/StatsBar";
import Principles from "./components/Principles";
import ProcessTimeline from "./components/ProcessTimeline";
import PortfolioGrid from "./components/PortfolioGrid";
import Calculator from "./components/Calculator";
import Team from "./components/Team";
import FAQ from "./components/FAQ";
import CtaForm from "./components/CtaForm";
import { FAQ_ITEMS } from "./data/faq";

const SITE_URL = "https://xn--b1agmtjagi.xn--p1ai";

export const metadata: Metadata = {
  title: "Строительство коттеджей под ключ от 200 м² — ВЕР СТРОЙ, Пермь",
  description:
    "Строим премиум-коттеджи с тем же качеством, что и торговые центры. 6+ лет, 15+ объектов, своя опалубка и бригады. Расчёт сметы за 24 часа.",
  alternates: { canonical: `${SITE_URL}/cottage` },
  openGraph: {
    title: "ВЕР СТРОЙ — премиум-коттеджи под ключ",
    description: "Прочность торгового центра. В вашем доме.",
    url: `${SITE_URL}/cottage`,
    type: "website",
    images: [
      {
        url: `${SITE_URL}/cottage/og.jpg`,
        width: 1200,
        height: 630,
        alt: "ВЕР СТРОЙ — премиум-коттеджи",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ВЕР СТРОЙ — премиум-коттеджи под ключ",
    description: "Прочность торгового центра. В вашем доме.",
    images: [`${SITE_URL}/cottage/og.jpg`],
  },
  robots: { index: true, follow: true },
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${SITE_URL}/cottage#service`,
      name: "Строительство премиум-коттеджей под ключ от 200 м²",
      description:
        "Полный цикл от проекта до ключей. Монолит, газобетон, кирпич. 6–9 месяцев. Опыт 15+ коммерческих объектов.",
      provider: { "@id": `${SITE_URL}/#organization` },
      areaServed: [
        { "@type": "City", name: "Пермь" },
        { "@type": "City", name: "Екатеринбург" },
        { "@type": "City", name: "Челябинск" },
        { "@type": "City", name: "Тюмень" },
      ],
      url: `${SITE_URL}/cottage`,
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "RUB",
        lowPrice: 9000000,
        highPrice: 30000000,
        offerCount: 3,
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/cottage#faq`,
      mainEntity: FAQ_ITEMS.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${SITE_URL}/cottage#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Главная", item: SITE_URL },
        {
          "@type": "ListItem",
          position: 2,
          name: "Коттеджи",
          item: `${SITE_URL}/cottage`,
        },
      ],
    },
  ],
};

export default function CottagePage() {
  return (
    <main className="min-h-screen bg-[#fafaf7] text-[#0a0a0a]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />
      <Hero />
      <Comparison />
      <InteractiveBlueprint />
      <StatsBar />
      <Principles />
      <ProcessTimeline />
      <PortfolioGrid />
      <Calculator />
      <Team />
      <FAQ />
      <CtaForm />
    </main>
  );
}
