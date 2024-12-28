import { Injectable } from '@nestjs/common';
import { HotelsRepository } from './hotels.repository';
import { Hotels } from './hotels.entity';
import { SearchBaseParams } from 'src/types/search-base-params';
import { Images } from '../images/images.entity';
import { THotelResData } from './hotels.types';
import { LocationsRepository } from '../locations/locations.repository';
import { AboutsRepository } from '../abouts/abouts.repository';
import { AmenitiesRepository } from '../amenities/amenities.repository';
import { ImagesRepository } from '../images/images.repository';

@Injectable()
export class HotelsService {
    constructor(
        private readonly hotelsRepository: HotelsRepository,
        private readonly locationsRepository: LocationsRepository,
        private readonly aboutsRepository: AboutsRepository,
        private readonly amenitiesRepository: AmenitiesRepository,
        private readonly imagesRepository: ImagesRepository,
    ) {}

    async searchHotels(query: SearchBaseParams): Promise<string[]> {
        const hotelsIdx = await this.hotelsRepository.searchHotelsIdx(query);
        console.log(hotelsIdx.map((item) => item.idx));
        return await this.processHotelsIdx(hotelsIdx);
    }

    async processHotelsIdx(idx: string[]) {
        return idx;
    }

    async processHotelData(
        data: Array<
            Partial<Images> &
                Hotels & {
                    location_pretty: string;
                    language: string;
                    image_id: string;
                }
        >,
    ): Promise<THotelResData[]> {
        const hotelsMap = new Map();

        data.forEach((row) => {
            const hotelId = row.id;
            if (!hotelsMap.has(hotelId)) {
                hotelsMap.set(hotelId, {
                    id: hotelId,
                    name: row.name,
                    name_en: row.name_en,
                    hotel_link_ostrovok: row.hotel_link_ostrovok,
                    rating: row.rating,
                    stars: row.stars,
                    locations: {},
                    images: [],
                });
            }
            const hotel = hotelsMap.get(hotelId);

            // Обработка изображений
            if (row.image_id) {
                hotel.images.push({
                    id: row.image_id,
                    alt: row.alt,
                    path: row.path,
                    size: row.size,
                    type: row.type,
                });
            }

            // Обработка локаций
            if (row.location_pretty && row.language) {
                // Используем язык как ключ для уникальности
                hotel.locations[row.language] = row.location_pretty;
            }
        });

        // Преобразуем Map в массив объектов
        const result = Array.from(hotelsMap.values());

        return result;
    }
}
