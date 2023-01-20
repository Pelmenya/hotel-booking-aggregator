import { Injectable } from '@nestjs/common';
import { IUser } from '../users/types/i-user';
import { TUserDto } from '../users/types/t-user-dto';
import { UsersService } from '../users/users.service';
import { IAuthService } from './types/i-auth-service';
import { ILoginDto } from './types/i-login-dto';
import { IRegisterDto } from './types/i-register-dto';

const user = {
    name: 'ddd',
    email: 'ddd',
    phone: 'sss',
};

@Injectable()
export class AuthService implements IAuthService {
    constructor(private readonly usersService: UsersService) {}

    login(dto: ILoginDto): Promise<Omit<IRegisterDto, 'password'>> {
        return Promise.resolve(user);
    }

    async register(dto: IRegisterDto): Promise<Omit<IRegisterDto, 'password'>> {
        const { email, password, name, contactPhone } = dto;
        const saveDto: TUserDto = {
            email,
            name,
            passwordHash: password,
            contactPhone,
        };

        const user = await this.usersService.create(saveDto);

        return Promise.resolve({
            email: user.email,
            name: user.name,
            contactPhone: user?.contactPhone,
        });
    }

    logout(): void {
        console.log('ddd');
    }
}
