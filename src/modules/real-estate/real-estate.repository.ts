import { Injectable } from '@nestjs/common';
import { RealEstateCategory } from './real-estate-category.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RealEstateRepository {
    constructor(
        @InjectRepository(RealEstateCategory)
        private readonly realEstateRepository: Repository<RealEstateCategory>,
    ) {}

    async getAllCategories(): Promise<RealEstateCategory[]> {
        return this.realEstateRepository.find({ relations: ['subcategories'] });
    }
}
