---
name: git-status
description: Быстрый статус git для сайта ВЕР СТРОЙ — изменения, коммиты, синхронизация с remote.
allowed-tools: Bash
---

# Git статус проекта

Выполни и покажи в компактном виде:

```bash
cd "/Users/nikita/Desktop/ВЕР СТРОЙ САЙТ/verstroy-site"

echo "=== Статус ==="
git status --short

echo ""
echo "=== Последние 5 коммитов ==="
git log --oneline -5

echo ""
echo "=== Синхронизация с remote ==="
git fetch origin --quiet 2>/dev/null
git status --branch --short
```

## Формат ответа

Покажи пользователю кратко:
- Есть ли незакоммиченные изменения (и какие файлы)
- Последний коммит (дата и сообщение)
- Отстаёт ли от remote или впереди
- Если всё чисто — просто скажи "Всё синхронизировано"
