// Smoke-тест калькулятора стоимости коттеджа.
// Запуск: node scripts/test-calculator.mjs
//
// Зачем inline-константы вместо импорта из ../src/app/cottage/lib/calculator.ts?
// tsx не установлен в проекте, ставить его в devDependencies на этой задаче нельзя
// (плановое ограничение). Поэтому повторяем чистую функцию calculate() и formatRub()
// здесь, в обычном JS, синхронизируя цифры с pricing.ts. Если меняешь pricing.ts —
// обнови и эти константы.

const BASE_PRICE_PER_M2 = {
  monolith: 60_000,
  aerated: 45_000,
  brick: 55_000,
};

const FLOOR_MULTIPLIER = {
  one: 1.0,
  two: 1.15,
  twoAttic: 1.25,
};

const FINISH_MULTIPLIER = {
  rough: 1.0,
  full: 1.25,
};

const ENGINEERING_ADDONS = {
  warmFloor: 800_000,
  boilerRoom: 600_000,
  sewer: 350_000,
  well: 450_000,
};

function calculate({ area, boxType, floorType, finishType, engineering }) {
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

function formatRub(amount) {
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 0,
  }).format(amount);
}

let failed = 0;

function assert(name, actual, expected) {
  if (actual !== expected) {
    console.error(`x ${name}: expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
    failed++;
  } else {
    console.log(`ok ${name}`);
  }
}

// Тест 1: базовый расчёт монолита 200м², 1 этаж, под чистовую
{
  const r = calculate({
    area: 200,
    boxType: "monolith",
    floorType: "one",
    finishType: "rough",
    engineering: [],
  });
  assert("monolith 200m² 1F rough = 12_000_000", r.total, 12_000_000);
}

// Тест 2: два этажа дают +15%
{
  const r = calculate({
    area: 200,
    boxType: "monolith",
    floorType: "two",
    finishType: "rough",
    engineering: [],
  });
  assert("two floors x1.15", r.total, Math.round(12_000_000 * 1.15));
}

// Тест 3: под ключ +25%
{
  const r = calculate({
    area: 200,
    boxType: "monolith",
    floorType: "one",
    finishType: "full",
    engineering: [],
  });
  assert("full finish x1.25", r.total, Math.round(12_000_000 * 1.25));
}

// Тест 4: инженерия суммируется
{
  const r = calculate({
    area: 200,
    boxType: "monolith",
    floorType: "one",
    finishType: "rough",
    engineering: ["warmFloor", "boilerRoom"],
  });
  assert(
    "engineering: warmFloor + boilerRoom",
    r.total,
    12_000_000 + 800_000 + 600_000,
  );
}

// Тест 5: газобетон дешевле
{
  const r = calculate({
    area: 200,
    boxType: "aerated",
    floorType: "one",
    finishType: "rough",
    engineering: [],
  });
  assert("aerated 200m² = 9_000_000", r.total, 9_000_000);
}

// Тест 6: формат рублей.
// Intl.NumberFormat в ru-RU использует неразрывный пробел (U+00A0) между группами цифр
// и перед символом валюты. Нормализуем к обычному пробелу для устойчивого сравнения.
{
  const raw = formatRub(12_000_000);
  const normalized = raw.replace(/ /g, " ");
  assert("formatRub", normalized, "12 000 000 ₽");
}

// Тест 7: валидация — площадь меньше 50
{
  let threw = false;
  try {
    calculate({
      area: 30,
      boxType: "monolith",
      floorType: "one",
      finishType: "rough",
      engineering: [],
    });
  } catch {
    threw = true;
  }
  assert("throws on area < 50", threw, true);
}

if (failed > 0) {
  console.error(`\n${failed} test(s) failed`);
  process.exit(1);
} else {
  console.log("\nAll tests passed");
}
