import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { ValidationPipe } from './pipes/validation/validation.pipe';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import * as passport from 'passport';
import { RolesGuard } from './guards/roles.guard';

declare const module: any;

const secret = process.env.SECRET || 'cookie-secret';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.setGlobalPrefix('api');
    app.enableCors();
    app.use(cookieParser());
    app.useGlobalPipes(new ValidationPipe());
    app.use(
        session({
            secret,
            resave: true,
            saveUninitialized: true,
        }),
    );
    app.use(passport.initialize());
    app.use(passport.session());

    await app.listen(3000);

    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }
}
bootstrap();
