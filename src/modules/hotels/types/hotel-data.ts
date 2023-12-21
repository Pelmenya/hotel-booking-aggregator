import { ID } from 'src/types/id';
import { CreateHotelDto } from './create-hotel.dto';

export class HotelData extends CreateHotelDto {
    _id: ID;
    createAt: Date;
    updateAt: Date;
    coordinates: number[];
    images: string[];
}
