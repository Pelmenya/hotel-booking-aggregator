import {
    IsOptional,
    IsString,
    IsEmail,
    IsDate,
    IsEmpty,
    IsBoolean,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { TRole } from './t-role';

export class UpdateUserDto {
    @IsString({ message: 'Email must be a string.' })
    @IsEmail({}, { message: 'Email must be a valid email address.' })
    email?: string;

    @IsString({ message: 'Name must be a string.' })
    name?: string;

    @IsOptional()
    @IsString({ message: 'Password hash must be a string.' })
    passwordHash?: string;

    @IsOptional()
    @IsString({ message: 'Contact phone must be a string.' })
    contactPhone?: string;

    @IsEmpty({ message: 'Role must be empty.' })
    role?: TRole;

    @IsString({ message: 'Company must be a string.' })
    @IsOptional()
    company?: string;

    @IsString({ message: 'Address must be a string.' })
    @IsOptional()
    address?: string;

    @IsBoolean({ message: 'Email confirmation status must be a boolean.' })
    @IsOptional()
    emailIsConfirm?: boolean;

    @IsBoolean({ message: 'Phone confirmation status must be a boolean.' })
    @IsOptional()
    phoneIsConfirm?: boolean;

    @IsOptional()
    @Transform(({ value }) => {
        if (!value) return value;
        const date = new Date(value);
        return isNaN(date.getTime()) ? value : date;
    })
    @IsDate({ message: 'Birthday must be a valid date.' })
    birthday?: Date;

    @IsString({ message: 'Gender must be a string.' })
    @IsOptional()
    gender?: string;

    @IsOptional()
    avatars?: string[];
}
