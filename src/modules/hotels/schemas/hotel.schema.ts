import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HotelData } from '../types/hotel-data';

@Schema()
export class Hotel implements Omit<HotelData, '_id'> {
    @Prop({ required: true, unique: true })
    public title: string;

    @Prop()
    public description: string;

    @Prop({ type: [Number], default: [] })
    public coordinates: number[];

    @Prop({ type: [String], default: [] })
    public images: string[];

    @Prop({ required: true, default: new Date().toISOString() })
    public createAt: Date;

    @Prop({ required: true, default: new Date().toISOString() })
    public updateAt: Date;
}

export const HotelsSchema = SchemaFactory.createForClass(Hotel);
