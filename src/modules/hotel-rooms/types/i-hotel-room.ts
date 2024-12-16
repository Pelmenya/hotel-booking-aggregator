import { Hotel } from 'src/modules/hotels-mongo/schemas/hotel.schema';
import { ID } from 'src/types/id';

export interface IHotelRoom {
    _id: ID;
    hotel: Hotel;
    title: string;
    description?: string;
    images?: string[];
    createAt: Date;
    updateAt: Date;
    isEnabled: boolean;
}
