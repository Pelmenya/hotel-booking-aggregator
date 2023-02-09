import { ID } from 'src/types/id';
import { CreateUserDto } from './create-user.dto';
import { ISearchUserParams } from './i-search-user-params';
import { IUser } from './i-user';

export interface IUserService {
    create(dto: CreateUserDto): Promise<IUser>;
    findById(id: ID): Promise<IUser>;
    findByEmail(email: string): Promise<IUser>;
    findAll(params: ISearchUserParams): Promise<IUser[]>;
}
