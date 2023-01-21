import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { ID } from 'src/types/id';
import { Hotel } from './schemas/hotel.schema';
import { IHotel } from './types/i-hotel';
import { IHotelService } from './types/i-hotel-service';
import { ISearchHotelParams } from './types/i-search-hotel-params';
import { IUpdateHotelParams } from './types/i-update-hotel-params';
import { THotelDocument } from './types/t-hotel-document';

const hotel = {
    _id: 'sdf',
    title: 'string',
    description: 'string',
    createAt: new Date(),
    updateAt: new Date(),
};

@Injectable()
export class HotelsService implements IHotelService {
    constructor(
        @InjectModel(Hotel.name) private HotelModel: Model<THotelDocument>,
        @InjectConnection() private connection: Connection,
    ) {}

    async create(dto: Partial<Hotel>): Promise<IHotel> {
        return await this.HotelModel.create(dto);
    }

    async findById(id: ID): Promise<IHotel> {
        return await this.HotelModel.findById(id);
    }

    search(params: ISearchHotelParams): Promise<IHotel[]> {
        return Promise.resolve([hotel]);
    }

    update(id: ID, data: IUpdateHotelParams): Promise<Hotel> {
        return Promise.resolve(hotel);
    }
}
