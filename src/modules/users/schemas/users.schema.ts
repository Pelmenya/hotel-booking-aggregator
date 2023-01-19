import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IUser } from '../types/i-user';
import { TRole } from '../types/t-role';

@Schema()
export class User implements Omit<IUser, '_id'> {
    @Prop({ required: true, unique: true })
    public email: string;

    @Prop({ required: true })
    public passwordHash: string;

    @Prop({ required: true })
    public name: string;

    @Prop()
    public phone: string;

    @Prop({
        type: String,
        default: 'client',
    })
    public role: TRole;
}

export const UsersSchema = SchemaFactory.createForClass(User);
