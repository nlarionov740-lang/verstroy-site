import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
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
    const { name, phone, email, area, message, source } = body ?? {};

    if (!name || !phone) {
      return NextResponse.json(
        { error: "Имя и телефон обязательны" },
        { status: 400 }
      );
    }

    const nameTrimmed = String(name).trim();
    if (nameTrimmed.length < 2 || nameTrimmed.length > 100) {
      return NextResponse.json(
        { error: "Имя должно быть от 2 до 100 символов" },
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

    // Optional fields — валидируем мягко, обрезаем по длине.
    const emailTrimmed =
      typeof email === "string" ? email.trim().slice(0, 200) : "";
    const areaRaw =
      typeof area === "number"
        ? String(area)
        : typeof area === "string"
          ? area.trim().slice(0, 50)
          : "";
    const messageTrimmed =
      typeof message === "string" ? message.trim().slice(0, 500) : "";
    const sourceTrimmed =
      typeof source === "string" ? source.trim().slice(0, 100) : "";

    const safeName = escapeHtml(nameTrimmed);
    const safePhone = escapeHtml(phoneTrimmed);
    const safeEmail = emailTrimmed ? escapeHtml(emailTrimmed) : "";
    const safeArea = areaRaw ? escapeHtml(areaRaw) : "";
    const safeMessage = messageTrimmed ? escapeHtml(messageTrimmed) : "";
    const safeSource = sourceTrimmed ? escapeHtml(sourceTrimmed) : "";

    const extraRows = [
      safeEmail
        ? `<p style="margin: 8px 0;"><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>`
        : "",
      safeArea
        ? `<p style="margin: 8px 0;"><strong>Площадь:</strong> ${safeArea} м²</p>`
        : "",
      safeMessage
        ? `<p style="margin: 8px 0;"><strong>Сообщение:</strong><br />${safeMessage.replace(/\n/g, "<br />")}</p>`
        : "",
      safeSource
        ? `<p style="margin: 8px 0; color: #666;"><strong>Источник:</strong> ${safeSource}</p>`
        : "",
    ]
      .filter(Boolean)
      .join("\n");

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
      subject: `Заявка с сайта от ${safeName}${safeSource ? ` (${safeSource})` : ""}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 500px; padding: 24px; background: #f5f5f5; border-radius: 8px;">
          <h2 style="color: #1B2A4A; margin-bottom: 16px;">Новая заявка с сайта</h2>
          <p style="margin: 8px 0;"><strong>Имя:</strong> ${safeName}</p>
          <p style="margin: 8px 0;"><strong>Телефон:</strong> <a href="tel:${safePhone}">${safePhone}</a></p>
          ${extraRows}
          <hr style="border: none; border-top: 1px solid #ddd; margin: 16px 0;" />
          <p style="color: #888; font-size: 12px;">Отправлено с сайта верстрой.рф</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Ошибка отправки" },
      { status: 500 }
    );
  }
}
