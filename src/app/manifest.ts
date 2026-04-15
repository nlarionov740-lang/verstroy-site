import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ВЕР СТРОЙ",
    short_name: "ВЕР СТРОЙ",
    description: "Монолитное строительство в Перми и Пермском крае.",
    start_url: "/",
    display: "standalone",
    background_color: "#0D1117",
    theme_color: "#111D35",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}