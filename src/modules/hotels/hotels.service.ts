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
import { Abouts } from '../abouts/abouts.entity';
import { PoliciesRepository } from '../policies/policies.repository';
import { Policies } from '../policies/policies.entity';

@Injectable()
export class HotelsService {
    constructor(
        private readonly hotelsRepository: HotelsRepository,
        private readonly locationsRepository: LocationsRepository,
        private readonly aboutsRepository: AboutsRepository,
        private readonly amenitiesRepository: AmenitiesRepository,
        private readonly imagesRepository: ImagesRepository,
        private readonly geoDataRepository: GeoDataRepository,
        private readonly policiesRepository: PoliciesRepository,
    ) {}

    async searchHotels(
        query: SearchBaseParams,
    ): Promise<TSearchHotelsResData[]> {
        const hotelsIds = await this.hotelsRepository.searchHotelsIdx(query);
        return await this.processHotelsIdx(hotelsIds.map((item) => item.idx));
    }

    async findHotelById(id: string): Promise<TSearchHotelsResData> {
        const hotel = await this.processHotel(id);
        return { ...hotel };
    }

    async processHotel(id: string) {
        const hotelPromise = this.hotelsRepository.findForSearchOneById(id);
        const imagesPromise = this.imagesRepository.finByHotelId(id, 'medium');
        const locationsPromise = this.locationsRepository.findByHotelId(id);
        const amenitiesPromise = this.amenitiesRepository.findByHotelId(id);
        const geoDataPromise = this.geoDataRepository.findByHotelId(id);
        const aboutsPromise = this.aboutsRepository.findByHotelId(id);
        const policiesPromise = this.policiesRepository.findByHotelId(id);

        // Параллельное выполнение асинхронных операций для текущего отеля
        const [hotel, images, locations, amenities, geoData, abouts, policies] =
            await Promise.all([
                hotelPromise,
                imagesPromise,
                locationsPromise,
                amenitiesPromise,
                geoDataPromise,
                aboutsPromise,
                policiesPromise,
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
            ) as Partial<Amenities>,
            en: amenities.filter(
                (amenity) => amenity.language === 'en',
            ) as Partial<Amenities>,
        };

        const geoDataByLang = {
            ru: geoData.filter(
                (geo) => geo.language === 'ru',
            ) as Partial<GeoData>,
            en: geoData.filter(
                (geo) => geo.language === 'en',
            ) as Partial<GeoData>,
        };
        // Разделение amenities по языкам

        const aboutsByLang = {
            ru: abouts.filter(
                (about) => about.language === 'ru',
            )[0] as Partial<Abouts>,
            en: abouts.filter(
                (about) => about.language === 'en',
            )[0] as Partial<Abouts>,
        };

        const policiesByLang = {
            ru: policies.filter(
                (policy) => policy.language === 'ru',
            )[0] as Partial<Policies>,
            en: policies.filter(
                (policy) => policy.language === 'en',
            )[0] as Partial<Policies>,
        };
        return {
            hotel,
            locations: locationsByLang,
            images,
            amenities: amenitiesByLang,
            geoData: geoDataByLang,
            abouts: aboutsByLang,
            policies: policiesByLang,
        };
    }

    async processHotelsIdx(id: string[]): Promise<TSearchHotelsResData[]> {
        const hotelPromises = id.map(async (hotelId) => {
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
