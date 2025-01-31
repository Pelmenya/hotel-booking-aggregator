import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Abouts } from './abouts.entity';
import { TLanguage } from 'src/types/t-language';

@Injectable()
export class AboutsRepository {
    constructor(
        @InjectRepository(Abouts)
        private aboutsRepository: Repository<Abouts>,
    ) {}

    async save(about: Abouts): Promise<Abouts> {
        return await this.aboutsRepository.save(about);
    }

    async findByHotelId(hotelId: string): Promise<Abouts[]> {
        return await this.aboutsRepository.find({
            where: { hotel: { id: hotelId } },
        });
    }

    async findOneByHotelId(
        hotelId: string,
        language: TLanguage,
    ): Promise<Abouts> {
        return await this.aboutsRepository.findOne({
            where: { hotel: { id: hotelId }, language },
        });
    }

    // Метод для поиска всех abouts по ID отеля
    async findForSearchByHotelIdAndType(hotelId: string): Promise<Abouts[]> {
        return await this.aboutsRepository.find({
            select: {
                id: true,
                title: true,
                descriptions: true,
                language: true,
            },
            where: { hotel: { id: hotelId } },
        });
    }

    async deleteById(id: string): Promise<void> {
        await this.aboutsRepository.delete(id);
    }

    async update(about: Abouts): Promise<Abouts> {
        return await this.aboutsRepository.save(about);
    }
}
