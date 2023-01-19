import { Injectable } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { ID } from 'src/types/id';
import { ISearchUserParams } from './types/i-search-user-params';
import { IUser } from './types/i-user';
import { IUserService } from './types/i-user-service';
import { TUserDocument } from './types/t-user-document';
import { User } from './schemas/users.schema';

const user: IUser = {
    _id: 'ddd',
    name: 'ddd',
    email: 'ddd',
    passwordHash: 'dddd',
    role: 'admin',
};

@Injectable()
export class UsersService implements IUserService {
    constructor(
        @InjectModel(User.name) private UserModel: Model<TUserDocument>,
        @InjectConnection() private connection: Connection,
    ) {}

    async create(dto: Partial<IUser>): Promise<IUser> {
        const user = new this.UserModel(dto);
        return await user.save();
    }

    async findById(id: ID): Promise<IUser> {
        return Promise.resolve(user);
    }

    async findByEmail(email: string): Promise<IUser> {
        return Promise.resolve(user);
    }

    async findAll(): Promise<IUser[]> {
        return await this.UserModel.find();
    }
}
