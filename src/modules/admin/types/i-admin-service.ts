import { IHotelRoom } from 'src/modules/hotel-rooms/types/i-hotel-room';
import { IHotel } from 'src/modules/hotels/types/i-hotel';
import { CreateUserDto } from 'src/modules/users/types/create-user.dto';
import { SearchUserParams } from 'src/modules/users/types/search-user-params';
import { THotelDto } from './t-create-hotel-dto';

export interface IAdminService {
    createUser(dto: CreateUserDto): Promise<Omit<CreateUserDto, 'password'>>;
    getUsers(
        query: SearchUserParams,
    ): Promise<Omit<CreateUserDto, 'password'>[]>;
    createHotel(dto: THotelDto): Promise<IHotel>;
    createHotelRoom(dto: Partial<IHotelRoom>): Promise<IHotelRoom>;
}
