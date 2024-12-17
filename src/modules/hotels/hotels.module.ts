import { Module } from '@nestjs/common';
import { HotelsController } from './hotels.controller';
import { HotelsRepository } from './hotels.repository';
import { HotelsService } from './hotels.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hotels } from './hotels.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Hotels])],
    controllers: [HotelsController],
    providers: [HotelsRepository, HotelsService],
    exports: [HotelsRepository, HotelsService],
})
export class HotelsModule {}
