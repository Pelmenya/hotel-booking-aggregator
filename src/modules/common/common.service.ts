import { Injectable } from '@nestjs/common';
import { ID } from 'src/types/id';
import { HotelRoomsService } from '../hotel-rooms/hotel-rooms.service';
import { HotelRoomDataRes } from '../hotel-rooms/types/hotel-room-data-res';
import { SearchRoomsParams } from '../hotel-rooms/types/search-rooms-params';
import { HotelsService } from '../hotels/hotels.service';
import { HotelData } from '../hotels/types/hotel-data';
import { SearchHotelParams } from '../hotels/types/search-hotel-params';
import { UsersService } from '../users/users.service';
import { IUser } from '../users/types/i-user';
import { UpdateUserDto } from '../users/types/update-user-dto';

@Injectable()
export class CommonService {
    constructor(
        private readonly hotelRoomsService: HotelRoomsService,
        private readonly hotelsService: HotelsService,
        private readonly userService: UsersService,
    ) {}

    async getUser(id: ID): Promise<IUser> {
        const user = this.userService.findById(id);
        return user;
    }

    async updateUser(
        user: IUser,
        files: Express.Multer.File[],
        dto: UpdateUserDto,
    ): Promise<IUser> {
        return await this.userService.updateUser(user._id, files, dto);
    }

    async getHotels(params: SearchHotelParams): Promise<HotelData[]> {
        return await this.hotelsService.search(params);
    }

    async getHotelById(id: ID): Promise<Omit<HotelData & { id: ID }, '_id'>> {
        const {
            _id,
            title,
            description,
            createAt,
            updateAt,
            images,
            coordinates,
        } = await this.hotelsService.findById(id);
        return {
            id: _id,
            title,
            description,
            createAt,
            updateAt,
            images,
            coordinates,
        };
    }

    async getHotelRooms(
        params: SearchRoomsParams,
    ): Promise<HotelRoomDataRes[]> {
        return this.hotelRoomsService.search(params);
    }

    async getHotelRoom(id: ID): Promise<HotelRoomDataRes> {
        return this.hotelRoomsService.findById(id);
    }
}
