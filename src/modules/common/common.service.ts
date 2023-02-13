import { Injectable } from '@nestjs/common';
import { ID } from 'src/types/id';
import { HotelRoomsService } from '../hotel-rooms/hotel-rooms.service';
import { HotelRoomDataRes } from '../hotel-rooms/types/hotel-room-data-res';
import { SearchRoomsParams } from '../hotel-rooms/types/search-rooms-params';

@Injectable()
export class CommonService {
    constructor(private readonly hotelRoomsService: HotelRoomsService) {}

    async getHotelRooms(query: SearchRoomsParams): Promise<HotelRoomDataRes[]> {
        return this.hotelRoomsService.search(query);
    }

    async getHotelRoom(id: ID): Promise<HotelRoomDataRes> {
        return this.hotelRoomsService.findById(id);
    }
}
