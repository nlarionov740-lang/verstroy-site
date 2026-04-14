---
name: new-page
description: Создать новую страницу на сайте ВЕР СТРОЙ с правильной структурой Next.js.
argument-hint: [название страницы, например "о-компании" или "проекты"]
allowed-tools: Read, Write, Edit, Bash, Glob
---

# Создать новую страницу

Страница: $ARGUMENTS

## Структура Next.js (App Router)

Новая страница создаётся в `src/app/{slug}/page.tsx`

## Шаблон страницы

```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Название — ВЕР СТРОЙ",
  description: "Описание страницы для SEO",
};

export default function PageName() {
  return (
    <main className="min-h-screen bg-[#0D1117]">
      {/* Контент страницы */}
    </main>
  );
}
```

## Действия

1. **Определи slug** из названия (латиница, lowercase)
2. **Создай директорию** `src/app/{slug}/`
3. **Создай page.tsx** с правильными метаданными
4. **Добавь навигацию** — обнови Header.tsx с ссылкой на новую страницу
5. **Обнови sitemap.ts** — добавь URL новой страницы
6. **Проверь сборку** — `npm run build`

## Стиль
- Tailwind CSS v4
- Тёмная тема: bg-[#0D1117], текст белый
- Шрифт заголовков: font-montserrat
- Анимации: Framer Motion (fade in при скролле)
- Компоненты Header и Footer уже в layout.tsx
