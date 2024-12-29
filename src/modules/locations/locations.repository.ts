import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Locations } from './locations.entity';

@Injectable()
export class LocationsRepository {
    constructor(
        @InjectRepository(Locations)
        private readonly locationsRepository: Repository<Locations>,
    ) {}

    async save(location: Locations): Promise<Locations> {
        return await this.locationsRepository.save(location);
    }

    async findForSearchByHotelId(hotelId: string) {
        return await this.locationsRepository.find({
            select: { id: true, language: true, address: true },
            where: { hotel: { id: hotelId } },
        });
    }
}
