// src/app/cottage/data/portfolio.ts
//
// Данные портфолио для коттеджного лендинга.
// Переиспользуем существующий список объектов из src/data/projects.ts
// и маппим его в форму, нужную секции 07 (категории + год + площадь).

import { projects, getCoverUrl, type Project } from "@/data/projects";

export type PortfolioCategory =
  | "Все"
  | "Торговые центры"
  | "ЖК и многоэтажные"
  | "Промышленные"
  | "Социальные";

export type PortfolioItem = {
  slug: string;
  title: string;
  category: Exclude<PortfolioCategory, "Все">;
  city: string;
  year: string;
  area: string;
  type: string; // "монолит", "фасад", "кровля", "кладка"
  cover: string; // путь к фото в /covers или R2 URL
};

// Slug → категория. Если объекта нет в карте — попадает в категорию по умолчанию.
const CATEGORY_BY_SLUG: Record<string, Exclude<PortfolioCategory, "Все">> = {
  // Промышленные
  ozon: "Промышленные",
  "abk-lukoil": "Промышленные",
  "kotelnaya-inta": "Промышленные",
  "konditerskiy-perm": "Промышленные",
  "fundamenty-chelyabinsk": "Промышленные",
  "ventfasad-odess": "Промышленные",
  "ventfasad-usinsk": "Промышленные",
  "krovlya-usinsk": "Промышленные",
  // ЖК и многоэтажные
  "good-style": "ЖК и многоэтажные",
  "kompozitny-fasad": "ЖК и многоэтажные",
  // Социальные
  "onko-center": "Социальные",
  "fok-perm": "Социальные",
  "kladka-fok": "Социальные",
  "ventfasad-verescagino": "Социальные",
};

// Год сдачи — пока неизвестен, ставим прочерк.
const YEAR_BY_SLUG: Record<string, string> = {};

// Площадь — пока неизвестна.
const AREA_BY_SLUG: Record<string, string> = {};

function categoryFor(slug: string): Exclude<PortfolioCategory, "Все"> {
  return CATEGORY_BY_SLUG[slug] ?? "Промышленные";
}

function cityFromLocation(location: string): string {
  return location.replace(/^г\.\s*/, "").trim();
}

function mapProject(p: Project): PortfolioItem {
  return {
    slug: p.slug,
    title: p.name,
    category: categoryFor(p.slug),
    city: cityFromLocation(p.location),
    year: YEAR_BY_SLUG[p.slug] ?? "—",
    area: AREA_BY_SLUG[p.slug] ?? "—",
    type: p.type,
    cover: getCoverUrl(p.slug),
  };
}

// ТЦ Вера — текущий объект, его нет в projects.ts, но он важен для лендинга.
const TC_VERA: PortfolioItem = {
  slug: "tc-vera",
  title: "ТЦ «Вера»",
  category: "Торговые центры",
  city: "Верещагино",
  year: "2024",
  area: "—",
  type: "Монолит, кладка",
  cover: "/covers/tc-vera.jpg",
};

export const PORTFOLIO: PortfolioItem[] = [TC_VERA, ...projects.map(mapProject)];

export const CATEGORIES: PortfolioCategory[] = [
  "Все",
  "Торговые центры",
  "ЖК и многоэтажные",
  "Промышленные",
  "Социальные",
];
