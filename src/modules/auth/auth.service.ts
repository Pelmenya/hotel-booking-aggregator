import { UnauthorizedException, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../users/types/create-user.dto';
import { UsersService } from '../users/users.service';
import { IAuthService } from './types/i-auth-service';
import { LoginDto } from './types/login.dto';
import { RegisterDto } from './types/register.dto';
import { genSalt, hash, compare } from 'bcrypt';
import { ERRORS_USER } from '../users/users.constants';
import { Request } from 'express';

@Injectable()
export class AuthService implements IAuthService {
    constructor(private readonly usersService: UsersService) {}

    async login(dto: LoginDto): Promise<Omit<RegisterDto, 'password'>> {
        const { email, password } = dto;
        const user = await this.usersService.findByEmail(email);
        const isValidUser = await compare(password, user.passwordHash);
        if (isValidUser) {
            return user;
        }
        throw new UnauthorizedException(ERRORS_USER.BAD_REQUEST);
    }

    async register(dto: RegisterDto): Promise<Omit<RegisterDto, 'password'>> {
        const { email, password, name, contactPhone } = dto;
        const salt = await genSalt(10);
        const passwordHash = await hash(password, salt);
        const saveDto: Omit<CreateUserDto, 'password'> = {
            email,
            name,
            passwordHash,
            contactPhone,
        };
        const user = await this.usersService.create(saveDto);
        return {
            email: user.email,
            name: user.name,
            contactPhone: user?.contactPhone,
        };
    }

    logout(req: Request): Record<string, boolean> {
        req.logout((err) => console.log(err));
        return { success: true };
    }
}
