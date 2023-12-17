import {
    UnauthorizedException,
    BadRequestException,
    Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ID } from 'src/types/id';
import { IUser } from './types/i-user';
import { IUserService } from './types/i-user-service';
import { TUserDocument } from './types/t-user-document';
import { User } from './schemas/users.schema';
import { CreateUserDto } from './types/create-user.dto';
import { ERRORS_USER, selectUserParam } from './users.constants';
import { SearchUserParams } from './types/search-user-params';
import { TQueryUserMongoParams } from './types/t-query-user-mongo-params';
import { UpdateUserDto } from './types/update-user-dto';
import { FilesService } from '../files/files.service';

@Injectable()
export class UsersService implements IUserService {
    constructor(
        private readonly filesService: FilesService,
        @InjectModel(User.name) private UserModel: Model<TUserDocument>,
    ) {}

    async create(dto: Omit<CreateUserDto, 'password'>): Promise<IUser> {
        try {
            return await this.UserModel.create(dto);
        } catch (e) {
            if (
                e.message.indexOf('E11000 duplicate key error collection') === 0
            )
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

    async findAll(query: SearchUserParams): Promise<IUser[]> {
        const { limit = 20, offset = 0, name, email, contactPhone } = query;
        const queryParams: TQueryUserMongoParams = {};

        if (name) {
            queryParams.name = { $regex: name };
        }

        if (email) {
            queryParams.email = { $regex: email };
        }

        if (contactPhone) {
            queryParams.contactPhone = { $regex: contactPhone };
        }

        const users = await this.UserModel.find(queryParams)
            .skip(offset)
            .limit(limit)
            .select({
                _id: 0,
                id: '$_id',
                name: 1,
                email: 1,
                contactPhone: 1,
                avatars: 1,
                role: 1,
                emailIsConfirm: 1,
            })
            .exec();

        return users;
    }

    async updateUser(id: ID, files: Express.Multer.File[], dto: UpdateUserDto) {
        const user = await this.UserModel.findById(id);
        const imagesSave = files.length
            ? await this.filesService.updateFiles(
                  { _id: user._id, images: user?.avatars },
                  files,
                  { images: dto?.avatars },
              )
            : undefined;

        const updateUser = await this.UserModel.findByIdAndUpdate(user._id, {
            ...dto,
            avatars: imagesSave,
        });

        return await this.UserModel.findById(updateUser._id).select(
            selectUserParam,
        );
    }
}
