---
name: check-email
description: Проверка работы формы обратной связи на сайте ВЕР СТРОЙ — тест SMTP и API endpoint.
disable-model-invocation: true
allowed-tools: Bash, Read
---

# Проверка формы обратной связи

## Что проверить

### 1. Конфигурация SMTP
- Прочитай `src/app/api/contact/route.ts`
- Проверь что `.env.local` существует с переменными SMTP_USER и SMTP_PASS
- SMTP: smtp.mail.ru, порт 465, secure: true

### 2. Тест API endpoint
Запусти dev сервер если не запущен:
```bash
cd "/Users/nikita/Desktop/ВЕР СТРОЙ САЙТ/verstroy-site" && npm run dev
```

Отправь тестовый запрос:
```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Тест","phone":"+7 999 123-45-67","message":"Тестовое сообщение от Claude"}'
```

### 3. Проверь результат
- Ответ 200 = успех
- Ответ 500 = проблема с SMTP (проверь .env.local)
- Проверь что письмо дошло на ver.stroy.company@mail.ru

### 4. Проверь фронтенд
- Прочитай `src/components/Contacts.tsx`
- Убедись что форма отправляет данные на `/api/contact`
- Поля: name, phone, message
- Есть валидация и feedback пользователю
