import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { ValidationPipe, BadRequestException } from '@nestjs/common'; // Обязательно добавьте BadRequestException
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import * as passport from 'passport';
import { SessionAdapter } from './modules/auth/session-adapter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';
import * as path from 'path';
import * as winston from 'winston';
import { WinstonModule } from 'nest-winston';

declare const module: any;

const secret = process.env.SECRET || 'cookie-secret';

const sessionMiddleware = session({
    secret,
    resave: true,
    saveUninitialized: true,
});

async function bootstrap() {
    const instanceId = process.env.INSTANCE_ID || 'default';
    const logsDir = path.join(__dirname, 'logs');
    if (!fs.existsSync(logsDir)) {
        fs.mkdirSync(logsDir);
    }
    const logger = winston.createLogger({
        level: 'info',
        format: winston.format.combine(
            winston.format.colorize(), // Добавляем цвет
            winston.format.label({ label: `Instance: ${instanceId}` }),
            winston.format.timestamp(),
            winston.format.printf(({ timestamp, level, message, label }) => {
                return `[${timestamp}] [${label}] ${level}: ${message}`;
            }),
        ),
        transports: [
            new winston.transports.File({
                filename: `${logsDir}/error-${instanceId}.log`,
                level: 'error',
            }),
            new winston.transports.Console(),
        ],
    });

    process.on('uncaughtException', (err) => {
        logger.error(`Uncaught Exception: ${err.stack}`);
        process.exit(1);
    });

    process.on('unhandledRejection', (reason, promise) => {
        logger.error(
            `Unhandled Rejection at: ${promise}, reason: ${
                reason instanceof Error ? reason.stack : reason
            }`,
        );
    });

    const app = await NestFactory.create(AppModule, {
        logger: WinstonModule.createLogger({
            instance: logger,
        }),
    });

    // Глобальный префикс для всех маршрутов API
    app.setGlobalPrefix('api');

    // Настройте CORS для работы с кросс-доменными запросами
    app.enableCors({
        origin: true,
        credentials: true,
        optionsSuccessStatus: 200,
    });

    // Использование cookie-parser
    app.use(cookieParser());

    // Глобальная настройка ValidationPipe с логированием ошибок
    app.useGlobalPipes(
        new ValidationPipe({
            exceptionFactory: (errors) => {
                console.log(errors);
                return new BadRequestException(errors);
            },
        }),
    );

    // Настройка сессий и Passport.js для аутентификации
    app.use(sessionMiddleware);
    app.use(passport.initialize());
    app.use(passport.session());

    // Настройка WebSocket адаптера с поддержкой сессий
    app.useWebSocketAdapter(new SessionAdapter(sessionMiddleware, app));

    // Настройка Swagger
    const config = new DocumentBuilder()
        .setTitle('Hotel Aggregator API')
        .setDescription('API documentation for Hotel Aggregator')
        .setVersion('1.0')
        .addCookieAuth('connect.sid') // Указание на использование куки для аутентификации
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);

    // Запуск приложения на заданном порту
    await app.listen(process.env.PORT || 3000);

    // Поддержка горячей перезагрузки (Hot Module Replacement) для режима разработки
    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }
}
bootstrap();
