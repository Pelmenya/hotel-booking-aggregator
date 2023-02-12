import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Hotel } from 'src/modules/hotels/schemas/hotel.schema';
import { IHotelRoom } from '../types/i-hotel-room';

@Schema()
export class HotelRoom implements Omit<IHotelRoom, '_id'> {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Hotel' })
    public hotel: Hotel;

    @Prop()
    public description: string;

    @Prop({ type: [String] })
    public images: string[];

    @Prop({ required: true, default: new Date() })
    public createAt: Date;

    @Prop({ required: true, default: new Date() })
    public updateAt: Date;

    @Prop({ type: Boolean, required: true, default: true })
    public isEnabled: boolean;
}

export const HotelRoomsSchema = SchemaFactory.createForClass(HotelRoom);
