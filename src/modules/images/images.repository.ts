import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Images } from './images.entity';

@Injectable()
export class ImagesRepository {
    constructor(
        @InjectRepository(Images)
        private imagesRepository: Repository<Images>,
    ) {}

    async findByHotelId(hotelId: string, take: number): Promise<Images[]> {
        return this.imagesRepository.find({
            select: { id: true, type: true, alt: true, path: true },
            where: { hotel: { id: hotelId } },
            take,
        });
    }

    async deleteById(id: string): Promise<void> {
        await this.imagesRepository.delete(id);
    }

    async update(image: Images): Promise<Images> {
        return this.imagesRepository.save(image);
    }
}
