import { ID } from 'src/types/id';
import { Nullable } from 'src/types/nullable';

export class SearchChatListParams {
    user: Nullable<ID>;
    isActive: boolean;
}
