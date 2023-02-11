import { IHotelRoom } from 'src/modules/hotel-rooms/types/i-hotel-room';
import { SearchHotelsParams } from 'src/modules/hotels/types/search-hotels-params';
import { CreateHotelDto } from 'src/modules/hotels/types/create-hotel.dto';
import { HotelData } from 'src/modules/hotels/types/hotel-data';
import { CreateUserDto } from 'src/modules/users/types/create-user.dto';
import { SearchUserParams } from 'src/modules/users/types/search-user-params';
import { ID } from 'src/types/id';

export interface IAdminService {
    createUser(dto: CreateUserDto): Promise<Omit<CreateUserDto, 'password'>>;
    getUsers(
        query: SearchUserParams,
    ): Promise<Omit<CreateUserDto, 'password'>[]>;
    createHotel(dto: CreateHotelDto): Promise<CreateHotelDto & { id: ID }>;
    getHotels(query: SearchHotelsParams): Promise<HotelData[]>;
    createHotelRoom(dto: Partial<IHotelRoom>): Promise<IHotelRoom>;
}
