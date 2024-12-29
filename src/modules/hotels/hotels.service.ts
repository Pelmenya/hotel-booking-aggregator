import { Injectable } from '@nestjs/common';
import { HotelsRepository } from './hotels.repository';
import { SearchBaseParams } from 'src/types/search-base-params';
import { TSearchHotelsResData } from './hotels.types';
import { LocationsRepository } from '../locations/locations.repository';
import { AboutsRepository } from '../abouts/abouts.repository';
import { AmenitiesRepository } from '../amenities/amenities.repository';
import { ImagesRepository } from '../images/images.repository';
import { Amenities } from '../amenities/amenities.entity';
import { Locations } from '../locations/locations.entity';

@Injectable()
export class HotelsService {
    constructor(
        private readonly hotelsRepository: HotelsRepository,
        private readonly locationsRepository: LocationsRepository,
        private readonly aboutsRepository: AboutsRepository,
        private readonly amenitiesRepository: AmenitiesRepository,
        private readonly imagesRepository: ImagesRepository,
    ) {}

    async searchHotels(
        query: SearchBaseParams,
    ): Promise<TSearchHotelsResData[]> {
        const hotelsIdx = await this.hotelsRepository.searchHotelsIdx(query);
        console.log(hotelsIdx.map((item) => item.idx));
        return await this.processHotelsIdx(hotelsIdx.map((item) => item.idx));
    }

    async processHotelsIdx(idx: string[]): Promise<TSearchHotelsResData[]> {
        const hotelPromises = idx.map(async (hotelId) => {
            const hotelPromise =
                this.hotelsRepository.findForSearchOneById(hotelId);
            const imagesPromise = this.imagesRepository.findByHotelId(
                hotelId,
                8,
            );
            const locationsPromise =
                this.locationsRepository.findForSearchByHotelId(hotelId);
            const amenitiesPromise =
                this.amenitiesRepository.findForSearchByHotelIdAndType(
                    hotelId,
                    'main',
                );

            // Параллельное выполнение асинхронных операций для текущего отеля
            const [hotel, images, locations, amenities] = await Promise.all([
                hotelPromise,
                imagesPromise,
                locationsPromise,
                amenitiesPromise,
            ]);

            // Разделение locations по языкам
            const locationsByLang = {
                ru: locations.filter(
                    (loc) => loc.language === 'ru',
                ) as Partial<Locations>,
                en: locations.filter(
                    (loc) => loc.language === 'en',
                ) as Partial<Locations>,
            };

            // Разделение amenities по языкам
            const amenitiesByLang = {
                ru: amenities.filter(
                    (amenity) => amenity.language === 'ru',
                ) as Partial<Amenities>,
                en: amenities.filter(
                    (amenity) => amenity.language === 'en',
                ) as Partial<Amenities>,
            };

            return {
                hotel,
                locations: locationsByLang,
                images,
                amenities: amenitiesByLang,
            };
        });

        // Параллельное выполнение всех операций для всех отелей
        return await Promise.all(hotelPromises);
    }
}
