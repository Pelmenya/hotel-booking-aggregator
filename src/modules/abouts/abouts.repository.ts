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
        return this.aboutsRepository.save(about);
    }

    async findByHotelId(hotelId: string): Promise<Abouts[]> {
        return this.aboutsRepository.find({
            where: { hotel: { id: hotelId } },
        });
    }

    async findOneByHotelId(
        hotelId: string,
        language: TLanguage,
    ): Promise<Abouts> {
        return this.aboutsRepository.findOne({
            where: { hotel: { id: hotelId }, language },
        });
    }

    async deleteById(id: string): Promise<void> {
        await this.aboutsRepository.delete(id);
    }

    async update(about: Abouts): Promise<Abouts> {
        return this.aboutsRepository.save(about);
    }
}
