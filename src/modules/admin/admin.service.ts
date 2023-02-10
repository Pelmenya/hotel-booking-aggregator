import { Injectable } from '@nestjs/common';
import { genSalt, hash } from 'bcrypt';
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

    async createUser(
        dto: CreateUserDto,
    ): Promise<Omit<CreateUserDto, 'password'>> {
        const { email, password, name, contactPhone, role } = dto;
        const salt = await genSalt(10);
        const passwordHash = await hash(password, salt);
        const saveDto: Omit<CreateUserDto, 'password'> = {
            email,
            name,
            passwordHash,
            contactPhone,
            role,
        };
        const user = await this.usersService.create(saveDto);
        return {
            email: user.email,
            name: user.name,
            contactPhone: user?.contactPhone,
            role: user.role,
        };
    }

    createHotel(dto: THotelDto) {
        return this.hotelsService.create(dto);
    }

    createHotelRoom(dto: IHotelRoom) {
        return this.hotelRoomsService.create(dto);
    }
}
