import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ID } from 'src/types/id';
import { IHotelRoom } from '../types/i-hotel-room';

@Schema()
export class HotelRoom implements Omit<IHotelRoom, '_id'> {
    @Prop({ type: String, required: true })
    public hotel: ID;

    @Prop()
    public description: string;

    @Prop({ type: [String] })
    public images: string[];

    @Prop({ required: true })
    public createAt: Date;

    @Prop({ required: true })
    public updateAt: Date;

    @Prop({ type: Boolean, required: true, default: true })
    public isEnabled: boolean;
}

export const HotelRoomsSchema = SchemaFactory.createForClass(HotelRoom);
