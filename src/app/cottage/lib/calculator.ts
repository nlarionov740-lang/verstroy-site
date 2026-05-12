// Чистая функция расчёта стоимости коттеджа.
// Без побочных эффектов, без зависимостей от React — пригодна и для UI, и для API.

import {
  BASE_PRICE_PER_M2,
  FLOOR_MULTIPLIER,
  FINISH_MULTIPLIER,
  ENGINEERING_ADDONS,
  type BoxType,
  type FloorType,
  type FinishType,
  type EngineeringKey,
} from "../data/pricing";

export type CalculatorInput = {
  area: number;
  boxType: BoxType;
  floorType: FloorType;
  finishType: FinishType;
  engineering: EngineeringKey[];
};

export type CalculatorResult = {
  total: number;
  breakdown: {
    base: number;
    floorCoeff: number;
    finishCoeff: number;
    engineering: number;
  };
};

export function calculate(input: CalculatorInput): CalculatorResult {
  const { area, boxType, floorType, finishType, engineering } = input;

  if (!Number.isFinite(area) || area < 50 || area > 1000) {
    throw new Error("area must be between 50 and 1000 m²");
  }

  const basePerM2 = BASE_PRICE_PER_M2[boxType];
  const base = basePerM2 * area;
  const floorCoeff = FLOOR_MULTIPLIER[floorType];
  const finishCoeff = FINISH_MULTIPLIER[finishType];

  const construction = base * floorCoeff * finishCoeff;
  const engineeringTotal = engineering.reduce(
    (sum, key) => sum + ENGINEERING_ADDONS[key],
    0,
  );

  return {
    total: Math.round(construction + engineeringTotal),
    breakdown: {
      base,
      floorCoeff,
      finishCoeff,
      engineering: engineeringTotal,
    },
  };
}

export function formatRub(amount: number): string {
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 0,
  }).format(amount);
}
