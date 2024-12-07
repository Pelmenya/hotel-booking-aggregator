* docker compose -f docker-compose.dev.yml up --build
* docker compose -f docker-compose.yml up --build
* docker compose up --build
* docker exec -it hotel-aggregator-dev bash

# Скрипт для подтягивания изменений из папки cmd. Установка от админа. Обязательно!!!  

* chmod +x  /home/hotel-booking-aggregator/cmd/docker_cleanup_and_restart.sh

# Скрипт для подтягивания изменений из папки cmd. Исполнение на сервере вручную 

* cmd/docker_cleanup_and_restart.sh

* Все IP контейнеров 
    docker inspect -f '{{.Name}} - {{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' $(docker ps -q)

* new