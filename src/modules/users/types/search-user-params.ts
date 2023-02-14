import { IsEmail, IsOptional, IsString } from 'class-validator';
import { SearchHotelsParams } from 'src/modules/hotels/types/search-hotels-params';

export class SearchUserParams extends SearchHotelsParams {
    @IsOptional() @IsEmail() email?: string;
    @IsOptional() @IsString() name?: string;
    @IsOptional() @IsString() contactPhone?: string;
}
