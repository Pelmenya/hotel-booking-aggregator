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
    async searchHotels(query: SearchBaseParams): Promise<Hotels[]> {
        const q = this.hotelsRepository
            .createQueryBuilder('hotel')
            .innerJoinAndSelect('hotel.locations', 'location')
            .andWhere(
                'hotel.name ILIKE :q OR hotel.name_en ILIKE :q OR hotel.address ILIKE :q OR location.address ILIKE :q',
                {
                    q: `%${query.q}%`,
                },
            )
            .orderBy('hotel.rating', 'DESC');

        q.limit(query.limit);
        q.offset(query.offset);

        return q.getMany();
    }
}
