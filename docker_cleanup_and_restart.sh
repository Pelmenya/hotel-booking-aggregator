#!/bin/bash

# Остановка и удаление текущих контейнеров
docker-compose down

# Очистка остановленных контейнеров
docker container prune -f

# Очистка неиспользуемых образов
docker image prune -f

# Очистка неиспользуемых томов
# Внимание: Убедитесь, что тома баз данных используются текущими контейнерами
docker volume prune -f

# Очистка неиспользуемых сетей
docker network prune -f

# Очистка всех неиспользуемых ресурсов
docker system prune -a -f

# Перезапуск контейнеров с пересборкой образов
docker-compose up --build
