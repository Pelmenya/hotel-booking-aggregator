import { Injectable } from '@nestjs/common';
import { HotelRoomsService } from '../hotel-rooms/hotel-rooms.service';
import { IHotelRoom } from '../hotel-rooms/types/i-hotel-room';
import { HotelsService } from '../hotels/hotels.service';
import { CreateUserDto } from '../users/types/create-user.dto';
import { UsersService } from '../users/users.service';
import { IAdminService } from './types/i-admin-service';
import { THotelDto } from './types/t-create-hotel-dto';

@Injectable()
export class AdminService implements IAdminService {
    constructor(
        private readonly usersService: UsersService,
        private readonly hotelsService: HotelsService,
        private readonly hotelRoomsService: HotelRoomsService,
    ) {}

    createUser(dto: CreateUserDto) {
        return this.usersService.create(dto);
    }

    createHotel(dto: THotelDto) {
        return this.hotelsService.create(dto);
    }

    createHotelRoom(dto: IHotelRoom) {
        return this.hotelRoomsService.create(dto);
    }
}
