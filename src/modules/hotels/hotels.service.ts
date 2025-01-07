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
import { GeoDataRepository } from '../geo/geo-data.repository';
import { GeoData } from '../geo/geo-data.entity';

@Injectable()
export class HotelsService {
    constructor(
        private readonly hotelsRepository: HotelsRepository,
        private readonly locationsRepository: LocationsRepository,
        private readonly aboutsRepository: AboutsRepository,
        private readonly amenitiesRepository: AmenitiesRepository,
        private readonly imagesRepository: ImagesRepository,
        private readonly geoDataRepository: GeoDataRepository,
    ) {}

    async searchHotels(
        query: SearchBaseParams,
    ): Promise<TSearchHotelsResData[]> {
        const hotelsIdx = await this.hotelsRepository.searchHotelsIdx(query);
        return await this.processHotelsIdx(hotelsIdx.map((item) => item.idx));
    }

    async processHotelsIdx(idx: string[]): Promise<TSearchHotelsResData[]> {
        const hotelPromises = idx.map(async (hotelId) => {
            const hotelPromise =
                this.hotelsRepository.findForSearchOneById(hotelId);
            const imagesPromise =
                this.imagesRepository.findForSearchByHotelId(hotelId);
            const locationsPromise =
                this.locationsRepository.findForSearchByHotelId(hotelId);
            const amenitiesPromise =
                this.amenitiesRepository.findForSearchByHotelIdAndType(
                    hotelId,
                    'main',
                );
            const geoDataPromise =
                this.geoDataRepository.findForSearchByHotelIdAndType(
                    hotelId,
                    'head',
                );
            // Параллельное выполнение асинхронных операций для текущего отеля
            const [hotel, images, locations, amenities, geoData] =
                await Promise.all([
                    hotelPromise,
                    imagesPromise,
                    locationsPromise,
                    amenitiesPromise,
                    geoDataPromise,
                ]);

            // Разделение locations по языкам
            const locationsByLang = {
                ru: locations.filter(
                    (loc) => loc.language === 'ru',
                )[0] as Partial<Locations>,
                en: locations.filter(
                    (loc) => loc.language === 'en',
                )[0] as Partial<Locations>,
            };

            // Разделение amenities по языкам
            const amenitiesByLang = {
                ru: amenities.filter(
                    (amenity) => amenity.language === 'ru',
                )[0] as Partial<Amenities>,
                en: amenities.filter(
                    (amenity) => amenity.language === 'en',
                )[0] as Partial<Amenities>,
            };

            const geoDataByLang = {
                ru: geoData.filter(
                    (geo) => geo.language === 'ru',
                )[0] as Partial<GeoData>,
                en: geoData.filter(
                    (geo) => geo.language === 'en',
                )[0] as Partial<GeoData>,
            };

            return {
                hotel,
                locations: locationsByLang,
                images,
                amenities: amenitiesByLang,
                geoData: geoDataByLang,
            };
        });

        // Параллельное выполнение всех операций для всех отелей
        return await Promise.all(hotelPromises);
    }
}
