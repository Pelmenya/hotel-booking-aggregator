import {
    IsBoolean,
    IsEmail,
    IsEmpty,
    IsOptional,
    IsString,
    NotEquals,
} from 'class-validator';

export class UpdateUserDto {
    @IsString() @IsEmail() @IsOptional() email?: string;
    @IsString() @IsOptional() name?: string;
    @IsString() @IsOptional() contactPhone?: string;
    @IsEmpty() @NotEquals('') @NotEquals(null) role?: string;
    @IsString() @IsOptional() passwordHash?: string;
    @IsBoolean() @IsOptional() emailIsConfirm?: boolean;
    avatars?: string[];
}
