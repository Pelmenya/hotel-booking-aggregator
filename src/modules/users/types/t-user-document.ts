import { Document } from 'mongoose';
import { User } from '../schemas/users.schema';

export type TUserDocument = User & Document;
