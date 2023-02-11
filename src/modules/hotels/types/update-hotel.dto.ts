import { IsOptional, IsString } from 'class-validator';

export class UpdateHotelDto {
    @IsOptional() @IsString() title?: string;
    @IsOptional() @IsString() description?: string;
}
