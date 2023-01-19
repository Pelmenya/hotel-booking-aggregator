import { ILoginDto } from './i-login-dto';
import { IRegisterDto } from './i-register-dto';

export interface IAuthService {
    login(dto: ILoginDto): Promise<Omit<IRegisterDto, 'password'>>;
    register(dto: IRegisterDto): Promise<Omit<IRegisterDto, 'password'>>;
    logout(): void;
}
