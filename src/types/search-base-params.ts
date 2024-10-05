import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class SearchBaseParams {
    @ApiProperty({ example: 20, required: false, description: 'Limit' })
    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    limit?: number;

    @ApiProperty({ example: 10, required: false, description: 'Offset' })
    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    offset?: number;
}
