import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";

const siteUrl = "https://xn--b1agmtjagi.xn--p1ai";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
      "@id": `${siteUrl}/#organization`,
      name: "ВЕР СТРОЙ",
      url: siteUrl,
      logo: `${siteUrl}/icon.svg`,
      email: "ver.stroy.company@mail.ru",
      telephone: "+79504511611",
      foundingDate: "2020",
      address: {
        "@type": "PostalAddress",
        streetAddress: "ул. Монастырская, д. 12, офис 407",
        addressLocality: "Пермь",
        addressRegion: "Пермский край",
        postalCode: "614000",
        addressCountry: "RU",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 58.015566,
        longitude: 56.233252,
      },
      areaServed: {
        "@type": "State",
        name: "Пермский край",
      },
      description:
        "Строительная компания ВЕР СТРОЙ. Монолитные работы, кровля, фасад, кирпичная кладка, общестроительные работы в Перми и Пермском крае. 6+ лет, 15+ объектов.",
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
          ],
          opens: "09:00",
          closes: "18:00",
        },
      ],
      sameAs: ["https://vk.com/ver.stroy"],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Строительные услуги",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Монолитные работы",
              areaServed: "Пермь",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Кровельные работы",
              areaServed: "Пермь",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Фасадные работы",
              areaServed: "Пермь",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Кирпичная кладка",
              areaServed: "Пермь",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Общестроительные работы",
              areaServed: "Пермь",
            },
          },
        ],
      },
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "ВЕР СТРОЙ",
      description:
        "Строительная компания ВЕР СТРОЙ — монолитные работы, фундаменты, кровли, фасады. Субподрядчик и генподрядчик. Пермь, Пермский край, Россия.",
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
    default:
      "ВЕР СТРОЙ — строительная компания в Перми | Монолит, кровля, фасад, кладка",
    template: "%s | ВЕР СТРОЙ",
  },
  description:
    "Строительная компания ВЕР СТРОЙ (г. Пермь). Монолитные работы, кровля, фасад, кладка. 6+ лет, 15+ объектов. Коммерческие и промышленные здания. Звоните: 8 950 451 1611",
  keywords: [
    "строительная компания Пермь",
    "монолитные работы Пермь",
    "кровельные работы Пермь",
    "фасадные работы Пермь",
    "кладка кирпича Пермь",
    "монолитное строительство",
    "строительство Пермь",
    "строительный подрядчик",
    "фундамент",
    "каркас здания",
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
    title:
      "ВЕР СТРОЙ — строительная компания в Перми | Монолит, кровля, фасад, кладка",
    description:
      "Строительная компания ВЕР СТРОЙ (г. Пермь). Монолитные работы, кровля, фасад, кладка. 6+ лет, 15+ объектов. Коммерческие и промышленные здания.",
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
    title:
      "ВЕР СТРОЙ — строительная компания в Перми | Монолит, кровля, фасад, кладка",
    description:
      "Строительная компания ВЕР СТРОЙ (г. Пермь). Монолитные работы, кровля, фасад, кладка. 6+ лет, 15+ объектов. Коммерческие и промышленные здания.",
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
