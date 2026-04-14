#!/bin/bash
# Скрипт деплоя сайта ВЕР СТРОЙ на VPS
# Запускать на сервере после первого git clone

set -e

echo "=== Деплой сайта ВЕР СТРОЙ ==="

# 1. Установить Docker если нет
if ! command -v docker &> /dev/null; then
    echo ">>> Устанавливаю Docker..."
    curl -fsSL https://get.docker.com | sh
    systemctl enable docker
    systemctl start docker
fi

# 2. Установить Docker Compose если нет
if ! command -v docker compose &> /dev/null; then
    echo ">>> Устанавливаю Docker Compose..."
    apt-get update && apt-get install -y docker-compose-plugin
fi

# 3. Получить SSL сертификат (только первый раз)
if [ ! -d "nginx/certbot/conf/live/xn--b1agm0taj.xn--p1ai" ]; then
    echo ">>> Получаю SSL сертификат..."

    # Временно запускаем nginx без SSL для проверки домена
    cat > nginx/default.conf.tmp << 'TMPCONF'
server {
    listen 80;
    server_name xn--b1agm0taj.xn--p1ai www.xn--b1agm0taj.xn--p1ai;
    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }
    location / {
        return 200 'OK';
    }
}
TMPCONF

    # Бэкап и подмена конфига
    cp nginx/default.conf nginx/default.conf.bak
    mv nginx/default.conf.tmp nginx/default.conf

    mkdir -p nginx/certbot/conf nginx/certbot/www
    docker compose up -d nginx
    sleep 5

    docker compose run --rm certbot certonly \
        --webroot --webroot-path=/var/www/certbot \
        -d xn--b1agm0taj.xn--p1ai \
        -d www.xn--b1agm0taj.xn--p1ai \
        --email ver.stroy.company@mail.ru \
        --agree-tos --no-eff-email

    # Возвращаем конфиг с SSL
    mv nginx/default.conf.bak nginx/default.conf
    docker compose down
fi

# 4. Собрать и запустить
echo ">>> Собираю и запускаю сайт..."
docker compose up -d --build

echo ""
echo "=== Готово! ==="
echo "Сайт запущен на https://верстрой.рф"
echo ""
echo "Полезные команды:"
echo "  docker compose logs -f     — логи"
echo "  docker compose restart     — перезапуск"
echo "  docker compose down        — остановить"
