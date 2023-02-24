import { IsOptional, IsString } from 'class-validator';
import { SearchBaseParams } from 'src/types/search-base-params';

export class SearchHotelParams extends SearchBaseParams {
    @IsOptional() @IsString() title?: string;
}
