import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { ValidationPipe, BadRequestException } from '@nestjs/common'; // Обязательно добавьте BadRequestException
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import * as passport from 'passport';
import { SessionAdapter } from './modules/auth/session-adapter';

declare const module: any;

const secret = process.env.SECRET || 'cookie-secret';

const sessionMiddleware = session({
    secret,
    resave: true,
    saveUninitialized: true,
});

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

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

    // Запуск приложения на заданном порту
    await app.listen(process.env.PORT || 3000);

    // Поддержка горячей перезагрузки (Hot Module Replacement) для режима разработки
    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }
}
bootstrap();
