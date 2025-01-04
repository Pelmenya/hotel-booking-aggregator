import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { join } from 'path';

config();

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'host.docker.internal',
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
