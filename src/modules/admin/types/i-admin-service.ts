import { IHotelRoom } from 'src/modules/hotel-rooms/types/i-hotel-room';
import { IHotel } from 'src/modules/hotels/types/i-hotel';
import { CreateUserDto } from 'src/modules/users/types/create-user.dto';
import { IUser } from 'src/modules/users/types/i-user';
import { THotelDto } from './t-create-hotel-dto';

export interface IAdminService {
    createUser(dto: CreateUserDto): Promise<Omit<IUser, '_id'>>;
    createHotel(dto: THotelDto): Promise<IHotel>;
    createHotelRoom(dto: Partial<IHotelRoom>): Promise<IHotelRoom>;
}
