import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { AuthService } from '../auth/auth.service';
import { HotelRoomsModule } from '../hotel-rooms/hotel-rooms.module';
import { ReservationsModule } from '../reservations/reservations.module';
import { SupportRequestsModule } from '../support-requests/support-requests.module';
import { UsersModule } from '../users/users.module';
import { ClientController } from './client.controller';

@Module({
    imports: [
        AuthModule,
        UsersModule,
        ReservationsModule,
        HotelRoomsModule,
        SupportRequestsModule,
    ],
    controllers: [ClientController],
    providers: [AuthService],
})
export class ClientModule {}
