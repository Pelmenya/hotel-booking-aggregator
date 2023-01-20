import { Module } from '@nestjs/common';
import { HotelRoomsService } from './hotel-rooms.service';

@Module({
    providers: [HotelRoomsService],
})
export class HotelRoomsModule {}
