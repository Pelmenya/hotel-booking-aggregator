import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { TLanguage } from './t-language';
import { TCurrency } from './t-currency';

export class UpdateUserSettingsDTO {
    @IsOptional() @IsString() language?: TLanguage;
    @IsOptional() @IsString() currency?: TCurrency;
    @IsOptional() @IsString() phoneChanel?: boolean;
    @IsOptional() @IsBoolean() emailChanel?: boolean;
    @IsOptional() @IsBoolean() pushChanel?: boolean;
}
