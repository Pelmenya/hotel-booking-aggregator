import { Injectable } from '@nestjs/common';
import { genSalt, hash } from 'bcrypt';
import { ID } from 'src/types/id';
import { FilesService } from '../files/files.service';
import { HotelRoomsService } from '../hotel-rooms/hotel-rooms.service';
import { CreateHotelRoomDto } from '../hotel-rooms/types/create-hotel-room.dto';
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
        private readonly filesService: FilesService,
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

    async createHotelRoom(
        files: Express.Multer.File[],
        dto: CreateHotelRoomDto,
    ) {
        const hotelRoom = await this.hotelRoomsService.create(dto);
        const { _id } = hotelRoom;
        const images = await this.filesService.saveFiles(_id, files);
        const res = await this.hotelRoomsService.update(_id, {
            ...dto,
            images,
        });

        return res;
    }

    async updateHotelRoom(
        id: ID,
        files: Express.Multer.File[],
        dto: CreateHotelRoomDto,
    ) {
        const hotelRoom = await this.hotelRoomsService.findOne(id);
        const { images: imagesDB } = hotelRoom;
        const { images: imagesBody = [] } = dto;
        const imagesUpload = await this.filesService.saveFiles(id, files);
        let imagesSave: string[] = [];
        if (Array.isArray(imagesBody)) {
            imagesSave = [
                ...imagesUpload,
                ...imagesBody.filter((image) => imagesDB.includes(image)),
            ];
        } else {
            imagesSave = [...imagesUpload];
            if (imagesDB.includes(imagesBody)) {
                imagesSave.push(imagesBody);
            }
        }
        const imagesRemove = imagesDB.filter(
            (image) => !imagesSave.includes(image),
        );
        await this.filesService.removeFiles(imagesRemove);
        const res = await this.hotelRoomsService.update(id, {
            ...dto,
            images: imagesSave,
        });
        return res;
    }
}
