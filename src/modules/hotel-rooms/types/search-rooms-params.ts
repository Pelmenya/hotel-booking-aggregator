import { ID } from 'src/types/id';
import { SearchBaseParams } from '../../../types/search-base-params';
import { ApiProperty } from '@nestjs/swagger';

export class SearchRoomsParams extends SearchBaseParams {
    @ApiProperty({
        type: 'string',
        example: '507f1f77bcf86cd799439011',
        description: 'Unique identifier for the hotel ID',
        required: false,
    })
    hotel?: ID;
    @ApiProperty({
        type: 'boolean',
        example: true,
        description: 'Is the hotel room available or not',
        required: false,
    })
    isEnabled?: boolean;
}
