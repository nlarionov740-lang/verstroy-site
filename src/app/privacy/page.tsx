import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Политика конфиденциальности",
  description:
    "Политика конфиденциальности ООО «ВЕР СТРОЙ». Обработка персональных данных в соответствии с ФЗ-152.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-bg-dark text-white px-6 py-16 lg:py-24">
      <div className="max-w-2xl mx-auto">
        <h1 className="font-montserrat text-3xl lg:text-4xl font-bold mb-8">
          Политика конфиденциальности
        </h1>

        <div className="space-y-5 text-white/60 text-base leading-relaxed">
          <p>
            ООО &laquo;ВЕР СТРОЙ&raquo; обрабатывает персональные данные (имя,
            телефон) исключительно для связи с&nbsp;клиентом по оставленной
            заявке. Данные не&nbsp;передаются третьим лицам.
          </p>

          <p>
            Оставляя заявку на&nbsp;сайте, вы соглашаетесь на&nbsp;обработку
            персональных данных в&nbsp;соответствии с&nbsp;Федеральным законом
            &numero;&nbsp;152&#8209;ФЗ &laquo;О&nbsp;персональных данных&raquo;.
          </p>

          <p>
            Контакт:{" "}
            <a
              href="mailto:ver.stroy.company@mail.ru"
              className="text-accent hover:underline"
            >
              ver.stroy.company@mail.ru
            </a>
          </p>
        </div>

        <Link
          href="/"
          className="inline-block mt-10 text-sm text-white/40 hover:text-accent transition-colors duration-300"
        >
          &larr; Назад на главную
        </Link>
      </div>
    </div>
  );
}
