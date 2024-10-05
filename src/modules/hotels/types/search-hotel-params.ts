import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { SearchBaseParams } from 'src/types/search-base-params';

export class SearchHotelParams extends SearchBaseParams {
    @ApiProperty({
        example: 'Hilton',
        required: false,
        description: 'Hotel name',
    })
    @IsOptional()
    @IsString()
    title?: string;
}
