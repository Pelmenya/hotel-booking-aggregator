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

    async findForSearchOneById(id: string): Promise<Hotels> {
        return await this.hotelsRepository.findOne({
            select: {
                id: true,
                name: true,
                name_en: true,
                hotel_link_ostrovok: true,
                stars: true,
                rating: true,
            },
            where: { id },
        });
    }

    async updateHotelIsVisible(id: string, is_visible: boolean): Promise<void> {
        await this.hotelsRepository.update(id, { is_visible });
    }

    async searchHotelsIdx(query: SearchBaseParams): Promise<{ idx: string }[]> {
        const sql = `
            SELECT DISTINCT h.id AS idx
            FROM hotels h
            JOIN 
	            locations l ON l.hotel_id = h.id
            WHERE 
	        (
		        h.name ILIKE $1 
		        OR h.name_en ILIKE $1 
		        OR h.address ILIKE $1
                OR l.address ILIKE $1
		    ) 
	        AND h.is_visible = true
            ORDER BY idx
            LIMIT $2 
            OFFSET $3;
        `;

        const params = [`%${query.q}%`, query.limit, query.offset];

        return await this.entityManager.query(sql, params);
    }
}
