import { Request } from 'express';
import { LoginDto } from './login.dto';
import { RegisterDto } from './register.dto';
import { IUser } from 'src/modules/users/types/i-user';
import { UpdatePasswordDto } from './update-password.dto';

export interface IAuthService {
    login(dto: LoginDto): Promise<Omit<RegisterDto, 'password'>>;
    register(dto: RegisterDto): Promise<Omit<RegisterDto, 'password'>>;
    logout(req: Request & { user: IUser }): Record<string, boolean>;
    updatePassword(
        req: Request,
        dto: UpdatePasswordDto,
    ): Promise<{ succes: boolean }>;
}
