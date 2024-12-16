import { ApiProperty } from '@nestjs/swagger';
import { Hotel } from 'src/modules/hotels-mongo/schemas/hotel.schema';
import { ID } from 'src/types/id';

export class HotelRoomDataRes {
    @ApiProperty({
        type: 'string',
        example: '507f1f77bcf86cd799439012',
        description: 'The hotel ID to which this room belongs',
    })
    hotel: Hotel;

    @ApiProperty({
        type: 'string',
        example: '507f1f77bcf86cd799439012',
        description: 'Unique identifier for the hotel room',
        required: false,
    })
    id?: ID;

    @ApiProperty({
        type: 'string',
        example: 'Deluxe Room',
        description: 'The title or name of the hotel room',
    })
    title: string;

    @ApiProperty({
        type: 'string',
        example: 'A spacious room with a king-size bed and a beautiful view.',
        description: 'A brief description of the hotel room',
        required: false,
    })
    description?: string;

    @ApiProperty({
        type: 'string[]',
        example: ['room1.jpg', 'room2.jpg'],
        description: 'Array of URLs to images of the hotel room',
        required: false,
    })
    images?: string[];

    @ApiProperty({
        type: 'boolean',
        example: true,
        description:
            'Indicates whether the hotel room is enabled or available for booking',
    })
    isEnabled: boolean;
}
