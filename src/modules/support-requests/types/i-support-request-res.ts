import { ID } from 'src/types/id';
import { ISupportRequest } from './i-request-support';

export interface ISupportRequestRes extends ISupportRequest {
    _id?: ID;
    id?: ID;
    hasNewMessages: boolean;
}
