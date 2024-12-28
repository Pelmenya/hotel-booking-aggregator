import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class SearchBaseParams {
    @ApiProperty({
        example: 'A good weather',
        required: false,
        description: 'Any query string',
    })
    @IsOptional()
    @IsString()
    @Type(() => String)
    q?: string = '';

    @ApiProperty({ example: 20, required: false, description: 'Limit' })
    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    limit?: number = 10;

    @ApiProperty({ example: 10, required: false, description: 'Offset' })
    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    offset?: number = 0;
}
