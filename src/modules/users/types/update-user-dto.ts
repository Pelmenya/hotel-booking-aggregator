import {
    IsBoolean,
    IsDate,
    IsEmail,
    IsEmpty,
    IsOptional,
    IsString,
    NotEquals,
} from 'class-validator';
import { TRole } from './t-role';

export class UpdateUserDto {
    @IsString() @IsEmail() @IsOptional() email?: string;
    @IsString() @IsOptional() name?: string;
    @IsString() @IsOptional() contactPhone?: string;
    @IsEmpty() @NotEquals('') @NotEquals(null) role?: TRole; // чтоб кто-то не проапдейтил с фронта
    @IsString() @IsOptional() passwordHash?: string;
    @IsBoolean() @IsOptional() emailIsConfirm?: boolean;
    @IsBoolean() @IsOptional() phoneIsConfirm?: boolean;
    @IsString() @IsOptional() company?: string;
    @IsString() @IsOptional() address?: string;
    @IsString() @IsOptional() gender?: string;
    @IsDate() @IsOptional() birthday?: string;
    avatars?: string[];
}
