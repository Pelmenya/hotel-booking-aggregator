import { Injectable } from '@nestjs/common';
import { RealEstateRepository } from './real-estate.repository';
import { TRealEstateCategoriesRes } from './real-estate,types';

@Injectable()
export class RealEstateService {
    constructor(private readonly realEstateRepository: RealEstateRepository) {}

    async getAllCategories(): Promise<TRealEstateCategoriesRes> {
        const categories = await this.realEstateRepository.getAllCategories();

        return {
            ru: categories.filter((category) => category.language === 'ru'),
            en: categories.filter((category) => category.language === 'en'),
        };
    }
}
