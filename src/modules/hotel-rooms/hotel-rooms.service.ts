import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ID } from 'src/types/id';
import {
    populateHotelParam,
    selectHotelRoomParam,
} from './hotel-rooms.constants';
import { HotelRoom } from './schemas/hotel-room.schema';
import { CreateHotelRoomDto } from './types/create-hotel-room.dto';
import { HotelRoomDataRes } from './types/hotel-room-data-res';
import { IHotelRoom } from './types/i-hotel-room';
import { IHotelRoomsService } from './types/i-hotel-rooms-service';
import { SearchRoomsParams } from './types/search-rooms-params';
import { THotelRoomDocument } from './types/t-hotel-rooms-document';

@Injectable()
export class HotelRoomsService implements IHotelRoomsService {
    constructor(
        @InjectModel(HotelRoom.name)
        private HotelRoomsModel: Model<THotelRoomDocument>,
    ) {}

    async create(dto: CreateHotelRoomDto): Promise<IHotelRoom> {
        const hotelRoom = await this.HotelRoomsModel.create(dto);
        return hotelRoom;
    }

    async findOne(id: ID): Promise<IHotelRoom> {
        const hotelRoom = this.HotelRoomsModel.findOne({ _id: id });
        return hotelRoom;
    }

    async findById(id: ID): Promise<HotelRoomDataRes> {
        const res = await this.HotelRoomsModel.findById(id)
            .populate(populateHotelParam)
            .select(selectHotelRoomParam)
            .exec();
        return res;
    }

    async update(
        id: ID,
        dto: Partial<CreateHotelRoomDto>,
    ): Promise<HotelRoomDataRes> {
        const hotelRoom = await this.HotelRoomsModel.findByIdAndUpdate(
            id,
            dto,
        ).exec();
        return await this.findById(hotelRoom._id);
    }

    async search(query: SearchRoomsParams): Promise<IHotelRoom[]> {
        const { limit = 20, offset = 0, hotel, isEnabled } = query;
        const queryParams: SearchRoomsParams = {};
        if (hotel) {
            queryParams.hotel = hotel;
        }

        if (String(isEnabled) === 'false') {
            queryParams.isEnabled = false;
        }

        const res = await this.HotelRoomsModel.find(queryParams)
            .limit(limit)
            .skip(offset)
            .populate(populateHotelParam)
            .select(selectHotelRoomParam)
            .exec();
        return res;
    }
}
