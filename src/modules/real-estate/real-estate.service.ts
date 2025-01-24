import { Injectable } from '@nestjs/common';
import { RealEstateRepository } from './real-estate.repository';

@Injectable()
export class RealEstateService {
    constructor(private readonly realEstateRepository: RealEstateRepository) {}

    async getAllCategories() {
        return await this.realEstateRepository.getAllCategories();
    }
}
