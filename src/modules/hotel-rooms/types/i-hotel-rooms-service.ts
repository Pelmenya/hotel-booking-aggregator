import { ID } from 'src/types/id';
import { IHotelRoom } from './i-hotel-room';
import { ISearchRoomsParams } from './i-search-rooms-params';

export interface IHotelRoomsService {
    create(dto: Partial<IHotelRoom>): Promise<IHotelRoom>;
    findById(id: ID): Promise<IHotelRoom>;
    search(params: ISearchRoomsParams): Promise<IHotelRoom[]>;
    update(id: ID, dto: Partial<IHotelRoom>): Promise<IHotelRoom>;
}
