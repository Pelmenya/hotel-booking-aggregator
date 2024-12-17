import { Injectable } from '@nestjs/common';
import { HotelsRepository } from './hotels.repository';
import { Hotels } from './hotels.entity';
import { SearchBaseParams } from 'src/types/search-base-params';

@Injectable()
export class HotelsService {
    constructor(private readonly hotelsRepository: HotelsRepository) {}

    async searchHotels(query: SearchBaseParams): Promise<Hotels[]> {
        return await this.hotelsRepository.searchHotels(query);
    }
}
