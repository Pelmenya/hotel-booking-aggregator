import { Hotel } from 'src/modules/hotels/schemas/hotel.schema';
import { ID } from 'src/types/id';

export class HotelRoomDataRes {
    hotel: Hotel;
    id?: ID;
    description?: string;
    images?: string[];
    isEnabled: boolean;
}
