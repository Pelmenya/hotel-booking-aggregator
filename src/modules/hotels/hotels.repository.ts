import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Hotels } from './hotels.entity';
import { Repository } from 'typeorm';
import { SearchBaseParams } from 'src/types/search-base-params';

@Injectable()
export class HotelsRepository {
    constructor(
        @InjectRepository(Hotels)
        private readonly hotelsRepository: Repository<Hotels>,
    ) {}

    async findOneById(id: string): Promise<Hotels> {
        return await this.hotelsRepository.findOneBy({ id });
    }

    async updateHotelIsVisible(id: string, is_visible: boolean): Promise<void> {
        await this.hotelsRepository.update(id, { is_visible });
    }

    async searchHotels(query: SearchBaseParams): Promise<Hotels[]> {
        const q = this.hotelsRepository
            .createQueryBuilder('hotel')
            .leftJoinAndSelect('hotel.locations', 'location')
            .andWhere(
                '(hotel.name ILIKE :q OR hotel.name_en ILIKE :q OR hotel.address ILIKE :q OR location.address ILIKE :q) AND hotel.is_visible = true',
                {
                    q: `%${query.q}%`,
                },
            )
            .orderBy('hotel.rating', 'DESC');

        q.limit(query.limit * 2); // Английский и русский язык геолакаций, поэтому на 2
        q.offset(query.offset);

        return q.getMany();
    }
}
