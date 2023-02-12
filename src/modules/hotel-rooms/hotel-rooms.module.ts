import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Hotel, HotelsSchema } from '../hotels/schemas/hotel.schema';
import { HotelRoomsService } from './hotel-rooms.service';
import { HotelRoom, HotelRoomsSchema } from './schemas/hotel-room.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: HotelRoom.name, schema: HotelRoomsSchema },
            { name: Hotel.name, schema: HotelsSchema },
        ]),
    ],
    providers: [HotelRoomsService],
    exports: [HotelRoomsService],
})
export class HotelRoomsModule {}
