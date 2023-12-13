* docker compose -f docker-compose.dev.yml up --build
* docker compose -f docker-compose.yml up --build
* docker compose up --build
* docker exec -it hotel-aggregator bash

## Дамп БД get
Запустить скрипт в корне проекта 

```json

docker exec hotel-booking-aggregator-mongo-1 sh -c 'mongodump --archive -u root -p example'  > ./mongodumps/dump_$(date '+%d-%m-%Y_%H-%M-%S').gz
```
Скопировать дамп на сервер 

## Дамп БД restore
Запустить скрипт в корне проекта на сервере 

```json

docker exec -i hotel-booking-aggregator-mongo-1 sh -c 'mongorestore --archive -u root -p example' < ./mongodumps/dump_15-09-2023_18-02-10.gz

docker exec --env-file .env hotel-booking-aggregator-mongo-1 sh -c 'mongodump --archive -u ${MONGO_INITDB_ROOT_USERNAME} -p ${MONGO_INITDB_ROOT_PASSWORD}' > ./mongodumps/dump_$(date '+%d-%m-%Y_%H-%M-%S').gz
```

## Дамп БД restore
* docker exec hotel-booking-aggregator-mongo-1 sh -c 'mongorestore --archive -u root -p example'  < ./mongodumps/dump_$(date '+%d-%m-%Y_%H-%M-%S').gz
* docker exec -i defymongo sh -c 'mongorestore --archive -u {{mongouser}} -p {{mongopass}}' < ./mongodumps/dump_$(date '+%d-%m-%Y_%H-%M-%S').gz

