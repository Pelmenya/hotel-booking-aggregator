import {
    IsOptional,
    IsString,
    IsEmail,
    IsDate,
    IsEmpty,
    NotEquals,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { TRole } from './t-role';

export class UpdateUserDto {
    @IsString() @IsEmail() email: string;
    @IsString() password: string;
    @IsString() name: string;
    @IsOptional() @IsString() passwordHash?: string;
    @IsOptional() @IsString() contactPhone?: string;
    @IsEmpty() @NotEquals('') @NotEquals(null) role?: TRole;
    @IsString() @IsOptional() company?: string;
    @IsString() @IsOptional() address?: string;

    @IsOptional()
    @Transform(({ value }) => {
        const date = new Date(value);
        return date;
    })
    @IsDate()
    birthday?: Date;

    @IsString() @IsOptional() gender?: string;
}
