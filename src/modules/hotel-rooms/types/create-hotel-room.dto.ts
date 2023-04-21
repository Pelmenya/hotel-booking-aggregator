import { IsOptional, IsString } from 'class-validator';
import { ID } from 'src/types/id';

export class CreateHotelRoomDto {
    @IsString() hotel: ID;
    @IsString() title: string;
    @IsOptional() @IsString() description?: string;
    images?: string[];
}
