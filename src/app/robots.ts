import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/",
    },
    sitemap: "https://xn--b1agmtjagi.xn--p1ai/sitemap.xml",
    host: "https://xn--b1agmtjagi.xn--p1ai",
  };
}