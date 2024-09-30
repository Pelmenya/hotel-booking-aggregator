#!/bin/bash

# Перейти в корневую директорию проекта (если скрипт запускается не из корневой директории)
cd "$(dirname "$0")/.."

# Подтянуть последние изменения из удаленного репозитория
echo "Pulling latest changes from git..."
git pull

# Остановка и удаление текущих контейнеров
echo "Stopping and removing current containers..."
docker-compose down

# Очистка остановленных контейнеров
echo "Pruning stopped containers..."
docker container prune -f

# Очистка неиспользуемых образов
echo "Pruning unused images..."
docker image prune -f

# Очистка неиспользуемых томов
# Внимание: Убедитесь, что тома баз данных используются текущими контейнерами
echo "Pruning unused volumes..."
docker volume prune -f

# Очистка неиспользуемых сетей
echo "Pruning unused networks..."
docker network prune -f

# Очистка всех неиспользуемых ресурсов
echo "Pruning all unused resources..."
docker system prune -a -f

# Перезапуск контейнеров с пересборкой образов
echo "Rebuilding and starting containers..."
docker-compose up --build