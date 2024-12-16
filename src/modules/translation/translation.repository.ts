import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TranslationDictionary } from './translation-dictionary.entity';
import { TTranslationName } from './translation.types';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { TLanguage } from 'src/types/t-language';

@Injectable()
export class TranslationRepository {
    constructor(
        @InjectRepository(TranslationDictionary)
        private readonly translationRepository: Repository<TranslationDictionary>,
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    ) {}

    async getTranslationFromDictionary(
        text: string,
        targetLang: string,
    ): Promise<string | null> {
        try {
            const translation = await this.translationRepository.findOne({
                where: { original_text: text, language: targetLang },
            });
            return translation ? translation.translated_text : null;
        } catch (error) {
            this.logger.error(
                'Failed to retrieve translation from dictionary',
                error.stack,
            );
            throw new Error('Failed to retrieve translation from dictionary');
        }
    }

    async saveTranslationToDictionary(
        name: TTranslationName,
        originalText: string,
        translatedText: string,
        targetLang: TLanguage,
    ) {
        try {
            let translation = await this.translationRepository.findOne({
                where: { original_text: originalText, language: targetLang },
            });

            if (translation) {
                // Если запись уже существует, просто обновляем её
                translation.name = name;
                translation.translated_text = translatedText;
                translation.updated_at = new Date();
            } else {
                // Если записи нет, создаем новую
                translation = this.translationRepository.create({
                    name,
                    original_text: originalText,
                    translated_text: translatedText,
                    language: targetLang,
                });
            }

            await this.translationRepository.save(translation);
        } catch (error) {
            this.logger.error(
                'Failed to save translation to dictionary',
                error.stack,
            );
            throw new Error('Failed to save translation to dictionary');
        }
    }
}
