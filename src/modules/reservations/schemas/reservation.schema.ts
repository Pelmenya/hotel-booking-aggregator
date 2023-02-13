import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { HotelRoom } from 'src/modules/hotel-rooms/schemas/hotel-room.schema';
import { Hotel } from 'src/modules/hotels/schemas/hotel.schema';
import { User } from 'src/modules/users/schemas/users.schema';
import { IReservation } from '../types/i-reservation';

@Schema()
export class Reservation implements Omit<IReservation, '_id'> {
    @Prop({ required: true, type: MongooseSchema.Types.ObjectId, ref: 'User' })
    public user: User;

    @Prop({ required: true, type: MongooseSchema.Types.ObjectId, ref: 'Hotel' })
    public hotel: Hotel;

    @Prop({
        required: true,
        type: MongooseSchema.Types.ObjectId,
        ref: 'HotelRoom',
    })
    public room: HotelRoom;

    @Prop({ required: true })
    public startDate: Date;

    @Prop({ required: true })
    public endDate: Date;
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);
