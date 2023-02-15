import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { User } from 'src/modules/users/schemas/users.schema';
import { IMessage } from '../types/i-message';

@Schema()
export class Message implements Omit<IMessage, '_id'> {
    @Prop({ required: true, type: MongooseSchema.Types.ObjectId, ref: 'User' })
    public author: User;

    @Prop({ required: true, type: Date, default: new Date().toISOString() })
    public sentAt: Date;

    @Prop({ type: String, required: true })
    public text: string;

    @Prop()
    public readAt: Date;
}

export const MessagesSchema = SchemaFactory.createForClass(Message);
