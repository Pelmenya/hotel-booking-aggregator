import { IUser } from './i-user';

export type TUserDto = Omit<IUser, '_id'>;
