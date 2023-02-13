import { Type } from 'class-transformer';
import { IsDate, IsOptional, IsString } from 'class-validator';

export class CreateReservationDto {
    @IsString() room: string;
    @IsOptional() @IsString() hotel?: string;
    @IsOptional() @IsString() user?: string;
    @IsDate() @Type(() => Date) startDate: Date;
    @IsDate() @Type(() => Date) endDate: Date;
}
