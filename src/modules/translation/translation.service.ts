import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance } from 'axios';
import * as fs from 'fs';
import * as jose from 'node-jose';
import Bottleneck from 'bottleneck';
import { TranslationRepository } from './translation.repository';
import { TransportService } from '../transport/transport.service';
import { TTranslationName } from './translation.types';
import { setDelay } from 'src/helpers/delay';
import { TLanguage } from 'src/types/t-language';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class TranslationService {
    private axiosInstance: AxiosInstance;
    private limiter = new Bottleneck({
        reservoir: 10,
        reservoirRefreshAmount: 10,
        reservoirRefreshInterval: 1000,
        minTime: 100,
    });

    private symbolsUsed = 0;
    private lastReset = Date.now();
    private iamToken: string;
    private iamTokenExpiry: number;

    constructor(
        private readonly configService: ConfigService,
        private readonly transportService: TransportService,
        private readonly translationRepository: TranslationRepository,
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    ) {
        this.axiosInstance = this.transportService.getAxiosInstance();
    }

    private resetSymbolsCounter() {
        const now = Date.now();
        if (now - this.lastReset >= 3600000) {
            this.symbolsUsed = 0;
            this.lastReset = now;
        }
    }

    private async getIamTokenWithRetry(retries = 3): Promise<string> {
        for (let attempt = 1; attempt <= retries; attempt++) {
            try {
                const json = JSON.parse(
                    fs.readFileSync(
                        this.configService.get<string>('KEY_FILE_PATH'),
                        'utf8',
                    ),
                );
                const { private_key, service_account_id, id } = json;

                const now = Math.floor(Date.now() / 1000);
                const payload = {
                    aud: this.configService.get<string>('IAM_TOKEN_URL'),
                    iss: service_account_id,
                    iat: now,
                    exp: now + 3600,
                };

                const key = await jose.JWK.asKey(private_key, 'pem', {
                    kid: id,
                    alg: 'PS256',
                });
                const jws = await jose.JWS.createSign(
                    { format: 'compact' },
                    key,
                )
                    .update(JSON.stringify(payload))
                    .final();

                const response = await axios.post(
                    this.configService.get<string>('IAM_TOKEN_URL'),
                    {
                        jwt: jws,
                    },
                );

                this.iamToken = response.data.iamToken;
                this.iamTokenExpiry = now + 3600;
                return this.iamToken;
            } catch (error) {
                this.logger.error(
                    `Failed to get IAM token on attempt ${attempt}`,
                    error.stack,
                );
                if (attempt === retries) {
                    throw new Error(
                        'Failed to get IAM token after multiple attempts',
                    );
                }
                await setDelay(1000 * attempt);
            }
        }
    }

    private async getIamToken(): Promise<string> {
        const now = Math.floor(Date.now() / 1000);
        if (!this.iamToken || now >= this.iamTokenExpiry) {
            return await this.getIamTokenWithRetry();
        }
        return this.iamToken;
    }

    public async translateText(
        name: TTranslationName,
        text: string,
        targetLang: TLanguage,
    ): Promise<string> {
        this.resetSymbolsCounter();

        if (this.symbolsUsed + text.length > 1_000_000) {
            throw new Error('Exceeded symbol limit per hour');
        }

        const cachedTranslation =
            await this.translationRepository.getTranslationFromDictionary(
                text,
                targetLang,
            );
        if (cachedTranslation) {
            return cachedTranslation;
        }

        return this.limiter.schedule(async () => {
            try {
                const iamToken = await this.getIamToken();
                const folderId = this.configService.get<string>('YA_FOLDER_ID');

                const response = await this.transportService
                    .getAxiosInstance('json', false)
                    .post(
                        this.configService.get<string>('TRANSLATE_API_URL'),
                        {
                            folderId,
                            texts: [text],
                            targetLanguageCode: targetLang,
                        },
                        {
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${iamToken}`,
                            },
                        },
                    );

                const translatedText = response.data.translations[0].text;
                await this.translationRepository.saveTranslationToDictionary(
                    name,
                    text,
                    translatedText,
                    targetLang,
                );

                this.symbolsUsed += text.length;

                return translatedText;
            } catch (error) {
                this.logger.error('Failed to translate text', error.stack);
                if (error.response && error.response.status === 429) {
                    await setDelay(1000);
                    return this.translateText(name, text, targetLang);
                }
                throw new Error('Failed to translate text');
            }
        });
    }

    public async translateFromEnglishToRussian(
        name: TTranslationName,
        text: string,
    ): Promise<string> {
        this.resetSymbolsCounter();

        if (this.symbolsUsed + text.length > 1_000_000) {
            throw new Error('Exceeded symbol limit per hour');
        }

        const targetLang: TLanguage = 'ru'; // Целевой язык - русский
        const sourceLang: TLanguage = 'en'; // Исходный язык - английский

        const cachedTranslation =
            await this.translationRepository.getTranslationFromDictionary(
                text,
                targetLang,
            );
        if (cachedTranslation) {
            return cachedTranslation;
        }

        return this.limiter.schedule(async () => {
            try {
                const iamToken = await this.getIamToken();
                const folderId = this.configService.get<string>('YA_FOLDER_ID');

                const response = await this.axiosInstance.post(
                    this.configService.get<string>('TRANSLATE_API_URL'),
                    {
                        folderId,
                        texts: [text],
                        targetLanguageCode: targetLang,
                        sourceLanguageCode: sourceLang, // Указание исходного языка
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${iamToken}`,
                        },
                    },
                );

                const translatedText = response.data.translations[0].text;
                await this.translationRepository.saveTranslationToDictionary(
                    name,
                    text,
                    translatedText,
                    targetLang,
                );

                this.symbolsUsed += text.length;

                return translatedText;
            } catch (error) {
                this.logger.error(
                    'Failed to translate text from English to Russian',
                    error.stack,
                );
                if (error.response && error.response.status === 429) {
                    await setDelay(1000);
                    return this.translateFromEnglishToRussian(name, text);
                }
                throw new Error(
                    'Failed to translate text from English to Russian',
                );
            }
        });
    }

    async saveTranslationToDictionary(
        name: TTranslationName,
        originalText: string,
        translatedText: string,
        targetLang: TLanguage,
    ) {
        const cachedTranslation =
            await this.translationRepository.getTranslationFromDictionary(
                originalText,
                targetLang,
            );
        if (cachedTranslation) {
            return cachedTranslation;
        }

        return await this.translationRepository.saveTranslationToDictionary(
            name,
            originalText,
            translatedText,
            targetLang,
        );
    }
}
