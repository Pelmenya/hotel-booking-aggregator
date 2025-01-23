import { Injectable } from '@nestjs/common';
import { AmenitiesRepository } from './amenities.repository';
import { TAmenityViewRes } from './amenities.types';

@Injectable()
export class AmenitiesService {
    constructor(private readonly amenitiesRepository: AmenitiesRepository) {}

    // Метод для получения данных из материализованного представления
    async getAmenitiesFromMaterializedView(): Promise<TAmenityViewRes[]> {
        const res = await this.amenitiesRepository.findFromMaterializedView();

        return res.map((amenity) => ({
            ru: {
                title: amenity.title,
                amenities: [...amenity.unique_names_ru],
            },
            en: {
                title: amenity.title_en,
                amenities: [...amenity.unique_names_en],
            },
        }));
    }
}
