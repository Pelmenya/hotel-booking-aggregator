import { Injectable } from '@nestjs/common';
import { resolve } from 'path';
import { ID } from 'src/types/id';
import { ISearchUserParams } from './types/i-search-user-params';
import { IUser } from './types/i-user';
import { IUserService } from './types/i-user-service';

const user: IUser = {
    _id: 'ddd',
    name: 'ddd',
    email: 'ddd',
    passwordHash: 'dddd',
    role: 'admin',
};

@Injectable()
export class UsersService implements IUserService {
    async create(data: Partial<IUser>): Promise<IUser> {
        return Promise.resolve(user);
    }
    async findById(id: ID): Promise<IUser> {
        return Promise.resolve(user);
    }

    async findByEmail(email: string): Promise<IUser> {
        return Promise.resolve(user);
    }

    async findAll(params: ISearchUserParams): Promise<IUser[]> {
        return Promise.resolve([user]);
    }
}
