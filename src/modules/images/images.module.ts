import { Module } from '@nestjs/common';
import { ImagesRepository } from './images.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Images } from './images.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Images])],
    providers: [ImagesRepository],
    exports: [ImagesRepository],
})
export class ImagesModule {}
