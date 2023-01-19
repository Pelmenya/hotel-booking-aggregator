import { ID } from 'src/types/id';

export interface IHotel {
    _id: ID;
    title: string;
    description: string;
    createAt: Date;
    updateAt: Date;
}
