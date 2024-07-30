import { Injectable } from '@nestjs/common';
import { IUser } from '../users/types/i-user';
import { InjectModel } from '@nestjs/mongoose';
import { ConfirmEmailCode } from './schemas/confirm-email-code';
import { TConfirmEmailCodeDocument } from './types/t-confirm-email-code-document';
import { Model } from 'mongoose';
import { v4 as uuid4 } from 'uuid';

@Injectable()
export class ConfirmService {
    constructor(
        @InjectModel(ConfirmEmailCode.name)
        private ConfirmEmailCodeModel: Model<TConfirmEmailCodeDocument>,
    ) {}

    async createEmailCode(req: Request & { user: IUser }) {
        const user = req.user;
        const confirm = await this.ConfirmEmailCodeModel.findOne({
            user: user._id,
        });

        if (!confirm) {
            return await this.ConfirmEmailCodeModel.create({
                user: user._id,
            });
        } else {
            await this.ConfirmEmailCodeModel.updateOne(
                { user: user._id },
                { code: uuid4() },
            );
        }

        return await this.ConfirmEmailCodeModel.findOne({
            user: user._id,
        });
    }
}
