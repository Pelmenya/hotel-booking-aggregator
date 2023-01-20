import { Injectable } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { ID } from 'src/types/id';
import { ISearchUserParams } from './types/i-search-user-params';
import { IUser } from './types/i-user';
import { IUserService } from './types/i-user-service';
import { TUserDocument } from './types/t-user-document';
import { User } from './schemas/users.schema';
import { TUserDto } from './types/t-user-dto';

@Injectable()
export class UsersService implements IUserService {
    constructor(
        @InjectModel(User.name) private UserModel: Model<TUserDocument>,
        @InjectConnection() private connection: Connection,
    ) {}

    async create(dto: TUserDto): Promise<IUser> {
        return await this.UserModel.create(dto);
    }

    async findById(id: ID): Promise<IUser> {
        return await this.UserModel.findById(id);
    }

    async findByEmail(email: string): Promise<IUser> {
        return await this.UserModel.findOne({ email });
    }

    async findAll(): Promise<IUser[]> {
        return await this.UserModel.find();
    }
}
