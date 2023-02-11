import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ID } from 'src/types/id';
import { Hotel } from './schemas/hotel.schema';
import { HotelData } from './types/hotel-data';
import { IHotelService } from './types/i-hotel-service';
import { IUpdateHotelParams } from './types/i-update-hotel-params';
import { SearchHotelsParams } from './types/search-hotels-params';
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
    ) {}

    async create(dto: Partial<Hotel>): Promise<HotelData> {
        return await this.HotelModel.create(dto);
    }

    async findById(id: ID): Promise<HotelData> {
        return await this.HotelModel.findById(id);
    }

    async search(params: SearchHotelsParams): Promise<HotelData[]> {
        const { limit = 20, offset = 0 } = params;
        return await this.HotelModel.find()
            .limit(limit)
            .skip(offset)
            .select({ _id: 0, id: '$_id', title: 1, description: 1 });
    }

    update(id: ID, data: IUpdateHotelParams): Promise<HotelData> {
        return Promise.resolve(hotel);
    }
}
