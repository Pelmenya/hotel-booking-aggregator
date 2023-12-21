import { Type } from 'class-transformer';
import {
    ArrayMaxSize,
    ArrayMinSize,
    IsArray,
    IsOptional,
    IsString,
} from 'class-validator';

export class UpdateHotelDto {
    @IsOptional() @IsString() title?: string;
    @IsOptional() @IsString() description?: string;
    images?: string[];
    @IsArray()
    @ArrayMinSize(2)
    @ArrayMaxSize(2)
    @Type(() => Number)
    coordinates?: number[];
}
