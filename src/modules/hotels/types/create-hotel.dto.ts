import { Type } from 'class-transformer';
import { ArrayMaxSize, ArrayMinSize, IsArray, IsString } from 'class-validator';

export class CreateHotelDto {
    @IsString() title: string;
    @IsString() description: string;
    @IsArray()
    @ArrayMinSize(2)
    @ArrayMaxSize(2)
    @Type(() => Number)
    coordinates?: number[];
}
