import { Module } from '@nestjs/common';
import { ConfirmController } from './confirm.controller';
import { ConfirmService } from './confirm.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
    ConfirmEmailCode,
    ConfirmEmailCodeSchema,
} from './schemas/confirm-email-code';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: ConfirmEmailCode.name, schema: ConfirmEmailCodeSchema },
        ]),
    ],
    controllers: [ConfirmController],
    providers: [ConfirmService],
    exports: [ConfirmService],
})
export class ConfirmModule {}
