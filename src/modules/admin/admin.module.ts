import { Module } from '@nestjs/common';
import { FilesModule } from '../files/files.module';
import { HotelRoomsModule } from '../hotel-rooms/hotel-rooms.module';
import { HotelsMongoModule } from '../hotels-mongo/hotels.mongo.module';
import { UsersModule } from '../users/users.module';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

@Module({
    imports: [UsersModule, HotelsMongoModule, HotelRoomsModule, FilesModule],
    controllers: [AdminController],
    providers: [AdminService],
    exports: [AdminService],
})
export class AdminModule {}
