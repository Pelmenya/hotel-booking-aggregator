import { IsOptional, IsString } from 'class-validator';
import { LoginDto } from './login.dto';

export class RegisterDto extends LoginDto {
    @IsString() name: string;
    @IsString() @IsOptional() contactPhone?: string;
}
