import { Injectable } from '@nestjs/common';
import { HotelsRepository } from './hotels.repository';
import { Hotels } from './hotels.entity';
import { SearchBaseParams } from 'src/types/search-base-params';

@Injectable()
export class HotelsService {
    constructor(private readonly hotelsRepository: HotelsRepository) {}

    async searchHotels(query: SearchBaseParams): Promise<Hotels[]> {
        const hotels = await this.hotelsRepository.searchHotels(query);
        return await this.processHotelData(hotels);
    }

    async processHotelData(data: any[]): Promise<any> {
        const hotelsMap = new Map();

        data.forEach((row) => {
            const hotelId = row.hotel_id;
            if (!hotelsMap.has(hotelId)) {
                hotelsMap.set(hotelId, {
                    id: hotelId,
                    name: row.name,
                    rating: row.rating,
                    stars: row.stars,
                    location_pretty: row.location_pretty,
                    images: [],
                });
            }
            const hotel = hotelsMap.get(hotelId);
            if (row.image_id) {
                hotel.images.push({
                    id: row.image_id,
                    alt: row.alt,
                    path: row.path,
                    size: row.size,
                    type: row.type,
                });
            }
        });

        return Array.from(hotelsMap.values());
    }
}
