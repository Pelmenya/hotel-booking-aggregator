import { Type } from 'class-transformer';
import { IsDate, IsOptional } from 'class-validator';
import { SearchHotelsParams } from 'src/modules/hotels/types/search-hotels-params';
import { ID } from 'src/types/id';

export class SearchReservationsParams extends SearchHotelsParams {
    user: ID;
    @IsOptional() @IsDate() @Type(() => Date) startDate?: Date;
    @IsOptional() @IsDate() @Type(() => Date) endDate?: Date;
}
