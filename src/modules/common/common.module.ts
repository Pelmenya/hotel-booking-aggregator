import { Module } from '@nestjs/common';
import { HotelRoomsModule } from '../hotel-rooms/hotel-rooms.module';
import { CommonController } from './common.controller';
import { CommonService } from './common.service';

@Module({
    imports: [HotelRoomsModule],
    controllers: [CommonController],
    providers: [CommonService],
    exports: [CommonService],
})
export class CommonModule {}
