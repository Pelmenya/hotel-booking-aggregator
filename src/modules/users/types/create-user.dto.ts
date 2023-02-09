import { IsOptional, IsString, IsEmail } from 'class-validator';
import { TRole } from './t-role';

export class CreateUserDto {
    @IsString() @IsEmail() email: string;
    @IsString() password: string;
    @IsString() name: string;
    @IsOptional() @IsString() passwordHash?: string;
    @IsOptional() @IsString() contactPhone?: string;
    @IsOptional() @IsString() role?: TRole;
}
