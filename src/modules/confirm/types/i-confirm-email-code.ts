import { Schema as MongooseSchema } from 'mongoose';
import { User } from 'src/modules/users/schemas/users.schema';
import { ID } from 'src/types/id';

export interface IConfirmEmailCode {
    _id: ID;
    user: User;
    code: MongooseSchema.Types.UUID;
    createAt: Date;
}
