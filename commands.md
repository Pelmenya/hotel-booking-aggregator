* docker compose -f docker-compose.dev.yml up --build
* docker compose -f docker-compose.yml up --build
* docker compose up --build
* docker exec -it hotel-aggregator-dev bash

host.docker.internal

# Скрипт для подтягивания изменений из папки cmd. Установка от админа. Обязательно!!!  

* chmod +x  /home/hotel-booking-aggregator/cmd/docker_cleanup_and_restart.sh

# Скрипт для подтягивания изменений из папки cmd. Исполнение на сервере вручную 

* cmd/docker_cleanup_and_restart.sh

* Все IP контейнеров 
    docker inspect -f '{{.Name}} - {{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' $(docker ps -q)

### Dump BD
``` cmd
docker exec -i postgres_postgis /bin/bash -c "PGPASSWORD=secret pg_dump --username postgres aggregator" > ./dump/dump_24_01_25_prod.sql
```

### Restore BD
``` cmd
docker exec -i postgres_postgis /bin/bash -c "PGPASSWORD=secret psql --username postgres aggregator" < ./dump/dump_24_01_25_prod.sql
```
# Подключаемся к контейнеру
docker exec -it postgres_postgis /bin/bash

# Входим в psql под пользователем postgres
PGPASSWORD=secret psql --username postgres

# Удаляем существующую базу данных
DROP DATABASE IF EXISTS aggregator;

# Создаем новую базу данных
CREATE DATABASE aggregator;

# Выходим из psql
\q

# Восстанавливаем базу данных из дампа
cat ./dump/dump_18_12_24_v1_prod_fix_locations.sql | docker exec -i postgres_postgis /bin/bash -c "PGPASSWORD=secret psql --username postgres aggregator"

docker exec hotel-aggregator-dev npm run migration:create --name=TestMigration
docker exec hotel-aggregator-dev npm run migration:revert
docker exec hotel-aggregator-dev npm run migration:run