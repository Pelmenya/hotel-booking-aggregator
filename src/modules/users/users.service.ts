import { UnauthorizedException, BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { ID } from 'src/types/id';
import { IUser } from './types/i-user';
import { IUserService } from './types/i-user-service';
import { TUserDocument } from './types/t-user-document';
import { User } from './schemas/users.schema';
import { CreateUserDto } from './types/create-user.dto';
import { ERRORS_USER } from './users.constants';

@Injectable()
export class UsersService implements IUserService {
    constructor(
        @InjectModel(User.name) private UserModel: Model<TUserDocument>,
        @InjectConnection() private connection: Connection,
    ) {}

    async create(dto: Omit<CreateUserDto, 'password'>): Promise<IUser> {
        try {
            return await this.UserModel.create(dto);
        } catch(e) {
            if (e.message.indexOf('E11000 duplicate key error collection') === 0)
                throw new BadRequestException(ERRORS_USER.ALREADY_EXISTS);
            throw new BadRequestException(e.message);
        }
    }

    async findById(id: ID): Promise<IUser> {
        const user = await this.UserModel.findById(id);
        if (user) {
            return user;
        }
        throw new UnauthorizedException(ERRORS_USER.NOT_FOUND);
    }

    async findByEmail(email: string): Promise<IUser> {
        const user = await this.UserModel.findOne({ email });
        if (user) {
            return user;
        }
        throw new UnauthorizedException(ERRORS_USER.NOT_FOUND);
    }

    async findAll(): Promise<IUser[]> {
        return await this.UserModel.find();
    }
}
