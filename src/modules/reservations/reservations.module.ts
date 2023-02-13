import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Reservation, ReservationSchema } from './schemas/reservation.schema';
import { HotelRoomsModule } from '../hotel-rooms/hotel-rooms.module';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Reservation.name,
                schema: ReservationSchema,
            },
        ]),
    ],
    providers: [ReservationsService],
    controllers: [ReservationsController],
    exports: [ReservationsService],
})
export class ReservationsModule {}
