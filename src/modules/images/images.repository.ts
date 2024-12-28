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

    async save(image: Images): Promise<Images> {
        // Проверяем, существует ли уже изображение с такими же hotel, size и original_url
        const existingImage = await this.imagesRepository.findOne({
            where: {
                hotel: { id: image.hotel.id },
                size: image.size,
                original_url: image.original_url,
            },
        });

        if (existingImage) {
            // Если изображение уже существует, возвращаем его или выбрасываем ошибку
            return existingImage;
        }

        // Сохраняем новое изображение
        return this.imagesRepository.save(image);
    }

    async findByHotelId(hotelId: string): Promise<Images[]> {
        return this.imagesRepository.find({
            where: { hotel: { id: hotelId } },
        });
    }

    async findOneByHotelIdAndOriginalName(
        hotelId: string,
        original_name: string,
    ): Promise<Images> {
        return this.imagesRepository.findOne({
            where: { hotel: { id: hotelId }, original_name },
        });
    }

    async deleteById(id: string): Promise<void> {
        await this.imagesRepository.delete(id);
    }

    async update(image: Images): Promise<Images> {
        return this.imagesRepository.save(image);
    }

    // Другие методы для работы с изображениями
}
