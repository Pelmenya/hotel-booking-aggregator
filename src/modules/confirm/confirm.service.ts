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
import { ERRORS_CONFIRM } from './confirm.constants';
import { TConfirmSmsCodeDocument } from './types/t-confirm-sms-code-document';
import { ConfirmSmsCode } from './schemas/confirm-sms-code';
import { SmsService } from '../sms/sms.service';

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
    ): Promise<{ succes: boolean }> {
        const user = req.user;
        let confirm = await this.ConfirmEmailCodeModel.findOne({
            user: user._id,
        });

        if (!confirm) {
            const newConfirm = await this.ConfirmEmailCodeModel.create({
                user: user._id,
            });
            await this.mailService.sendUserConfirmationEmail(
                { name: user.name, email: user.email },
                newConfirm.code,
            );
            return { succes: true };
        } else {
            await this.ConfirmEmailCodeModel.updateOne(
                { user: user._id },
                { code: uuid4() },
            );
        }

        confirm = await this.ConfirmEmailCodeModel.findOne({
            user: user._id,
        });

        await this.mailService.sendUserConfirmationEmail(
            { name: user.name, email: user.email },
            confirm.code,
        );

        return { succes: true };
    }

    async confirmEmail(
        userId: ID,
        dto: CreateConfirmEmailCodeDto,
    ): Promise<{ succes: boolean }> {
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
                    { code: NIL_UUID },
                );
                return { succes: true };
            }
        }
        throw new BadRequestException(ERRORS_CONFIRM.NOT_UPDATE_CONFRIM);
    }

    async createOrUpdateSmsCode(
        req: Request & { user: IUser },
    ): Promise<{ succes: boolean }> {
        const user = req.user;
        let confirm = await this.ConfirmSmsCodeModel.findOne({
            user: user._id,
        });

        if (!confirm) {
            const newConfirm = await this.ConfirmSmsCodeModel.create({
                user: user._id,
            });
            return {
                succes: await this.smsService.validatePhone(user.contactPhone),
            };
        } else {
            await this.ConfirmEmailCodeModel.updateOne(
                { user: user._id },
                { code: uuid4() },
            );
        }

        confirm = await this.ConfirmEmailCodeModel.findOne({
            user: user._id,
        });

        return { succes: true };
    }
}
