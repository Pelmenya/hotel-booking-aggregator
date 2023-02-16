import { IsEmail, IsOptional, IsString } from 'class-validator';
import { SearchBaseParams } from 'src/types/search-base-params';

export class SearchUserParams extends SearchBaseParams {
    @IsOptional() @IsEmail() email?: string;
    @IsOptional() @IsString() name?: string;
    @IsOptional() @IsString() contactPhone?: string;
}
