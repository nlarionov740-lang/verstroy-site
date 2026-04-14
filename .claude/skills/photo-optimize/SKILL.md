---
name: photo-optimize
description: Оптимизация и сжатие фотографий перед загрузкой на R2 CDN для сайта ВЕР СТРОЙ.
argument-hint: [путь к папке с фото]
disable-model-invocation: true
allowed-tools: Bash, Glob, Read
---

# Оптимизация фотографий

Папка с фото: $ARGUMENTS

## Действия

1. **Посчитай фото** в указанной папке
2. **Проверь размеры** — покажи общий вес и средний размер файла
3. **Оптимизируй** каждое фото:

```bash
# Установи sharp-cli если нет
npm install -g sharp-cli

# Или используй sips (встроен в macOS)
# Ресайз до макс 1920px по ширине, качество 85%
for f in *.jpg *.jpeg *.JPG *.JPEG; do
  [ -f "$f" ] || continue
  sips -Z 1920 "$f" --setProperty formatOptions 85
done
```

4. **Конвертируй в JPG** если есть PNG, HEIC, WebP:
```bash
# HEIC → JPG (macOS)
for f in *.HEIC *.heic; do
  [ -f "$f" ] || continue
  sips -s format jpeg "$f" --out "${f%.*}.jpg"
done
```

5. **Переименуй** в формат 001.jpg, 002.jpg, ...
```bash
i=1
for f in $(ls -1 *.jpg | sort); do
  mv "$f" $(printf "%03d.jpg" $i)
  i=$((i+1))
done
```

6. **Покажи результат** — новый общий вес, сколько сэкономлено

## Целевые параметры
- Максимальная ширина: 1920px
- Формат: JPEG
- Качество: 85%
- Средний вес файла: 200-400 KB
