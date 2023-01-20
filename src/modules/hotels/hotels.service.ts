import { Injectable } from '@nestjs/common';
import { ID } from 'src/types/id';
import { Hotel } from './schemas/hotel.schema';
import { IHotelService } from './types/i-hotel-service';
import { ISearchHotelParams } from './types/i-search-hotel-params';
import { IUpdateHotelParams } from './types/i-update-hotel-params';

const hotel = {
    _id: 'sdf',
    title: 'string',
    description: 'string',
    createAt: new Date(),
    updateAt: new Date(),
};

@Injectable()
export class HotelsService implements IHotelService {
    create(data: Partial<Hotel>): Promise<Hotel> {
        return Promise.resolve(hotel);
    }

    findById(id: ID): Promise<Hotel> {
        return Promise.resolve(hotel);
    }

    search(params: ISearchHotelParams): Promise<Hotel[]> {
        return Promise.resolve([hotel]);
    }

    update(id: ID, data: IUpdateHotelParams): Promise<Hotel> {
        return Promise.resolve(hotel);
    }
}
