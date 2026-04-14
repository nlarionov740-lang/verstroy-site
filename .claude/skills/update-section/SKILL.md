---
name: update-section
description: Обновить секцию сайта ВЕР СТРОЙ (Hero, About, Services и др.) с проверкой командой агентов.
argument-hint: [название секции] [что изменить]
allowed-tools: Read, Edit, Glob, Grep, Bash, Agent
---

# Обновить секцию сайта

Секция и задача: $ARGUMENTS

## Секции сайта и их файлы

| Секция | Файл |
|--------|------|
| Шапка | `src/components/Header.tsx` |
| Главный экран | `src/components/Hero.tsx` |
| О компании | `src/components/About.tsx` |
| Услуги | `src/components/Services.tsx` |
| Портфолио | `src/components/Portfolio.tsx` |
| Процесс работы | `src/components/Process.tsx` |
| Статистика | `src/components/Stats.tsx` |
| Контакты | `src/components/Contacts.tsx` |
| Подвал | `src/components/Footer.tsx` |
| Стили | `src/app/globals.css` |
| Лейаут | `src/app/layout.tsx` |

## Порядок работы

1. **Прочитай** текущий код секции
2. **Внеси изменения** согласно запросу пользователя
3. **Запусти сборку** — `npm run build` для проверки ошибок
4. **Запусти 4 агентов** для проверки (дизайнер, копирайтер, кодер, босс)
5. **Покажи результат** пользователю

## Стиль кода
- Tailwind CSS v4 классы
- Framer Motion для анимаций
- Заголовки выравниваются через flex justify-between
- Цвета: primary #1B2A4A, accent #D4A843, bg #0D1117
- Шрифты: Montserrat (заголовки), Inter (текст)
