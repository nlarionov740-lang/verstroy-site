import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const { name, phone } = await request.json();

    if (!name || !phone) {
      return NextResponse.json(
        { error: "Имя и телефон обязательны" },
        { status: 400 }
      );
    }

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
      subject: `Заявка с сайта от ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 500px; padding: 24px; background: #f5f5f5; border-radius: 8px;">
          <h2 style="color: #1B2A4A; margin-bottom: 16px;">Новая заявка с сайта</h2>
          <p style="margin: 8px 0;"><strong>Имя:</strong> ${name}</p>
          <p style="margin: 8px 0;"><strong>Телефон:</strong> <a href="tel:${phone}">${phone}</a></p>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 16px 0;" />
          <p style="color: #888; font-size: 12px;">Отправлено с сайта верстрой.рф</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email error:", error);
    return NextResponse.json(
      { error: "Ошибка отправки" },
      { status: 500 }
    );
  }
}
