import { ID } from 'src/types/id';
import { CreateHotelRoomDto } from './create-hotel-room.dto';
import { IHotelRoom } from './i-hotel-room';
import { SearchRoomsParams } from './search-rooms-params';

export interface IHotelRoomsService {
    create(dto: CreateHotelRoomDto): Promise<IHotelRoom>;
    findById(id: ID): Promise<IHotelRoom>;
    search(params: SearchRoomsParams): Promise<IHotelRoom[]>;
    update(id: ID, dto: Partial<IHotelRoom>): Promise<IHotelRoom>;
}
