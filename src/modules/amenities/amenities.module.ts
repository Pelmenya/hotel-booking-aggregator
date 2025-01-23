import { Module } from '@nestjs/common';
import { AmenitiesService } from './amenities.service';
import { AmenitiesRepository } from './amenities.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Amenities } from './amenities.entity';
import { AmenitiesController } from './amenities.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Amenities])],
    providers: [AmenitiesService, AmenitiesRepository],
    exports: [AmenitiesService, AmenitiesRepository],
    controllers: [AmenitiesController],
})
export class AmenitiesModule {}
