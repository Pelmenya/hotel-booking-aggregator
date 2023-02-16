import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { User } from 'src/modules/users/schemas/users.schema';
import { ISupportRequest } from '../types/i-request-support';
import { Message } from './message';

@Schema()
export class SupportRequest implements Omit<ISupportRequest, '_id'> {
    @Prop({ required: true, type: MongooseSchema.Types.ObjectId, ref: 'User' })
    public user: User;

    @Prop({ required: true, type: Date, default: new Date() })
    public createAt: Date;

    @Prop({ type: MongooseSchema.Types.Array })
    public messages: [Message];

    @Prop({ type: Boolean, default: true })
    public isActive: boolean;
}

export const SupportRequestSchema =
    SchemaFactory.createForClass(SupportRequest);
