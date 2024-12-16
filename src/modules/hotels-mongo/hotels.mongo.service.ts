import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ID } from 'src/types/id';
import { Hotel } from './schemas/hotel.schema';
import { HotelData } from './types/hotel-data';
import { IHotelService } from './types/i-hotel-service';
import { THotelDocument } from './types/t-hotel-document';
import { UpdateHotelDto } from './types/update-hotel.dto';
import { SearchHotelParams } from './types/search-hotel-params';

@Injectable()
export class HotelsMongoService implements IHotelService {
    constructor(
        @InjectModel(Hotel.name) private HotelModel: Model<THotelDocument>,
    ) {}

    async create(dto: Partial<Hotel>): Promise<HotelData> {
        return await this.HotelModel.create(dto);
    }

    async findById(id: ID): Promise<HotelData> {
        const hotel = await this.HotelModel.findById(id);
        if (hotel) return hotel;
        throw new NotFoundException('Hotel not found');
    }

    async search(params: SearchHotelParams): Promise<HotelData[]> {
        const { limit = 20, offset = 0, title } = params;
        const searchParams: { title?: { $regex: string } } = {};
        if (title) {
            searchParams.title = { $regex: title };
        }
        return await this.HotelModel.find(searchParams)
            .limit(limit)
            .skip(offset)
            .select({
                _id: 0,
                id: '$_id',
                title: 1,
                description: 1,
                images: 1,
                coordinates: 1,
            });
    }

    async update(id: ID, dto: UpdateHotelDto): Promise<HotelData> {
        const updateHotel = await this.HotelModel.findOneAndUpdate(
            { _id: id },
            dto,
        ).exec();
        return await this.findById(updateHotel._id);
    }
}
