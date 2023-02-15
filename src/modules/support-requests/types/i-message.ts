import { User } from 'src/modules/users/schemas/users.schema';
import { ID } from 'src/types/id';

export interface IMessage {
    _id: ID;
    author: User;
    sentAt: Date;
    text: string;
    readAt?: Date;
}
