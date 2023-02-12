import { ID } from 'src/types/id';

export class CreateHotelRoomDto {
    hotel: ID;
    description?: string;
    images?: string[];
}
