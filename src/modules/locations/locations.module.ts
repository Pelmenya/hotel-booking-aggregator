import { Module } from '@nestjs/common';
import { LocationsRepository } from './locations.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Locations } from './locations.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Locations])],
    providers: [LocationsRepository],
    exports: [LocationsRepository],
})
export class LocationsModule {}
