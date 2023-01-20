import { Module } from '@nestjs/common';
import { HotelsService } from './hotels.service';

@Module({
    providers: [HotelsService],
})
export class HotelsModule {}
