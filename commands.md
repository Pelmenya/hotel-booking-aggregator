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
docker exec -i postgres_postgis_parser /bin/bash -c "PGPASSWORD=secret pg_dump --username postgres aggregator" > ./dump/dump_16_12_24_v1_prod.sql
```

### Restore BD
``` cmd
docker exec -i postgres_postgis /bin/bash -c "PGPASSWORD=secret psql --username postgres aggregator" < ./dump/dump_16_12_24_v1_prod.sql
```
# 