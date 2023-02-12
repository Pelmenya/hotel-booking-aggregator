import { ID } from 'src/types/id';
import { CreateHotelRoomDto } from './create-hotel-room.dto';
import { HotelRoomDataRes } from './hotel-room-data-res';
import { SearchRoomsParams } from './search-rooms-params';

export interface IHotelRoomsService {
    create(dto: CreateHotelRoomDto): Promise<HotelRoomDataRes>;
    findOne(id: ID): Promise<HotelRoomDataRes>;
    findById(id: ID): Promise<HotelRoomDataRes>;
    search(params: SearchRoomsParams): Promise<HotelRoomDataRes[]>;
    update(id: ID, dto: Partial<CreateHotelRoomDto>): Promise<HotelRoomDataRes>;
}
