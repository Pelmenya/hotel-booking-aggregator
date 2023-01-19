import { ID } from 'src/types/id';

export interface IHotelRoom {
    _id: ID;
    hotel: ID;
    description?: string;
    images?: string[];
    createAt: Date;
    updateAt: Date;
    isEnabled: boolean;
}
