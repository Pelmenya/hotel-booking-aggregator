* docker compose -f docker-compose.dev.yml up --build
* docker compose up --build
* docker exec -it hotel-aggregator bash

## Дамп БД get
```json

docker exec hotel-booking-aggregator-mongo-1 sh -c 'mongodump --archive -u root -p example'  > ./mongodumps/dump_$(date '+%d-%m-%Y_%H-%M-%S').gz
```

## Дамп БД restore
```json
создать папку dump

docker exec -i hotel-booking-aggregator-mongo-1 sh -c 'mongorestore --archive -u root -p example' < ./mongodumps/dump_06-09-2023_14-32-39.gz

docker exec --env-file .env hotel-booking-aggregator-mongo-1 sh -c 'mongodump --archive -u ${MONGO_INITDB_ROOT_USERNAME} -p ${MONGO_INITDB_ROOT_PASSWORD}' > ./mongodumps/dump_$(date '+%d-%m-%Y_%H-%M-%S').gz
```

## Дамп БД restore
* docker exec hotel-booking-aggregator-mongo-1 sh -c 'mongorestore --archive -u root -p example'  < ./mongodumps/dump_$(date '+%d-%m-%Y_%H-%M-%S').gz
* docker exec -i defymongo sh -c 'mongorestore --archive -u {{mongouser}} -p {{mongopass}}' < ./mongodumps/dump_$(date '+%d-%m-%Y_%H-%M-%S').gz

