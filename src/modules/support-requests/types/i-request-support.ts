import { User } from 'src/modules/users/schemas/users.schema';
import { ID } from 'src/types/id';
import { Message } from '../schemas/message';

export interface ISupportRequest {
    _id: ID;
    user: User;
    createAt: Date;
    messages?: Message[];
    isActive?: boolean;
}
