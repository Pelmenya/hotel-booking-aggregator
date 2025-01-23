import { Injectable } from '@nestjs/common';
import { AmenitiesRepository } from './amenities.repository';
import { TAmenityView } from './amenities.types';

@Injectable()
export class AmenitiesService {
    constructor(private readonly amenitiesRepository: AmenitiesRepository) {}

    // Метод для получения данных из материализованного представления
    async getAmenitiesFromMaterializedView(): Promise<TAmenityView[]> {
        const amenities =
            await this.amenitiesRepository.findFromMaterializedView();
        return amenities;
    }
}
