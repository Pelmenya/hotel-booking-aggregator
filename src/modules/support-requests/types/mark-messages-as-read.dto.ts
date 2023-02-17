import { Type } from 'class-transformer';
import { IsDate } from 'class-validator';
import { ID } from 'src/types/id';
import { Nullable } from 'src/types/nullable';

export class MarkMessagesAsReadDto {
    user?: Nullable<ID>;
    supportRequest?: ID;
    @IsDate() @Type(() => Date) createdBefore: Date;
}
