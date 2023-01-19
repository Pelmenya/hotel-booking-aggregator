import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IHotel } from '../types/i-hotel';

@Schema()
export class Hotel implements Omit<IHotel, '_id'> {
    @Prop({ required: true })
    public title: string;

    @Prop()
    public description: string;

    @Prop({ required: true })
    public createAt: Date;

    @Prop({ required: true })
    public updateAt: Date;
}

export const HotelsSchema = SchemaFactory.createForClass(Hotel);
