import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Images, TImageSize } from './images.entity';

@Injectable()
export class ImagesRepository {
    constructor(
        @InjectRepository(Images)
        private imagesRepository: Repository<Images>,
    ) {}

    async findForSearchByHotelId(hotelId: string): Promise<Images[]> {
        return await this.imagesRepository.find({
            select: { id: true, type: true, path: true },
            where: { hotel: { id: hotelId }, size: 'thumbnail' },
            order: { type: 'DESC' },
            take: 8,
        });
    }

    async finByHotelId(hotelId: string, size: TImageSize): Promise<Images[]> {
        return await this.imagesRepository.find({
            select: { id: true, type: true, path: true },
            where: { hotel: { id: hotelId }, size },
            order: { type: 'DESC' },
        });
    }
    async deleteById(id: string): Promise<void> {
        await this.imagesRepository.delete(id);
    }

    async update(image: Images): Promise<Images> {
        return await this.imagesRepository.save(image);
    }
}
