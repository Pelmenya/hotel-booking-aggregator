import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IUser } from '../types/i-user';
import { TRole } from '../types/t-role';

@Schema()
export class User implements Omit<IUser, '_id'> {
    @Prop({ type: String, required: true, unique: true })
    public email: string;

    @Prop({ type: Boolean, default: false })
    public emailIsConfirm: boolean;

    @Prop({ type: Boolean, default: false })
    public phoneIsConfirm: boolean;

    @Prop({ required: true })
    public passwordHash: string;

    @Prop({ required: true })
    public name: string;

    @Prop()
    public contactPhone: string;

    @Prop()
    public company: string;

    @Prop()
    public gender: 'male' | 'female';

    @Prop()
    public birthday: Date;

    @Prop()
    public address: string;

    @Prop({ type: [String], default: [] })
    public avatars: string[];

    @Prop({
        type: String,
        default: 'client',
    })
    public role: TRole;
}

export const UsersSchema = SchemaFactory.createForClass(User);
