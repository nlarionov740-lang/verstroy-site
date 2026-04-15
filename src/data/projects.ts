export interface Project {
  id: string;
  name: string;
  slug: string;
  type: string;
  location: string;
  description: string;
  photoCount: number;
  coverIndex: number; // which photo to use as cover (1-based)
}

export const projects: Project[] = [
  // ── Монолитные работы ──
  {
    id: "ozon",
    name: "РЦ OZON",
    slug: "ozon",
    type: "Монолит",
    location: "г. Пермь",
    description:
      "Монолитный каркас распределительного центра OZON — один из крупнейших объектов в портфолио. Фундаменты, колонны, перекрытия. 290 фотографий хода работ.",
    photoCount: 290,
    coverIndex: 1,
  },
  {
    id: "onko-center",
    name: "Онкологический центр",
    slug: "onko-center",
    type: "Монолит",
    location: "г. Пермь",
    description:
      "Монолитный каркас онкологического центра в Перми. Повышенные требования к точности: допуски на отклонение конструкций — минимальные. 198 фото.",
    photoCount: 198,
    coverIndex: 30,
  },
  {
    id: "good-style",
    name: "ЖК Good Style",
    slug: "good-style",
    type: "Монолит",
    location: "г. Пермь",
    description:
      "Монолитные работы на жилом комплексе Good Style — каркас здания, перекрытия, несущие стены. 31 фото.",
    photoCount: 31,
    coverIndex: 10,
  },
  {
    id: "abk-lukoil",
    name: "АБК ЛУКОЙЛ",
    slug: "abk-lukoil",
    type: "Монолит (фундаменты)",
    location: "Пермский край",
    description:
      "Фундаменты административно-бытового комплекса ЛУКОЙЛ. Подготовка основания, армирование и бетонирование в сложных климатических условиях Пермского края. 127 фото.",
    photoCount: 127,
    coverIndex: 1,
  },
  {
    id: "kotelnaya-inta",
    name: "Газовая котельная",
    slug: "kotelnaya-inta",
    type: "Монолит (фундаменты)",
    location: "г. Инта",
    description:
      "Фундаменты газовой котельной в Инте — Крайний Север. Свайное основание и монолитные ростверки при экстремальных температурах. 76 фото.",
    photoCount: 76,
    coverIndex: 15,
  },
  {
    id: "konditerskiy-perm",
    name: "Кондитерский цех",
    slug: "konditerskiy-perm",
    type: "Монолит (фундаменты)",
    location: "г. Пермь",
    description:
      "Фундаменты кондитерского цеха в Перми. Расчёт под технологические нагрузки пищевого производства. 43 фото.",
    photoCount: 43,
    coverIndex: 20,
  },
  {
    id: "fok-perm",
    name: "ФОК Пермь",
    slug: "fok-perm",
    type: "Монолит (монолитные полы)",
    location: "г. Пермь",
    description:
      "Монолитные промышленные полы для физкультурно-оздоровительного комплекса. Высокие требования к ровности и прочности покрытия. 67 фото.",
    photoCount: 67,
    coverIndex: 25,
  },
  {
    id: "fundamenty-chelyabinsk",
    name: "Промышленный объект Челябинск",
    slug: "fundamenty-chelyabinsk",
    type: "Монолит (фундаменты)",
    location: "г. Челябинск",
    description:
      "Фундаменты промышленного объекта в Челябинске. Земляные работы, армирование, бетонирование — 23 фото фиксации.",
    photoCount: 23,
    coverIndex: 1,
  },
  // ── Фасадные работы ──
  {
    id: "ventfasad-verescagino",
    name: "Фасад школы Верещагино",
    slug: "ventfasad-verescagino",
    type: "Фасад",
    location: "г. Верещагино",
    description:
      "Вентилируемый фасад школы в Верещагино. Утепление и облицовка по стандартам для объектов образования. 22 фото.",
    photoCount: 22,
    coverIndex: 1,
  },
  {
    id: "kompozitny-fasad",
    name: "Композитный фасад",
    slug: "kompozitny-fasad",
    type: "Фасад",
    location: "г. Пермь",
    description:
      "Композитный фасад жилого дома в Перми. Облицовка алюминиевыми кассетами — долговечность и выразительный внешний вид. 27 фото.",
    photoCount: 27,
    coverIndex: 1,
  },
  {
    id: "ventfasad-odess",
    name: "Фасад ЛУКОЙЛ Одесс",
    slug: "ventfasad-odess",
    type: "Фасад",
    location: "г. Нижний Одесс",
    description:
      "Вентилируемый фасад объекта ЛУКОЙЛ в Нижнем Одессе. Утепление и облицовка навесными системами. 40 фото.",
    photoCount: 40,
    coverIndex: 25,
  },
  {
    id: "ventfasad-usinsk",
    name: "Фасад ЛУКОЙЛ Усинск",
    slug: "ventfasad-usinsk",
    type: "Фасад",
    location: "г. Усинск",
    description:
      "Навесной вентилируемый фасад объекта ЛУКОЙЛ в Усинске. Монтаж при температурах до −40°C, морозостойкие крепёжные системы. 37 фото.",
    photoCount: 37,
    coverIndex: 30,
  },
  // ── Кладочные работы ──
  {
    id: "kladka-fok",
    name: "Кладка ФОК Пермь",
    slug: "kladka-fok",
    type: "Кладка",
    location: "г. Пермь",
    description:
      "Кирпичная кладка ФОК в Перми — несущие стены и перегородки. Контроль геометрии и качества швов на каждом этапе. 41 фото.",
    photoCount: 41,
    coverIndex: 1,
  },
  // ── Кровельные работы ──
  {
    id: "krovlya-usinsk",
    name: "Кровля ЛУКОЙЛ Усинск",
    slug: "krovlya-usinsk",
    type: "Кровля",
    location: "г. Усинск",
    description:
      "Кровля объекта ЛУКОЙЛ в Усинске — Крайний Север. Монтаж в сжатые сезонные окна, морозостойкие материалы. 57 фото.",
    photoCount: 57,
    coverIndex: 5,
  },
];

const CDN = "https://pub-bb1561168dcd45c991b3b95d38e591d4.r2.dev";

// Helper to generate photo paths for a project
export function getProjectPhotos(slug: string, count: number): string[] {
  return Array.from({ length: count }, (_, i) => {
    const padded = String(i + 1).padStart(3, "0");
    return `${CDN}/projects/${slug}/${padded}.jpg`;
  });
}

export function getCoverUrl(slug: string): string {
  return `${CDN}/covers/${slug}.jpg`;
}
