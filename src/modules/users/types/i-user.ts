import { ID } from 'src/types/id';
import { TRole } from './t-role';
export interface IUser {
    _id: ID;
    email: string;
    passwordHash: string;
    name: string;
    contactPhone?: string;
    role?: TRole;
}
