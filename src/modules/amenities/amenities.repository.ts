import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Amenities } from './amenities.entity';
import { TAmenity } from './amenities.types';
import { TLanguage } from 'src/types/t-language';
import { TCategory } from 'src/types/t-category';

@Injectable()
export class AmenitiesRepository {
    constructor(
        @InjectRepository(Amenities)
        private amenitiesRepository: Repository<Amenities>,
    ) {}

    // Метод для сохранения или обновления записи
    async save(amenity: Amenities): Promise<Amenities> {
        return await this.amenitiesRepository.save(amenity);
    }

    // Метод для поиска всех аменитиз по ID отеля
    async findByHotelId(hotelId: string): Promise<Amenities[]> {
        return await this.amenitiesRepository.find({
            where: { hotel: { id: hotelId } },
        });
    }

    // Метод для поиска всех аменитиз по ID отеля
    async findForSearchByHotelIdAndType(
        hotelId: string,
        type: TCategory,
    ): Promise<Amenities[]> {
        return await this.amenitiesRepository.find({
            select: { id: true, language: true, amenities_list: true },
            where: { hotel: { id: hotelId }, type },
        });
    }

    // Метод для удаления записи по ID
    async deleteById(id: string): Promise<void> {
        await this.amenitiesRepository.delete(id);
    }

    // Метод для обновления записи
    async update(amenity: Amenities): Promise<Amenities> {
        return await this.amenitiesRepository.save(amenity);
    }

    // Метод для поиска записи по уникальной комбинации полей: ID отеля, язык и заголовок
    async findByHotelLanguageAndTitle(
        hotelId: string,
        language: TLanguage,
        title: string,
    ): Promise<Amenities | undefined> {
        return await this.amenitiesRepository.findOne({
            where: {
                hotel: { id: hotelId },
                language: language,
                title: title,
            },
        });
    }

    // Метод для поиска всех аменитиз по отелю и типу
    async findByHotelAndType(
        hotelId: string,
        type: TCategory,
    ): Promise<Amenities[]> {
        return await this.amenitiesRepository.find({
            where: {
                hotel: { id: hotelId },
                type: type,
            },
        });
    }

    // Метод для обновления только списка аменитиз в существующей записи
    async updateAmenitiesList(
        id: string,
        amenitiesList: TAmenity[],
    ): Promise<void> {
        await this.amenitiesRepository.update(id, {
            amenities_list: amenitiesList,
        });
    }
}
