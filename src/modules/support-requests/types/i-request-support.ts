import { User } from 'src/modules/users/schemas/users.schema';
import { Message } from '../schemas/message';

export interface ISupportRequest {
    user: User;
    createAt: Date;
    messages?: Message[];
    isActive?: boolean;
}
