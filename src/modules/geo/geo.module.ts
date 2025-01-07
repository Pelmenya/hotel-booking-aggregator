import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GeoData } from './geo-data.entity';
import { GeoDataRepository } from './geo-data.repository';

@Module({
    imports: [TypeOrmModule.forFeature([GeoData])],
    providers: [GeoDataRepository],
    exports: [GeoDataRepository],
})
export class GeoModule {}
