import { Injectable } from '@nestjs/common';
import { genSalt, hash } from 'bcrypt';
import { ID } from 'src/types/id';
import { HotelRoomsService } from '../hotel-rooms/hotel-rooms.service';
import { IHotelRoom } from '../hotel-rooms/types/i-hotel-room';
import { HotelsService } from '../hotels/hotels.service';
import { CreateHotelDto } from '../hotels/types/create-hotel.dto';
import { HotelData } from '../hotels/types/hotel-data';
import { SearchHotelsParams } from '../hotels/types/search-hotels-params';
import { UpdateHotelDto } from '../hotels/types/update-hotel.dto';
import { CreateUserDto } from '../users/types/create-user.dto';
import { SearchUserParams } from '../users/types/search-user-params';
import { UsersService } from '../users/users.service';
import { IAdminService } from './types/i-admin-service';

@Injectable()
export class AdminService implements IAdminService {
    constructor(
        private readonly usersService: UsersService,
        private readonly hotelsService: HotelsService,
        private readonly hotelRoomsService: HotelRoomsService,
    ) {}

    async createUser(dto: CreateUserDto) {
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
            id: user._id,
            email: user.email,
            name: user.name,
            contactPhone: user?.contactPhone,
            role: user.role,
        };
    }

    async getUsers(
        query: SearchUserParams,
    ): Promise<Omit<CreateUserDto, 'password'>[]> {
        const users = await this.usersService.findAll(query);
        return users;
    }

    async getHotels(query: SearchHotelsParams): Promise<HotelData[]> {
        return await this.hotelsService.search(query);
    }

    async createHotel(dto: CreateHotelDto) {
        const hotel = await this.hotelsService.create(dto);
        return {
            id: hotel._id,
            title: hotel.title,
            description: hotel.description,
        };
    }

    async updateHotel(id: ID, dto: UpdateHotelDto) {
        const hotel = await this.hotelsService.update(id, dto);
        return {
            id: hotel._id,
            title: hotel.title,
            description: hotel.description,
        };
    }

    async createHotelRoom(dto: IHotelRoom) {
        return await this.hotelRoomsService.create(dto);
    }
}
