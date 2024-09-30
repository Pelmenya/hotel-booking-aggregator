* docker compose -f docker-compose.dev.yml up --build
* docker compose -f docker-compose.yml up --build
* docker compose up --build
* docker exec -it hotel-aggregator-dev bash

# Скрипт для подтягивания изменений из папки cmd. Установка от админа.  

* chmod +x cmd/docker_cleanup_and_restart.sh

# Скрипт для подтягивания изменений из папки cmd. Исполнение

* cmd/docker_cleanup_and_restart.sh