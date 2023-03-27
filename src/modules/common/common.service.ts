import { Injectable } from '@nestjs/common';
import { ID } from 'src/types/id';
import { HotelRoomsService } from '../hotel-rooms/hotel-rooms.service';
import { HotelRoomDataRes } from '../hotel-rooms/types/hotel-room-data-res';
import { SearchRoomsParams } from '../hotel-rooms/types/search-rooms-params';
import { HotelsService } from '../hotels/hotels.service';
import { HotelData } from '../hotels/types/hotel-data';
import { SearchHotelParams } from '../hotels/types/search-hotel-params';

@Injectable()
export class CommonService {
    constructor(
        private readonly hotelRoomsService: HotelRoomsService,
        private readonly hotelsService: HotelsService,
    ) {}

    async getHotels(params: SearchHotelParams): Promise<HotelData[]> {
        return await this.hotelsService.search(params);
    }

    async getHotelRooms(
        params: SearchRoomsParams,
    ): Promise<HotelRoomDataRes[]> {
        return this.hotelRoomsService.search(params);
    }

    async getHotelRoom(id: ID): Promise<HotelRoomDataRes> {
        return this.hotelRoomsService.findById(id);
    }
}
