---
name: upload-photos
description: Загрузка фотографий объекта на Cloudflare R2 CDN для сайта ВЕР СТРОЙ.
argument-hint: [slug проекта] [путь к папке с фото]
disable-model-invocation: true
allowed-tools: Bash, Read, Glob
---

# Загрузка фото на Cloudflare R2

Параметры: $ARGUMENTS

## CDN структура

Бакет R2: `verstroy-site`
URL: `https://pub-bb1561168dcd45c991b3b95d38e591d4.r2.dev`

Структура файлов на R2:
```
projects/{slug}/001.jpg
projects/{slug}/002.jpg
...
covers/{slug}.jpg
```

## Действия

1. **Определи slug проекта и путь к фото** из аргументов
2. **Проверь** что фото существуют в указанной папке
3. **Переименуй** фото в формат `001.jpg`, `002.jpg`, ... (по порядку)
4. **Оптимизируй** если нужно (см. скилл photo-optimize)
5. **Загрузи** через rclone или wrangler:
   ```bash
   # Фото проекта
   rclone copy ./photos/ r2:verstroy-site/projects/{slug}/ --progress

   # Обложка (первое фото или указанное)
   rclone copyto ./photos/001.jpg r2:verstroy-site/covers/{slug}.jpg
   ```
6. **Обнови photoCount** в `src/data/projects.ts` если изменилось количество
7. **Проверь доступность** — curl одного фото с CDN

## Важно
- Формат имён: трёхзначный номер с нулями (001, 002, ..., 290)
- Формат файлов: только .jpg
- Обложка берётся по coverIndex из projects.ts
- Все команды загрузки — в фоне
