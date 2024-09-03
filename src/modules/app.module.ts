import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { HotelsModule } from './hotels/hotels.module';
import { ReservationsModule } from './reservations/reservations.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ClientModule } from './client/client.module';
import { CommonModule } from './common/common.module';
import { AdminModule } from './admin/admin.module';
import { ManagerModule } from './manager/manager.module';
import { HotelRoomsModule } from './hotel-rooms/hotel-rooms.module';
import { SupportRequestsModule } from './support-requests/support-requests.module';
import { FilesModule } from './files/files.module';
import { MailModule } from './mail/mail.module';
import { ConfirmModule } from './confirm/confirm.module';
import { PostgresModule } from './postgres/postgres.module';
import { MongoModule } from './mongo/mongo.module';
import { SmsModule } from './sms/sms.module';
import { UserSettingsModule } from './user-settings/user-settings.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        MongoModule,
        PostgresModule,
        UsersModule,
        ClientModule,
        HotelsModule,
        HotelRoomsModule,
        AuthModule,
        ReservationsModule,
        CommonModule,
        AdminModule,
        ManagerModule,
        SupportRequestsModule,
        FilesModule,
        MailModule,
        ConfirmModule,
        SmsModule,
        UserSettingsModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
