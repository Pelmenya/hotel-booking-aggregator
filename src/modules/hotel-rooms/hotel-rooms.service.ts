import { Injectable } from '@nestjs/common';
import { ID } from 'src/types/id';
import { IHotelRoom } from './types/i-hotel-room';
import { IHotelRoomsService } from './types/i-hotel-rooms-service';
import { ISearchRoomsParams } from './types/i-search-rooms-params';

const room: IHotelRoom = {
    _id: 'ddd',
    hotel: 'fff',
    createAt: new Date(),
    updateAt: new Date(),
    isEnabled: true,
};

@Injectable()
export class HotelRoomsService implements IHotelRoomsService {
    create(dto: Partial<IHotelRoom>): Promise<IHotelRoom> {
        return Promise.resolve(room);
    }

    findById(id: ID): Promise<IHotelRoom> {
        return Promise.resolve(room);
    }

    search(params: ISearchRoomsParams): Promise<IHotelRoom[]> {
        return Promise.resolve([room]);
    }

    update(id: ID, dto: Partial<IHotelRoom>): Promise<IHotelRoom> {
        return Promise.resolve(room);
    }
}
