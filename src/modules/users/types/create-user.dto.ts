import {
    IsOptional,
    IsString,
    IsEmail,
    IsDate,
    IsEmpty,
    NotEquals,
} from 'class-validator';
import { TRole } from './t-role';

export class CreateUserDto {
    @IsString() @IsEmail() email: string;
    @IsString() password: string;
    @IsString() name: string;
    @IsOptional() @IsString() passwordHash?: string;
    @IsOptional() @IsString() contactPhone?: string;
    @IsEmpty() @NotEquals('') @NotEquals(null) role?: TRole; // чтоб кто-то c фронта не создал
    @IsString() @IsOptional() company?: string;
    @IsString() @IsOptional() address?: string;
    @IsDate() @IsOptional() birthday?: string;
    @IsString() @IsOptional() gender?: string;
}
