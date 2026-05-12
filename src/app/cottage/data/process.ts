// src/app/cottage/data/process.ts
export type ProcessStep = {
  number: string;
  title: string;
  duration: string;
  description: string;
};

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: "01",
    title: "Проект и расчёт",
    duration: "1–2 нед",
    description: "Замер участка. Финальная смета. Договор с фикс-ценой.",
  },
  {
    number: "02",
    title: "Котлован и подготовка",
    duration: "2 нед",
    description: "Разработка грунта. Устройство фундаментной плиты.",
  },
  {
    number: "03",
    title: "Монолит фундамента",
    duration: "2–3 нед",
    description: "Армирование. Бетонирование. Гидроизоляция.",
  },
  {
    number: "04",
    title: "Коробка и стены",
    duration: "4–8 нед",
    description: "Несущие стены — монолит/газобетон. Перекрытия.",
  },
  {
    number: "05",
    title: "Кровля",
    duration: "2 нед",
    description: "Стропильная система. Утепление. Кровельный пирог.",
  },
  {
    number: "06",
    title: "Фасад и инженерия",
    duration: "4–6 нед",
    description: "Вентилируемый фасад. Окна. Электрика. Сантехника. Котёл.",
  },
  {
    number: "07",
    title: "Отделка и ключи",
    duration: "8–12 нед",
    description: "Внутренняя отделка под чистовую или под ключ. Сдача.",
  },
];
