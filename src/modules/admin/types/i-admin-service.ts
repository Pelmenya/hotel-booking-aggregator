import { IHotelRoom } from 'src/modules/hotel-rooms/types/i-hotel-room';
import { IHotel } from 'src/modules/hotels/types/i-hotel';
import { IUser } from 'src/modules/users/types/i-user';
import { TUserDto } from 'src/modules/users/types/t-user-dto';
import { THotelDto } from './t-create-hotel-dto';

export interface IAdminService {
    createUser(dto: TUserDto): Promise<Omit<IUser, '_id'>>;
    createHotel(dto: THotelDto): Promise<IHotel>;
    createHotelRoom(dto: Partial<IHotelRoom>): Promise<IHotelRoom>;
}
