---
name: seo-check
description: SEO аудит сайта ВЕР СТРОЙ — метаданные, JSON-LD, sitemap, Open Graph, скорость.
context: fork
agent: Explore
allowed-tools: Read, Grep, Glob, Bash
---

# SEO аудит сайта ВЕР СТРОЙ

Проверь все аспекты SEO:

## 1. Метаданные (`src/app/layout.tsx`)
- title, description заполнены и оптимальной длины
- keywords релевантные (строительство, Пермь, монолит, фасады)
- Open Graph теги (og:title, og:description, og:image)
- Twitter Card теги

## 2. Структурированные данные
- JSON-LD для Organization (название, адрес, контакты)
- JSON-LD для WebSite
- Проверь корректность schema.org разметки

## 3. Технические файлы
- `src/app/robots.ts` — правильные правила для ботов
- `src/app/sitemap.ts` — все страницы включены
- `src/app/manifest.ts` — PWA манифест корректный
- `favicon.ico` и `icon.svg` существуют

## 4. Изображения
- Все img имеют alt атрибуты на русском
- Используется Next.js Image компонент для оптимизации
- Обложки проектов доступны на CDN

## 5. Производительность
- Нет блокирующих ресурсов
- Шрифты подключены с display: swap
- Lazy loading для изображений ниже fold

## 6. Домен
- Сайт: верстрой.рф (xn--b1agmtjagi.xn--p1ai)
- Canonical URL настроен

Выдай отчёт с оценкой по каждому пункту и конкретными рекомендациями.
