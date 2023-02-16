import { SearchBaseParams } from 'src/types/search-base-params';
import { ID } from 'src/types/id';
import { Nullable } from 'src/types/nullable';
import { IsBoolean, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class SearchChatListParams extends SearchBaseParams {
    _id?: ID;
    user?: Nullable<ID>;
    @IsOptional() @IsBoolean() @Type(() => Boolean) isActive?: boolean;
}
