import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { ValidationPipe } from './pipes/validation/validation.pipe';
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

    app.setGlobalPrefix('api');
    // обязательно для проставления cookie
    app.enableCors({
        origin: true,
        credentials: true,
        optionsSuccessStatus: 200,
    });
    app.use(cookieParser());
    app.useGlobalPipes(new ValidationPipe());
    app.use(sessionMiddleware);
    app.use(passport.initialize());
    app.use(passport.session());
    app.useWebSocketAdapter(new SessionAdapter(sessionMiddleware, app));

    await app.listen(process.env.PORT || 3000);
    // dev режим
    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }
}
bootstrap();
