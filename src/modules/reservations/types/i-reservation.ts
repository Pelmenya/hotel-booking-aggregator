import { HotelRoom } from 'src/modules/hotel-rooms/schemas/hotel-room.schema';
import { Hotel } from 'src/modules/hotels/schemas/hotel.schema';
import { User } from 'src/modules/users/schemas/users.schema';
import { ID } from 'src/types/id';

export interface IReservation {
    _id: ID;
    user: User;
    hotel: Hotel;
    room: HotelRoom;
    startDate: Date;
    endDate: Date;
}
