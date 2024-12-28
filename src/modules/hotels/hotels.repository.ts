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

    async searchHotelsIdx(query: SearchBaseParams): Promise<string[]> {
        const sql = `
            SELECT DISTINCT idx 
            FROM (
                (
                    SELECT h.id AS idx
                    FROM hotels h
                    WHERE (h.name ILIKE $1 OR h.name_en ILIKE $1 OR h.address ILIKE $1)
                    AND h.is_visible = true
                )
                UNION ALL
                (
                    SELECT l.hotel_id AS idx
                    FROM locations l
                    WHERE l.address ILIKE $1
                )
            ) AS subquery
            ORDER BY idx
            LIMIT $2 
            OFFSET $3;
        `;

        const params = [`%${query.q}%`, query.limit, query.offset];

        return this.entityManager.query(sql, params);
    }
}
