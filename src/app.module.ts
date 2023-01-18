import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { HotelsModule } from './hotels/hotels.module';
import { ReservationsModule } from './reservations/reservations.module';
import { SupportChatModule } from './support-chat/support-chat.module';

@Module({
    imports: [UsersModule, HotelsModule, ReservationsModule, SupportChatModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
