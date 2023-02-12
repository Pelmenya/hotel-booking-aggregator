import { ID } from 'src/types/id';
import { CreateHotelRoomDto } from './create-hotel-room.dto';
import { HotelRoomDataRes } from './hotel-room-data-res';
import { IHotelRoom } from './i-hotel-room';
import { SearchRoomsParams } from './search-rooms-params';

export interface IHotelRoomsService {
    create(dto: CreateHotelRoomDto): Promise<HotelRoomDataRes>;
    findById(id: ID): Promise<HotelRoomDataRes>;
    search(params: SearchRoomsParams): Promise<HotelRoomDataRes[]>;
    update(id: ID, dto: Partial<IHotelRoom>): Promise<HotelRoomDataRes>;
}
