import { ID } from 'src/types/id';
import { CreateHotelDto } from './create-hotel.dto';

export type THotelDataRes = CreateHotelDto & {
    id: ID;
    images?: string[];
    coordinates?: number[];
};
