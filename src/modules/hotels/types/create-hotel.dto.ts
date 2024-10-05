import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
    ArrayMaxSize,
    ArrayMinSize,
    IsArray,
    IsString,
    IsNumber,
} from 'class-validator';

export class CreateHotelDto {
    @ApiProperty({
        type: 'string',
        example: 'Hilton',
        description: 'The name of the hotel',
    })
    @IsString({ message: 'Title must be a string' })
    title: string;

    @ApiProperty({
        type: 'string',
        example: 'The best hotel',
        description: 'A short description of the hotel',
    })
    @IsString({ message: 'Description must be a string' })
    description: string;

    @ApiProperty({
        type: 'number[]',
        example: [6.003780317548211, 80.76187144368367],
        description:
            'Geographical coordinates of the hotel [latitude, longitude]',
    })
    @IsArray({ message: 'Coordinates must be an array' })
    @ArrayMinSize(2, { message: 'Coordinates must have exactly 2 elements' })
    @ArrayMaxSize(2, { message: 'Coordinates must have exactly 2 elements' })
    @IsNumber({}, { each: true, message: 'Each coordinate must be a number' })
    @Type(() => Number)
    coordinates?: number[];
}
