#!/bin/bash

# Функция для обработки ошибок
handle_error() {
    echo "Error on line $1" >> deploy.log
    echo "FAILED" > deploy_status.txt
    exit 1
}

# Установить обработчик ошибок
trap 'handle_error $LINENO' ERR

# Проверить и создать файлы лога, если они не существуют
[ ! -f deploy.log ] && touch deploy.log
[ ! -f deploy_status.txt ] && touch deploy_status.txt

# Очистить старые логи
> deploy.log
> deploy_status.txt

# Перейти в корневую директорию проекта (если скрипт запускается не из корневой директории)
cd "$(dirname "$0")/.." || exit

echo "Starting deployment..." >> deploy.log

# Сбросить локальные изменения и подтянуть последние изменения из удаленного репозитория
echo "Resetting local changes..." >> deploy.log
git reset --hard >> deploy.log 2>&1
if [ $? -ne 0 ]; then
    echo "Git reset failed. Exiting." >> deploy.log
    echo "FAILED" > deploy_status.txt
    exit 1
fi

echo "Pulling latest changes from git..." >> deploy.log
git pull >> deploy.log 2>&1
if [ $? -ne 0 ]; then
    echo "Git pull failed. Exiting." >> deploy.log
    echo "FAILED" > deploy_status.txt
    exit 1
fi

# Остановка и удаление текущих контейнеров
echo "Stopping and removing current containers..." >> deploy.log
docker-compose down >> deploy.log 2>&1
if [ $? -ne 0 ]; then
    echo "Failed to stop and remove containers. Exiting." >> deploy.log
    echo "FAILED" > deploy_status.txt
    exit 1
fi

# Проверка состояния контейнеров
echo "Checking container status..." >> deploy.log
docker ps -a >> deploy.log 2>&1

# Очистка остановленных контейнеров
echo "Pruning stopped containers..." >> deploy.log
docker container prune -f >> deploy.log 2>&1
if [ $? -ne 0 ]; then
    echo "Failed to prune stopped containers. Exiting." >> deploy.log
    echo "FAILED" > deploy_status.txt
    exit 1
fi

# Очистка неиспользуемых образов
echo "Pruning unused images..." >> deploy.log
docker image prune -f >> deploy.log 2>&1
if [ $? -ne 0 ]; then
    echo "Failed to prune unused images. Exiting." >> deploy.log
    echo "FAILED" > deploy_status.txt
    exit 1
fi

# Очистка неиспользуемых томов
echo "Pruning unused volumes..." >> deploy.log
docker volume prune -f >> deploy.log 2>&1
if [ $? -ne 0 ]; then
    echo "Failed to prune unused volumes. Exiting." >> deploy.log
    echo "FAILED" > deploy_status.txt
    exit 1
fi

# Очистка неиспользуемых сетей
echo "Pruning unused networks..." >> deploy.log
docker network prune -f >> deploy.log 2>&1
if [ $? -ne 0 ]; then
    echo "Failed to prune unused networks. Exiting." >> deploy.log
    echo "FAILED" > deploy_status.txt
    exit 1
fi

# Очистка всех неиспользуемых ресурсов
echo "Pruning all unused resources..." >> deploy.log
docker system prune -a -f >> deploy.log 2>&1
if [ $? -ne 0 ]; then
    echo "Failed to prune all unused resources. Exiting." >> deploy.log
    echo "FAILED" > deploy_status.txt
    exit 1
fi

# Перезапуск контейнеров с пересборкой образов
echo "Rebuilding and starting containers..." >> deploy.log
docker-compose up --build -d >> deploy.log 2>&1
if [ $? -ne 0 ]; then
    echo "Failed to rebuild and start containers. Exiting." >> deploy.log
    echo "FAILED" > deploy_status.txt
    exit 1
fi

echo "Deployment completed successfully." >> deploy.log
echo "SUCCESS" > deploy_status.txt