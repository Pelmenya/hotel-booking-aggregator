import { Injectable } from '@nestjs/common';
import { IUser } from '../users/types/i-user';
import { InjectModel } from '@nestjs/mongoose';
import { ConfirmEmailCode } from './schemas/confirm-email-code';
import { TConfirmEmailCodeDocument } from './types/t-confirm-email-code-document';
import { Model } from 'mongoose';
import { v4 as uuid4 } from 'uuid';
import { MailService } from '../mail/mail.service';

@Injectable()
export class ConfirmService {
    constructor(
        @InjectModel(ConfirmEmailCode.name)
        private ConfirmEmailCodeModel: Model<TConfirmEmailCodeDocument>,
        private readonly mailService: MailService,
    ) {}

    async createOrUpdateEmailCode(req: Request & { user: IUser }) {
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
            return newConfirm;
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
        return confirm;
    }
}
