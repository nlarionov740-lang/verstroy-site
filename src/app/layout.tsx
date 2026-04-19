import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import MotionProvider from "@/components/MotionProvider";

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
        "Строительная компания ВЕР СТРОЙ. Монолитные работы, кровля, фасад, кирпичная кладка, общестроительные работы в Перми и Пермском крае. 6+ лет, 22+ объектов.",
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
      priceRange: "₽₽",
      image: `${siteUrl}/og-image.jpg`,
      numberOfEmployees: {
        "@type": "QuantitativeValue",
        value: 150,
      },
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
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      "ВЕР СТРОЙ — строительная компания Пермь | Монолит, кровля",
    template: "%s | ВЕР СТРОЙ",
  },
  description:
    "Строительная компания ВЕР СТРОЙ в Перми. Монолитные работы, кровля, фасад, кладка. 6+ лет, 22+ объектов. Коммерческие и промышленные здания.",
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
      "ВЕР СТРОЙ — строительная компания в Перми",
    description:
      "Строительная компания ВЕР СТРОЙ в Перми. Монолитные работы, кровля, фасад, кладка. 6+ лет, 22+ объектов. Коммерческие и промышленные здания.",
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
      "ВЕР СТРОЙ — строительная компания в Перми",
    description:
      "Строительная компания ВЕР СТРОЙ в Перми. Монолитные работы, кровля, фасад, кладка. 6+ лет, 22+ объектов. Коммерческие и промышленные здания.",
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
      className={`${montserrat.variable} antialiased`}
    >
      <head>
        <link
          rel="preconnect"
          href="https://pub-bb1561168dcd45c991b3b95d38e591d4.r2.dev"
        />
      </head>
      <body className="min-h-screen bg-bg-dark text-text-primary">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
