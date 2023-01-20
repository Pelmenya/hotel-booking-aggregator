import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HotelsService } from './hotels.service';
import { Hotel, HotelsSchema } from './schemas/hotel.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Hotel.name, schema: HotelsSchema }]),
    ],
    providers: [HotelsService],
    exports: [HotelsService],
})
export class HotelsModule {}
