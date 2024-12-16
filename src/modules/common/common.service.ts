import { Injectable } from '@nestjs/common';
import { ID } from 'src/types/id';
import { HotelRoomsService } from '../hotel-rooms/hotel-rooms.service';
import { HotelRoomDataRes } from '../hotel-rooms/types/hotel-room-data-res';
import { SearchRoomsParams } from '../hotel-rooms/types/search-rooms-params';
import { HotelsMongoService } from '../hotels-mongo/hotels.mongo.service';
import { HotelData } from '../hotels-mongo/types/hotel-data';
import { SearchHotelParams } from '../hotels-mongo/types/search-hotel-params';
import { UsersService } from '../users/users.service';
import { IUser } from '../users/types/i-user';
import { UpdateUserDto } from '../users/types/update-user-dto';
import { CreateUserSettingsDTO } from '../user-settings/types/create-user-settings.dto';
import { UserSettingsService } from '../user-settings/user-settings.service';
import { TUserSettings } from '../user-settings/types/t-user-settings';

@Injectable()
export class CommonService {
    constructor(
        private readonly hotelRoomsService: HotelRoomsService,
        private readonly hotelsService: HotelsMongoService,
        private readonly userService: UsersService,
        private readonly userSettingsService: UserSettingsService,
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

    async getHotelsMongo(params: SearchHotelParams): Promise<HotelData[]> {
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

    async createUserSettings(
        userId: ID,
        dto: CreateUserSettingsDTO,
    ): Promise<Partial<TUserSettings>> {
        return await this.userSettingsService.createUserSettings(userId, dto);
    }

    async updateUserSettings(
        userId: ID,
        dto: Partial<CreateUserSettingsDTO>,
    ): Promise<Partial<TUserSettings>> {
        return await this.userSettingsService.updateUserSettings(userId, dto);
    }

    async findUserSettings(userId: ID): Promise<Partial<TUserSettings>> {
        return await this.userSettingsService.findByUserId(userId);
    }
}
