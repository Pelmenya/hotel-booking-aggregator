import { ID } from 'src/types/id';
import { Hotel } from '../schemas/hotel.schema';
import { IUpdateHotelParams } from './i-update-hotel-params';
import { SearchBaseParams } from '../../../types/search-base-params';

export interface IHotelService {
    create(dto: Partial<Hotel>): Promise<Hotel>;
    findById(id: ID): Promise<Hotel>;
    search(params: SearchBaseParams): Promise<Hotel[]>;
    update(id: ID, dto: IUpdateHotelParams): Promise<Hotel>;
}
