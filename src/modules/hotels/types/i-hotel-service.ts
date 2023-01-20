import { ID } from 'src/types/id';
import { Hotel } from '../schemas/hotel.schema';
import { ISearchHotelParams } from './i-search-hotel-params';
import { IUpdateHotelParams } from './i-update-hotel-params';

export interface IHotelService {
    create(data: Partial<Hotel>): Promise<Hotel>;
    findById(id: ID): Promise<Hotel>;
    search(params: ISearchHotelParams): Promise<Hotel[]>;
    update(id: ID, data: IUpdateHotelParams): Promise<Hotel>;
}
