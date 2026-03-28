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
      "Строительство крупного распределительного центра для OZON. Монолитные работы, фундаменты, каркас здания. Масштабный промышленный объект с высокими требованиями к срокам и качеству.",
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
      "Возведение монолитного каркаса онкологического центра. Сложный объект с повышенными требованиями к качеству бетонных работ и соблюдению проектных норм.",
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
      "Монолитные работы на жилом комплексе Good Style. Возведение каркаса здания, устройство перекрытий и несущих конструкций.",
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
      "Устройство фундаментов для административно-бытового комплекса ЛУКОЙЛ. Работы включали подготовку основания, армирование и бетонирование в сложных климатических условиях.",
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
      "Строительство фундаментов газовой котельной. Выполнены земляные работы, устройство свайного основания и монолитных ростверков.",
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
      "Устройство фундаментов для кондитерского цеха. Монолитные работы с учётом технологических нагрузок пищевого производства.",
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
      "Устройство монолитных промышленных полов для физкультурно-оздоровительного комплекса. Высокоточная работа с требованиями к ровности и прочности покрытия.",
    photoCount: 67,
    coverIndex: 25,
  },
  {
    id: "fundamenty-chelyabinsk",
    name: "Фундаменты Челябинск",
    slug: "fundamenty-chelyabinsk",
    type: "Монолит (фундаменты)",
    location: "г. Челябинск",
    description:
      "Устройство фундаментов на объекте в г. Челябинск. Земляные работы, армирование и бетонирование фундаментных конструкций в строгом соответствии с проектной документацией.",
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
      "Монтаж вентилируемого фасада на здании средней образовательной школы. Работы по утеплению и облицовке фасада с применением навесных систем, соответствующих требованиям объектов образования.",
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
      "Монтаж композитного фасада на жилом доме. Облицовка фасадными кассетами из алюминиевого композита — современное решение, обеспечивающее долговечность и выразительный внешний вид здания.",
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
      "Монтаж вентилируемого фасада на объекте ЛУКОЙЛ. Работы по утеплению и облицовке фасада с применением современных навесных систем.",
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
      "Монтаж навесного вентилируемого фасада на объекте ЛУКОЙЛ в Усинске. Работы в условиях Крайнего Севера с применением морозостойких материалов.",
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
      "Кладочные работы на объекте физкультурно-оздоровительного комплекса. Кирпичная кладка несущих стен и перегородок с соблюдением проектных требований к геометрии и качеству швов.",
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
      "Кровельные работы на объекте ЛУКОЙЛ в г. Усинск. Монтаж кровельной системы в условиях Крайнего Севера с соблюдением всех технологических требований.",
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
