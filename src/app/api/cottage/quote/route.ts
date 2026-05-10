import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";

// Карты человекочитаемых меток для письма.
// Совпадают с ключами в `src/app/cottage/data/pricing.ts`.
const BOX_TYPE_LABELS: Record<string, string> = {
  monolith: "Монолит",
  aerated: "Газобетон",
  brick: "Кирпич",
};

const FLOOR_TYPE_LABELS: Record<string, string> = {
  one: "1 этаж",
  two: "2 этажа",
  twoAttic: "2 этажа + мансарда",
};

const FINISH_TYPE_LABELS: Record<string, string> = {
  rough: "Под чистовую",
  full: "Под ключ",
};

const ENGINEERING_LABELS: Record<string, string> = {
  warmFloor: "Тёплый пол",
  boilerRoom: "Котельная",
  sewer: "Канализация (септик)",
  well: "Скважина",
};

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatRub(amount: number): string {
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 0,
  }).format(amount);
}

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request.headers);
    const rl = checkRateLimit(ip);
    if (!rl.ok) {
      return NextResponse.json(
        { error: "Слишком много запросов. Попробуйте позже." },
        {
          status: 429,
          headers: { "Retry-After": String(rl.retryAfter ?? 60) },
        }
      );
    }

    const body = await request.json();
    const {
      email,
      phone,
      area,
      boxType,
      floorType,
      finishType,
      engineering,
      total,
    } = body ?? {};

    if (!email || !phone) {
      return NextResponse.json(
        { error: "Email и телефон обязательны" },
        { status: 400 }
      );
    }

    const emailTrimmed = String(email).trim();
    // Простая проверка email: что-то@что-то.что-то, без пробелов.
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailTrimmed) || emailTrimmed.length > 200) {
      return NextResponse.json(
        { error: "Некорректный email" },
        { status: 400 }
      );
    }

    const phoneTrimmed = String(phone).trim();
    const phoneDigits = phoneTrimmed.replace(/\D/g, "");
    if (phoneDigits.length < 11 || phoneDigits.length > 12) {
      return NextResponse.json(
        { error: "Телефон должен содержать от 11 до 12 цифр" },
        { status: 400 }
      );
    }

    if (typeof area !== "number" || !Number.isFinite(area) || area < 50 || area > 1000) {
      return NextResponse.json(
        { error: "Площадь должна быть числом от 50 до 1000 м²" },
        { status: 400 }
      );
    }

    if (typeof boxType !== "string" || !(boxType in BOX_TYPE_LABELS)) {
      return NextResponse.json(
        { error: "Некорректный тип коробки" },
        { status: 400 }
      );
    }

    if (typeof floorType !== "string" || !(floorType in FLOOR_TYPE_LABELS)) {
      return NextResponse.json(
        { error: "Некорректная этажность" },
        { status: 400 }
      );
    }

    if (typeof finishType !== "string" || !(finishType in FINISH_TYPE_LABELS)) {
      return NextResponse.json(
        { error: "Некорректный тип отделки" },
        { status: 400 }
      );
    }

    if (typeof total !== "number" || !Number.isFinite(total)) {
      return NextResponse.json(
        { error: "Некорректная итоговая стоимость" },
        { status: 400 }
      );
    }

    // Engineering — необязательный массив строковых ключей из словаря.
    let engineeringList: string[] = [];
    if (engineering !== undefined && engineering !== null) {
      if (!Array.isArray(engineering)) {
        return NextResponse.json(
          { error: "Некорректный список инженерии" },
          { status: 400 }
        );
      }
      for (const key of engineering) {
        if (typeof key !== "string" || !(key in ENGINEERING_LABELS)) {
          return NextResponse.json(
            { error: "Некорректный пункт инженерии" },
            { status: 400 }
          );
        }
      }
      engineeringList = engineering as string[];
    }

    // Безопасные для HTML значения.
    const safeEmail = escapeHtml(emailTrimmed);
    const safePhone = escapeHtml(phoneTrimmed);
    const safeBox = escapeHtml(BOX_TYPE_LABELS[boxType]);
    const safeFloor = escapeHtml(FLOOR_TYPE_LABELS[floorType]);
    const safeFinish = escapeHtml(FINISH_TYPE_LABELS[finishType]);
    const safeEngineering = engineeringList
      .map((k) => escapeHtml(ENGINEERING_LABELS[k]))
      .join(", ") || "—";
    const safeArea = String(area);
    const safeTotal = escapeHtml(formatRub(total));

    const transporter = nodemailer.createTransport({
      host: "smtp.mail.ru",
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Сайт ВЕР СТРОЙ" <${process.env.SMTP_USER}>`,
      to: "ver.stroy.company@mail.ru",
      subject: `Расчёт коттеджа: ${safeArea} м², ${safeTotal}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 560px; padding: 24px; background: #f5f5f5; border-radius: 8px;">
          <h2 style="color: #1B2A4A; margin-bottom: 16px;">Новый расчёт коттеджа</h2>
          <p style="margin: 8px 0;"><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
          <p style="margin: 8px 0;"><strong>Телефон:</strong> <a href="tel:${safePhone}">${safePhone}</a></p>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 16px 0;" />
          <h3 style="color: #1B2A4A; margin: 16px 0 8px;">Параметры</h3>
          <p style="margin: 8px 0;"><strong>Площадь:</strong> ${safeArea} м²</p>
          <p style="margin: 8px 0;"><strong>Тип коробки:</strong> ${safeBox}</p>
          <p style="margin: 8px 0;"><strong>Этажность:</strong> ${safeFloor}</p>
          <p style="margin: 8px 0;"><strong>Отделка:</strong> ${safeFinish}</p>
          <p style="margin: 8px 0;"><strong>Инженерия:</strong> ${safeEngineering}</p>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 16px 0;" />
          <p style="margin: 8px 0; font-size: 18px;"><strong>Итого:</strong> ${safeTotal}</p>
          <p style="color: #888; font-size: 12px; margin-top: 16px;">Отправлено с калькулятора верстрой.рф/cottage</p>
        </div>
      `,
    });

    // TODO: Дублировать отправку расчёта в Telegram-бот ВЕР СТРОЙ
    // (отдельная задача — настройка бота и переменных TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID).

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Ошибка отправки" },
      { status: 500 }
    );
  }
}
