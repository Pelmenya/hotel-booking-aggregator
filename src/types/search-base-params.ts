import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class SearchBaseParams {
    @IsOptional() @IsNumber() @Type(() => Number) limit?: number;
    @IsOptional() @IsNumber() @Type(() => Number) offset?: number;
}
