import { Document } from 'mongoose';
import { User } from '../users.schema';

export type TUserDocument = User & Document;
