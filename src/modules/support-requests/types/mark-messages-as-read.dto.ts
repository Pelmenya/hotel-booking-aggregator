import { ID } from 'src/types/id';
import { Nullable } from 'src/types/nullable';

export class MarkMessagesAsReadDto {
    user: Nullable<ID>;
    supportRequest: ID;
    createdBefore: Date;
}
