import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { ID } from 'src/types/id';
import { CreateHotelDto } from '../hotels/types/create-hotel.dto';
import { HotelRoom } from './schemas/hotel-room.schema';
import { CreateHotelRoomDto } from './types/create-hotel-room.dto';
import { IHotelRoom } from './types/i-hotel-room';
import { IHotelRoomsService } from './types/i-hotel-rooms-service';
import { SearchRoomsParams } from './types/search-rooms-params';
import { THotelRoomDocument } from './types/t-hotel-rooms-document';

const room: IHotelRoom = {
    _id: 'ddd',
    hotel: {
        title: 'sds',
        description: 'dasdas',
        createAt: new Date(),
        updateAt: new Date(),
    },
    createAt: new Date(),
    updateAt: new Date(),
    isEnabled: true,
};

@Injectable()
export class HotelRoomsService implements IHotelRoomsService {
    constructor(
        @InjectModel(HotelRoom.name)
        private HotelRoomsModel: Model<THotelRoomDocument>,
    ) {}

    async create(dto: CreateHotelRoomDto): Promise<IHotelRoom> {
        return await this.HotelRoomsModel.create(dto);
    }

    findById(id: ID): Promise<IHotelRoom> {
        return Promise.resolve(room);
    }

    search(params: SearchRoomsParams): Promise<IHotelRoom[]> {
        return Promise.resolve([room]);
    }

    update(id: ID, dto: Partial<IHotelRoom>): Promise<IHotelRoom> {
        return Promise.resolve(room);
    }
}
