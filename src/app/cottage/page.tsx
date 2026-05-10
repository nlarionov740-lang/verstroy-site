import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Строительство коттеджей под ключ от 200 м² — ВЕР СТРОЙ, Пермь",
  description:
    "Строим премиум-коттеджи с тем же качеством, что и торговые центры. 6+ лет, 15+ объектов, своя опалубка и бригады. Расчёт сметы за 24 часа.",
  alternates: { canonical: "https://xn--b1agmtjagi.xn--p1ai/cottage" },
  openGraph: {
    title: "ВЕР СТРОЙ — премиум-коттеджи под ключ",
    description: "Прочность торгового центра. В вашем доме.",
    url: "https://xn--b1agmtjagi.xn--p1ai/cottage",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function CottagePage() {
  return (
    <main className="min-h-screen bg-[#fafaf7] text-[#0a0a0a]">
      <section className="container mx-auto px-5 py-20">
        <h1 className="text-4xl font-bold">Cottage landing — placeholder</h1>
      </section>
    </main>
  );
}
