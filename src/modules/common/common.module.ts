import { Module } from '@nestjs/common';
import { HotelRoomsModule } from '../hotel-rooms/hotel-rooms.module';
import { HotelsModule } from '../hotels/hotels.module';
import { SupportRequestsModule } from '../support-requests/support-requests.module';
import { CommonController } from './common.controller';
import { CommonService } from './common.service';

@Module({
    imports: [HotelRoomsModule, HotelsModule, SupportRequestsModule],
    controllers: [CommonController],
    providers: [CommonService],
    exports: [CommonService],
})
export class CommonModule {}
