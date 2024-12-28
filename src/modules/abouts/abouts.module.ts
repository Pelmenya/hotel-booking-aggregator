import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Abouts } from './abouts.entity';
import { AboutsRepository } from './abouts.repository';
import { AboutsService } from './abouts.service';

@Module({
    imports: [TypeOrmModule.forFeature([Abouts])],
    providers: [AboutsService, AboutsRepository],
    exports: [AboutsService, AboutsRepository],
})
export class AboutsModule {}
