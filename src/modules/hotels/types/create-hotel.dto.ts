import { IsString } from 'class-validator';

export class CreateHotelDto {
    @IsString() title: string;
    @IsString() description: string;
}
