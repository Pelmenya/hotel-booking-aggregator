import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ID } from 'src/types/id';
import { HotelRoom } from './schemas/hotel-room.schema';
import { CreateHotelRoomDto } from './types/create-hotel-room.dto';
import { HotelRoomDataRes } from './types/hotel-room-data-res';
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
        const hotelRoom = await this.HotelRoomsModel.create(dto);
        return hotelRoom;
    }

    async findOne(id: ID): Promise<IHotelRoom> {
        const hotelRoom = this.HotelRoomsModel.findOne({ _id: id });
        return hotelRoom;
    }

    async findById(id: ID): Promise<HotelRoomDataRes> {
        const res = await this.HotelRoomsModel.findById(id)
            .populate({
                path: 'hotel',
                select: {
                    _id: 0,
                    id: '$_id',
                    title: 1,
                    description: 1,
                },
            })
            .select({
                _id: 0,
                id: '$_id',
                description: 1,
                images: 1,
                isEnabled: 1,
            })
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

    search(params: SearchRoomsParams): Promise<IHotelRoom[]> {
        return Promise.resolve([room]);
    }
}
