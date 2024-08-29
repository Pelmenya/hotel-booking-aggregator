import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { User } from 'src/modules/users/schemas/users.schema';
import { IConfirmEmailCode } from '../types/i-confirm-email-code';
import { v4 as uuid4 } from 'uuid';

@Schema()
export class ConfirmEmailCode implements Omit<IConfirmEmailCode, '_id'> {
    @Prop({ required: true, type: MongooseSchema.Types.ObjectId, ref: 'User' })
    public user: User;

    @Prop({
        type: String,
        default: uuid4(),
    })
    public code: MongooseSchema.Types.UUID;

    @Prop({ required: true, default: new Date() })
    public createdAt: Date;
}

export const ConfirmEmailCodeSchema =
    SchemaFactory.createForClass(ConfirmEmailCode);
