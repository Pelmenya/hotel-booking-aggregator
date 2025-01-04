import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { join } from 'path';

config();

const isLocal = process.env.IS_LOCAL === 'true';

console.log(isLocal);

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: isLocal ? process.env.LOCAL_POSTGRES_HOST : process.env.POSTGRES_HOST, // Используем локальный или Docker хост
    port: parseInt(process.env.POSTGRES_PORT, 10),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    synchronize: false, // Отключаем, чтобы использовать миграции
    migrationsRun: false, // Отключаем автоматический запуск миграций
    logging: true, // Полезно для отладки
    entities: ['/src/**/*.entity{.ts,.js}'],
    migrations: [join(__dirname, 'src/migrations/*{.ts,.js}')],
});
