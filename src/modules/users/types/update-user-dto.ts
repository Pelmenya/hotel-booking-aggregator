import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
    @IsString() @IsEmail() @IsOptional() email?: string;
    @IsString() @IsOptional() name?: string;
    @IsOptional() @IsString() @IsOptional() contactPhone?: string;
    avatars?: string[];
}
