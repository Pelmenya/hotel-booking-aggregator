import { Injectable } from '@nestjs/common';
import { HotelRoomsService } from '../hotel-rooms/hotel-rooms.service';
import { IHotelRoom } from '../hotel-rooms/types/i-hotel-room';
import { HotelsService } from '../hotels/hotels.service';
import { IHotel } from '../hotels/types/i-hotel';
import { TUserDto } from '../users/types/t-user-dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AdminService {
    constructor(
        private readonly usersService: UsersService,
        private readonly hotelsService: HotelsService,
        private readonly hotelRoomsService: HotelRoomsService,
    ) {}

    createUser(dto: TUserDto) {
        return this.usersService.create(dto);
    }

    createHotel(dto: Partial<IHotel>) {
        return this.hotelsService.create(dto);
    }

    createHotelRoom(dto: IHotelRoom) {
        return this.hotelRoomsService.create(dto);
    }
}
