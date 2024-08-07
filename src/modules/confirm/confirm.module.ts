import { Module } from '@nestjs/common';
import { ConfirmController } from './confirm.controller';
import { ConfirmService } from './confirm.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
    ConfirmEmailCode,
    ConfirmEmailCodeSchema,
} from './schemas/confirm-email-code';
import { MailModule } from '../mail/mail.module';
import { UsersModule } from '../users/users.module';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: ConfirmEmailCode.name, schema: ConfirmEmailCodeSchema },
        ]),
        MailModule,
        UsersModule,
    ],
    controllers: [ConfirmController],
    providers: [ConfirmService],
    exports: [ConfirmService],
})
export class ConfirmModule {}
