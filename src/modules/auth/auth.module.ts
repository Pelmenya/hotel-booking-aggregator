import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local-strategy';
import { SessionSerializer } from './session-serializer';
import { MongooseModule } from '@nestjs/mongoose';
import {
    ConfirmEmailCode,
    ConfirmEmailCodeSchema,
} from '../confirm/schemas/confirm-email-code';

@Module({
    imports: [
        PassportModule.register({
            session: true,
        }),
        MongooseModule.forFeature([
            { name: ConfirmEmailCode.name, schema: ConfirmEmailCodeSchema },
        ]),
        UsersModule,
    ],
    providers: [AuthService, LocalStrategy, SessionSerializer],
    controllers: [AuthController],
    exports: [PassportModule, AuthService, LocalStrategy, SessionSerializer],
})
export class AuthModule {}
