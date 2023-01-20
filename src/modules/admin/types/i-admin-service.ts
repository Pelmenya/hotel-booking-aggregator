import { IUser } from 'src/modules/users/types/i-user';

export interface IAdminService {
    createUser(): Promise<Omit<IUser, '_id'>>;
}
