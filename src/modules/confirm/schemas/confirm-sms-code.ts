import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { User } from 'src/modules/users/schemas/users.schema';
import { IConfirmSmsCode } from '../types/i-confirm-sms-code';
import { generateConfirmationCode } from 'src/functions/generate-confirmation-code';
import { countNumPhoneCode } from '../confirm.constants';

@Schema()
export class ConfirmSmsCode implements Omit<IConfirmSmsCode, '_id'> {
    @Prop({ required: true, type: MongooseSchema.Types.ObjectId, ref: 'User' })
    public user: User;

    @Prop({
        type: Number,
        default: generateConfirmationCode(countNumPhoneCode),
    })
    public code: number;

    @Prop({ required: true, default: new Date() })
    public createdAt: Date;

    @Prop({ required: true, default: new Date() })
    public updatedAt: Date;
}

export const ConfirmEmailSmsSchema =
    SchemaFactory.createForClass(ConfirmSmsCode);
