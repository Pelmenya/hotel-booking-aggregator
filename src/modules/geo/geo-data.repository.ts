import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TLanguage } from 'src/types/t-language';
import { TCategory } from 'src/types/t-category';
import { GeoData } from './geo-data.entity';
import { TGeoData } from './geo-data.types';

@Injectable()
export class GeoDataRepository {
    constructor(
        @InjectRepository(GeoData)
        private geoDataRepository: Repository<GeoData>,
    ) {}

    // Метод для сохранения или обновления записи
    async save(amenity: GeoData): Promise<GeoData> {
        return this.geoDataRepository.save(amenity);
    }

    // Метод для поиска всех по ID отеля
    async findByHotelId(hotelId: string): Promise<GeoData[]> {
        return this.geoDataRepository.find({
            where: { hotel: { id: hotelId } },
        });
    }

    // Метод для удаления записи по ID
    async deleteById(id: string): Promise<void> {
        await this.geoDataRepository.delete(id);
    }

    // Метод для обновления записи
    async update(amenity: GeoData): Promise<GeoData> {
        return this.geoDataRepository.save(amenity);
    }

    // Метод для поиска записи по уникальной комбинации полей: ID отеля, язык и заголовок
    async findByHotelLanguageAndTitle(
        hotelId: string,
        language: TLanguage,
        title: string,
    ): Promise<GeoData | undefined> {
        return this.geoDataRepository.findOne({
            where: {
                hotel: { id: hotelId },
                language: language,
                title: title,
            },
        });
    }

    // Метод для поиска всех по отелю и типу
    async findByHotelAndType(
        hotelId: string,
        type: TCategory,
    ): Promise<GeoData[]> {
        return this.geoDataRepository.find({
            where: {
                hotel: { id: hotelId },
                type: type,
            },
        });
    }

    // Метод для обновления только списка аменитиз в существующей записи
    async updateGeoDataList(
        id: string,
        geoDataList: TGeoData[],
    ): Promise<void> {
        await this.geoDataRepository.update(id, { geo_list: geoDataList });
    }
}
