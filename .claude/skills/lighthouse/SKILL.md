---
name: lighthouse
description: Аудит производительности сайта ВЕР СТРОЙ через Lighthouse — скорость, доступность, SEO.
disable-model-invocation: true
allowed-tools: Bash, Read
---

# Lighthouse аудит

## Запуск

```bash
# Убедись что dev сервер запущен
cd "/Users/nikita/Desktop/ВЕР СТРОЙ САЙТ/verstroy-site"

# Запусти Lighthouse CLI
npx lighthouse http://localhost:3000 \
  --output=json \
  --output-path=./lighthouse-report.json \
  --chrome-flags="--headless --no-sandbox" \
  --only-categories=performance,accessibility,best-practices,seo
```

## Анализ результатов

Прочитай `lighthouse-report.json` и выдай:

1. **Общие оценки** (из 100):
   - Performance
   - Accessibility
   - Best Practices
   - SEO

2. **Топ-5 проблем** с конкретными рекомендациями:
   - Какой файл исправить
   - Что именно сделать
   - Ожидаемый эффект

3. **Быстрые победы** — что можно исправить за 5 минут

## Типичные проблемы для этого сайта
- Большие изображения с R2 CDN без lazy loading
- Framer Motion бандл может быть тяжёлым
- Шрифты Google Fonts блокируют рендеринг
- Swiper CSS/JS загружается полностью

После анализа удали `lighthouse-report.json`.
