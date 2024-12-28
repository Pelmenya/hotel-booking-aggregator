import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Locations } from './locations.entity';

@Injectable()
export class LocationsRepository {
    constructor(
        @InjectRepository(Locations)
        private readonly locationsRepository: Repository<Locations>,
    ) {}

    // Метод для поиска всех локаций с языком 'ru', которые еще не переведены на 'en'
    async findRussianLocationsWithoutEnglishTranslation(
        batch: number,
    ): Promise<Locations[]> {
        return this.locationsRepository
            .createQueryBuilder('location')
            .where('location.language = :ru', { ru: 'ru' })
            .andWhere('location.is_translated_to_en = :isTranslated', {
                isTranslated: false,
            })
            .take(batch)
            .getMany();
    }

    // Метод для сохранения измененной локации
    async save(location: Locations): Promise<Locations> {
        return this.locationsRepository.save(location);
    }

    async findAll() {
        return this.locationsRepository.find();
    }

    // Метод для поиска hotel_id по location_id
    async findHotelId(locationId: string): Promise<string | undefined> {
        const location = await this.locationsRepository
            .createQueryBuilder('location')
            .select('location.hotel.id', 'hotel_id')
            .where('location.id = :locationId', { locationId })
            .getRawOne();

        return location ? location.hotel_id : undefined;
    }
}
