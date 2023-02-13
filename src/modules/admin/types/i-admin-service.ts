import { SearchHotelsParams } from 'src/modules/hotels/types/search-hotels-params';
import { CreateHotelDto } from 'src/modules/hotels/types/create-hotel.dto';
import { HotelData } from 'src/modules/hotels/types/hotel-data';
import { CreateUserDto } from 'src/modules/users/types/create-user.dto';
import { SearchUserParams } from 'src/modules/users/types/search-user-params';
import { THotelDataRes } from 'src/modules/hotels/types/t-hotel-data-res';
import { ID } from 'src/types/id';
import { CreateHotelRoomDto } from 'src/modules/hotel-rooms/types/create-hotel-room.dto';
import { HotelRoomDataRes } from 'src/modules/hotel-rooms/types/hotel-room-data-res';

export interface IAdminService {
    createUser(dto: CreateUserDto): Promise<Omit<CreateUserDto, 'password'>>;
    getUsers(
        query: SearchUserParams,
    ): Promise<Omit<CreateUserDto, 'password'>[]>;
    getHotels(query: SearchHotelsParams): Promise<HotelData[]>;
    createHotel(dto: CreateHotelDto): Promise<THotelDataRes>;
    updateHotel(id: ID, dto: Partial<CreateHotelDto>): Promise<THotelDataRes>;
    createHotelRoom(
        files: Express.Multer.File[],
        dto: CreateHotelRoomDto,
    ): Promise<HotelRoomDataRes>;
    updateHotelRoom(
        id: ID,
        files: Express.Multer.File[],
        dto: CreateHotelRoomDto,
    ): Promise<HotelRoomDataRes>;
}
