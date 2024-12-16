import { ApiProperty } from '@nestjs/swagger';
import { ID } from 'src/types/id';
import { CreateHotelDto } from './create-hotel.dto';

export class HotelData extends CreateHotelDto {
    @ApiProperty({
        type: 'string',
        example: '507f1f77bcf86cd799439011',
        description:
            'Unique identifier for the hotel. Warning return property name id',
    })
    _id: ID;

    @ApiProperty({
        type: 'string',
        format: 'date-time',
        example: '2021-10-17T18:25:43.511Z',
        description: 'Date when the hotel entry was created',
    })
    createAt: Date;

    @ApiProperty({
        type: 'string',
        format: 'date-time',
        example: '2021-10-17T18:30:43.511Z',
        description: 'Date when the hotel entry was last updated',
    })
    updateAt: Date;

    @ApiProperty({
        type: 'number[]',
        example: [6.003780317548211, 80.76187144368367],
        description:
            'Geographical coordinates of the hotel [latitude, longitude]',
    })
    coordinates: number[];

    @ApiProperty({
        type: 'string[]',
        example: ['image1.jpg', 'image2.jpg'],
        description: 'Array of URLs to images of the hotel',
    })
    images: string[];
}
