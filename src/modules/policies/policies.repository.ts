import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Policies } from './policies.entity';

@Injectable()
export class PoliciesRepository {
    constructor(
        @InjectRepository(Policies)
        private policiesRepository: Repository<Policies>,
    ) {}

    // Метод для поиска всех по ID отеля
    async findByHotelId(hotelId: string): Promise<Policies[]> {
        return this.policiesRepository.find({
            where: { hotel: { id: hotelId } },
        });
    }
}
