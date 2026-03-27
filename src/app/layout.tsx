import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";

const siteUrl = "https://xn--b1agmtjagi.xn--p1ai";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "ВЕР СТРОЙ",
      url: siteUrl,
      logo: `${siteUrl}/icon.svg`,
      email: "ver.stroy.company@mail.ru",
      telephone: "+7 (950) 451-16-11",
      foundingDate: "2020",
      areaServed: ["Пермь", "Пермский край", "Россия"],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Пермь",
        addressRegion: "Пермский край",
        addressCountry: "RU",
      },
      knowsAbout: [
        "монолитные работы",
        "фундаменты",
        "железобетонные каркасы",
        "монолитные перекрытия",
        "кровельные работы",
        "фасадные работы",
        "кладочные работы",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "ВЕР СТРОЙ",
      description: "Строительная компания ВЕР СТРОЙ — монолитные работы, фундаменты, кровли, фасады. Субподрядчик и генподрядчик. Пермь, Пермский край, Россия.",
      publisher: {
        "@id": `${siteUrl}/#organization`,
      },
      inLanguage: "ru-RU",
    },
  ],
};

const montserrat = Montserrat({
  variable: "--font-montserrat-var",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter-var",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "ВЕР СТРОЙ — строительная компания в Перми | Монолитные, кровельные, фасадные работы",
    template: "%s | ВЕР СТРОЙ",
  },
  description:
    "ВЕР СТРОЙ — монолитное строительство в Перми и по всей России: фундаменты, каркасы зданий, перекрытия, кровли, фасады. 22+ реализованных объектов.",
  keywords: [
    "монолитное строительство",
    "строительство Пермь",
    "строительная компания Пермь",
    "строительный подрядчик",
    "фундамент",
    "каркас здания",
    "кровельные работы",
    "фасадные работы",
    "кладочные работы",
    "субподрядчик",
    "ВЕР СТРОЙ",
  ],
  alternates: {
    canonical: "/",
  },
  category: "construction",
  manifest: "/manifest.webmanifest",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "ВЕР СТРОЙ — строительная компания в Перми",
    description:
      "Монолитные работы, фундаменты, кровли, фасады. 22+ объектов. Пермь и вся Россия.",
    url: siteUrl,
    locale: "ru_RU",
    type: "website",
    siteName: "ВЕР СТРОЙ",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ВЕР СТРОЙ — строительная компания в Перми",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ВЕР СТРОЙ — строительная компания в Перми",
    description:
      "Монолитные работы, фундаменты, кровли, фасады. 22+ объектов. Пермь и вся Россия.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${montserrat.variable} ${inter.variable} antialiased`}
    >
      <body className="min-h-screen bg-bg-dark text-text-primary">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
