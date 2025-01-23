import { Controller, Get, Query } from '@nestjs/common';
import { TranslationService } from './translation.service';
import { TTranslationName } from './translation.types';
import { TLanguage } from 'src/types/t-language';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('translate')
@Controller('translate')
export class TranslationController {
    constructor(private readonly translationService: TranslationService) {}

    @Get()
    async translate(
        @Query('name') name: TTranslationName,
        @Query('text') text: string,
        @Query('lang') lang: TLanguage,
    ): Promise<string> {
        return this.translationService.translateText(name, text, lang);
    }
}
