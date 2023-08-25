import { ID } from 'src/types/id';
import { TRole } from './t-role';
export interface IUser {
    _id: ID;
    email: string;
    emailIsConfirm: boolean;
    passwordHash: string;
    name: string;
    contactPhone?: string;
    role?: TRole;
    avatars?: string[];
}
