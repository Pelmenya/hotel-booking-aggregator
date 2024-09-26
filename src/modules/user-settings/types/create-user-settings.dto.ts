import {
    IsBoolean,
    IsDefined,
    IsEmpty,
    IsOptional,
    IsString,
} from 'class-validator';
import { TLanguage } from './t-language';
import { TCurrency } from './t-currency';
import { TTheme } from './t-theme';

export class CreateUserSettingsDTO {
    @IsEmpty({ message: 'id must be empty.' })
    @IsDefined({ message: 'id must be empty.' })
    id?: number;
    @IsEmpty({ message: 'userId must be empty.' })
    @IsDefined({ message: 'userId must be empty.' })
    userId?: string;
    @IsOptional() @IsString() language?: TLanguage;
    @IsOptional() @IsString() theme?: TTheme;
    @IsOptional() @IsString() currency?: TCurrency;
    @IsOptional() @IsString() phoneChanel?: boolean;
    @IsOptional() @IsBoolean() emailChanel?: boolean;
    @IsOptional() @IsBoolean() pushChanel?: boolean;
}
