import { ILoginDto } from './i-login-dto';

export interface IRegisterDto extends ILoginDto {
    name: string;
    contactPhone?: string;
}
