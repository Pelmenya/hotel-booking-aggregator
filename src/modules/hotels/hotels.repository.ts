import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Hotels } from './hotels.entity';
import { EntityManager, Repository } from 'typeorm';
import { SearchBaseParams } from 'src/types/search-base-params';

@Injectable()
export class HotelsRepository {
    constructor(
        @InjectRepository(Hotels)
        private readonly hotelsRepository: Repository<Hotels>,
        private readonly entityManager: EntityManager,
    ) {}

    async findOneById(id: string): Promise<Hotels> {
        return await this.hotelsRepository.findOneBy({ id });
    }

    async updateHotelIsVisible(id: string, is_visible: boolean): Promise<void> {
        await this.hotelsRepository.update(id, { is_visible });
    }

    async searchHotels(query: SearchBaseParams): Promise<any[]> {
        const sql = `
            SELECT 
                h.id, 
                h.name, 
                h.name_en,
                h.stars, 
                h.rating, 
                h.hotel_link_ostrovok,
                l.geocode_data::jsonb->>'pretty' AS location_pretty,
                l.language,
                i.id AS image_id, 
                i.alt, 
                i.path, 
                i.size, 
                i.type
            FROM hotels h
            LEFT JOIN locations l ON l.hotel_id = h.id
            LEFT JOIN images i ON i.hotel_id = h.id AND i.size = 'thumbnail'
            WHERE (h.name ILIKE $1 OR h.name_en ILIKE $1 OR h.address ILIKE $1 OR l.address ILIKE $1)
            AND h.is_visible = true
            ORDER BY h.rating DESC
            LIMIT $2 OFFSET $3
        `;

        const params = [`%${query.q}%`, query.limit || 1000, query.offset];

        return this.entityManager.query(sql, params);
    }
}
