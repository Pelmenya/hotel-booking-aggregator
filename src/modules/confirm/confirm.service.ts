import { BadRequestException, Injectable } from '@nestjs/common';
import { IUser } from '../users/types/i-user';
import { InjectModel } from '@nestjs/mongoose';
import { ConfirmEmailCode } from './schemas/confirm-email-code';
import { TConfirmEmailCodeDocument } from './types/t-confirm-email-code-document';
import { Model } from 'mongoose';
import { v4 as uuid4, NIL as NIL_UUID } from 'uuid';
import { MailService } from '../mail/mail.service';
import { CreateConfirmEmailCodeDto } from './types/create-confirm-email-code.dto';
import { ID } from 'src/types/id';
import { UsersService } from '../users/users.service';
import {
    countNumPhoneCode,
    ERRORS_CONFIRM,
    onceTimeEmail,
    onceTimeSms,
} from './confirm.constants';
import { TConfirmSmsCodeDocument } from './types/t-confirm-sms-code-document';
import { ConfirmSmsCode } from './schemas/confirm-sms-code';
import { SmsService } from '../sms/sms.service';
import { generateConfirmationCode } from 'src/functions/generate-confirmation-code';
import { CreateConfirmSmsCodeDto } from './types/create-confirm-sms-code';
import { TSuccess } from 'src/types/t-success';

@Injectable()
export class ConfirmService {
    constructor(
        @InjectModel(ConfirmEmailCode.name)
        private ConfirmEmailCodeModel: Model<TConfirmEmailCodeDocument>,
        @InjectModel(ConfirmSmsCode.name)
        private ConfirmSmsCodeModel: Model<TConfirmSmsCodeDocument>,
        private readonly mailService: MailService,
        private readonly smsService: SmsService,
        private readonly usersService: UsersService,
    ) {}

    async createOrUpdateEmailCode(
        req: Request & { user: IUser },
    ): Promise<TSuccess> {
        const user = req.user;
        if (user.emailIsConfirm) {
            throw new BadRequestException(
                ERRORS_CONFIRM.EMAIL_ALREDY_CONFIRMED,
            );
        }

        let confirm = await this.ConfirmEmailCodeModel.findOne({
            user: user._id,
        });

        if (!confirm) {
            const newConfirm = await this.ConfirmEmailCodeModel.create({
                user: user._id,
                code: uuid4(),
            });
            await this.mailService.sendUserConfirmationEmail(
                { name: user.name, email: user.email },
                newConfirm.code,
            );
            return { success: true };
        } else {
            // Ограничение по времени отправки email
            const now = new Date();
            if (
                confirm &&
                now.getTime() - new Date(confirm.updatedAt).getTime() <
                    onceTimeEmail
            ) {
                throw new BadRequestException(ERRORS_CONFIRM.EMAIL_LIMIT);
            }
            await this.ConfirmEmailCodeModel.updateOne(
                { user: user._id },
                { code: uuid4(), updatedAt: new Date() },
            );

            confirm = await this.ConfirmEmailCodeModel.findOne({
                user: user._id,
            });

            await this.mailService.sendUserConfirmationEmail(
                { name: user.name, email: user.email },
                confirm.code,
            );
        }

        return { success: true };
    }

    async confirmEmail(
        userId: ID,
        dto: CreateConfirmEmailCodeDto,
    ): Promise<{ success: boolean }> {
        const { code } = dto;
        const confirm = await this.ConfirmEmailCodeModel.findOne({
            user: userId,
        });
        if (code === confirm.code) {
            const updateUser = await this.usersService.updateUser(userId, [], {
                emailIsConfirm: true,
            });
            if (updateUser.emailIsConfirm) {
                await this.ConfirmEmailCodeModel.findByIdAndUpdate(
                    { _id: confirm._id },
                    { code: NIL_UUID, updatedAt: new Date() },
                );
                return { success: true };
            }
        }
        throw new BadRequestException(ERRORS_CONFIRM.NOT_UPDATE_CONFRIM);
    }

    async createOrUpdateSmsCode(
        req: Request & { user: IUser },
    ): Promise<TSuccess> {
        const user = req.user;

        await this.smsService.validatePhone(user.contactPhone);

        if (user.phoneIsConfirm) {
            throw new BadRequestException(
                ERRORS_CONFIRM.PHONE_ALREDY_CONFIRMED,
            );
        }

        let confirm = await this.ConfirmSmsCodeModel.findOne({
            user: user._id,
        });

        if (!confirm) {
            const newConfirm = await this.ConfirmSmsCodeModel.create({
                user: user._id,
                code: generateConfirmationCode(countNumPhoneCode),
            });

            await this.smsService.sendUserConfirmationSms(
                user.contactPhone,
                newConfirm.code,
            );
            return { success: true };
        } else {
            // Ограничение по времени отправки sms
            const now = new Date();
            if (
                confirm &&
                now.getTime() - new Date(confirm.updatedAt).getTime() <
                    onceTimeSms
            ) {
                throw new BadRequestException(ERRORS_CONFIRM.SMS_LIMIT);
            }
            await this.ConfirmSmsCodeModel.updateOne(
                { user: user._id },
                {
                    code: generateConfirmationCode(countNumPhoneCode),
                    updatedAt: new Date(),
                },
            );
            confirm = await this.ConfirmSmsCodeModel.findOne({
                user: user._id,
            });

            await this.smsService.sendUserConfirmationSms(
                user.contactPhone,
                confirm.code,
            );
        }

        return { success: true };
    }

    async confirmSms(
        userId: ID,
        dto: CreateConfirmSmsCodeDto,
    ): Promise<TSuccess> {
        const { code } = dto;
        const confirm = await this.ConfirmSmsCodeModel.findOne({
            user: userId,
        });
        console.log(Number(code) === confirm.code);
        if (Number(code) === confirm.code) {
            const updateUser = await this.usersService.updateUser(userId, [], {
                phoneIsConfirm: true,
            });
            if (updateUser.phoneIsConfirm) {
                await this.ConfirmSmsCodeModel.findByIdAndUpdate(
                    { _id: confirm._id },
                    { code: 0, updatedAt: new Date() },
                );
                return { success: true };
            }
        }
        throw new BadRequestException(ERRORS_CONFIRM.NOT_UPDATE_CONFRIM);
    }
}
