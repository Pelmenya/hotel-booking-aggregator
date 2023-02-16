import { Type } from 'class-transformer';
import { IsDate, IsOptional } from 'class-validator';
import { SearchBaseParams } from 'src/types/search-base-params';
import { ID } from 'src/types/id';

export class SearchReservationsParams extends SearchBaseParams {
    user: ID;
    @IsOptional() @IsDate() @Type(() => Date) startDate?: Date;
    @IsOptional() @IsDate() @Type(() => Date) endDate?: Date;
}
