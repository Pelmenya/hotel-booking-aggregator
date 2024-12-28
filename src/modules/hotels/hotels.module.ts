import { Module } from '@nestjs/common';
import { HotelsController } from './hotels.controller';
import { HotelsRepository } from './hotels.repository';
import { HotelsService } from './hotels.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hotels } from './hotels.entity';
import { GeoModule } from '../geo/geo.module';
import { AboutsModule } from '../abouts/abouts.module';
import { AmenitiesModule } from '../amenities/amenities.module';
import { LocationsModule } from '../locations/locations.module';
import { ImagesModule } from '../images/images.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Hotels]),
        GeoModule,
        AboutsModule,
        AmenitiesModule,
        LocationsModule,
        ImagesModule,
    ],
    controllers: [HotelsController],
    providers: [HotelsRepository, HotelsService],
    exports: [HotelsRepository, HotelsService],
})
export class HotelsModule {}
