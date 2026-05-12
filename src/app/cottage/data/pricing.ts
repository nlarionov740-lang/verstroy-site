// Прайс-константы для калькулятора стоимости коттеджа.
// Базовая цена за м² по типу коробки, мультипликаторы по этажности и отделке,
// фиксированные надбавки за инженерию.

export const BASE_PRICE_PER_M2 = {
  monolith: 60_000,
  aerated: 45_000,
  brick: 55_000,
} as const;

export type BoxType = keyof typeof BASE_PRICE_PER_M2;

export const FLOOR_MULTIPLIER = {
  one: 1.0,
  two: 1.15,
  twoAttic: 1.25,
} as const;

export type FloorType = keyof typeof FLOOR_MULTIPLIER;

export const FINISH_MULTIPLIER = {
  rough: 1.0, // под чистовую
  full: 1.25, // под ключ (+25%)
} as const;

export type FinishType = keyof typeof FINISH_MULTIPLIER;

export const ENGINEERING_ADDONS = {
  warmFloor: 800_000,
  boilerRoom: 600_000,
  sewer: 350_000,
  well: 450_000,
} as const;

export type EngineeringKey = keyof typeof ENGINEERING_ADDONS;
