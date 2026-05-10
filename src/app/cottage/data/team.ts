// src/app/cottage/data/team.ts
export type TeamMember = {
  name: string;
  role: string;
  experience: string;
  objects: string[];
  photo: string | null; // null = заглушка
};

export const TEAM: TeamMember[] = [
  {
    name: "Имя Прораб",
    role: "Главный прораб",
    experience: "12+ лет в монолите",
    objects: ["ТЦ Вера", "Елькина 12", "ЖК Good Style"],
    photo: null,
  },
  {
    name: "Имя Прораб",
    role: "Прораб по фасаду",
    experience: "8+ лет в фасадных работах",
    objects: ["ЛУКОЙЛ Усинск", "ЛУКОЙЛ Нижний Одесс", "Школа Верещагино"],
    photo: null,
  },
  {
    name: "Имя Инженер",
    role: "Инженер ПТО",
    experience: "10+ лет проектирование",
    objects: ["ТЦ Вера", "ОЗОН", "ФОК"],
    photo: null,
  },
];
