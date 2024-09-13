import { ID } from 'src/types/id';
import { TRole } from './t-role';
export interface IUser {
    _id: ID;
    email: string;
    emailIsConfirm: boolean;
    phoneIsConfirm: boolean;
    passwordHash: string;
    name: string;
    contactPhone?: string;
    role?: TRole;
    avatars?: string[];
    birthday?: Date;
    address?: string;
    gender?: 'male' | 'female';
    company?: string;
}
