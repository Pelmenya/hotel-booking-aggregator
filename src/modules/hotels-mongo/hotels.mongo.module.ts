import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HotelsMongoService } from './hotels.mongo.service';
import { Hotel, HotelsMongoSchema } from './schemas/hotel.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Hotel.name, schema: HotelsMongoSchema },
        ]),
    ],
    providers: [HotelsMongoService],
    exports: [HotelsMongoService],
})
export class HotelsMongoModule {}
