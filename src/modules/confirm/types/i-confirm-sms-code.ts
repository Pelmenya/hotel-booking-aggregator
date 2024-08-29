import { User } from 'src/modules/users/schemas/users.schema';
import { ID } from 'src/types/id';

export interface IConfirmSmsCode {
    _id: ID;
    user: User;
    code: number;
    createdAt: Date;
}
