import { Module } from '@nestjs/common';
import { RealEstateController } from './real-estate.controller';
import { RealEstateRepository } from './real-estate.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RealEstateCategory } from './real-estate-category.entity';
import { RealEstateSubcategory } from './real-estate-subcategory.entity';
import { RealEstateService } from './real-estate.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([RealEstateCategory, RealEstateSubcategory]),
    ],
    controllers: [RealEstateController],
    providers: [RealEstateRepository, RealEstateService],
    exports: [RealEstateRepository, RealEstateService],
})
export class RealEstateModule {}
