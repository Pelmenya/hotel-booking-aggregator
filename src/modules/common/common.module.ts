import { Module } from '@nestjs/common';
import { HotelRoomsModule } from '../hotel-rooms/hotel-rooms.module';
import { HotelsMongoModule } from '../hotels-mongo/hotels.mongo.module';
import { SupportRequestsModule } from '../support-requests/support-requests.module';
import { CommonController } from './common.controller';
import { CommonService } from './common.service';
import { UsersModule } from '../users/users.module';
import { UserSettingsModule } from '../user-settings/user-settings.module';

@Module({
    imports: [
        HotelRoomsModule,
        HotelsMongoModule,
        UsersModule,
        UserSettingsModule,
        SupportRequestsModule,
    ],
    controllers: [CommonController],
    providers: [CommonService],
    exports: [CommonService],
})
export class CommonModule {}
