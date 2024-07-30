import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { HotelsModule } from './hotels/hotels.module';
import { ReservationsModule } from './reservations/reservations.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getMongoConfig } from '../configs/mongo.config';
import { AuthModule } from './auth/auth.module';
import { ClientModule } from './client/client.module';
import { CommonModule } from './common/common.module';
import { AdminModule } from './admin/admin.module';
import { ManagerModule } from './manager/manager.module';
import { HotelRoomsModule } from './hotel-rooms/hotel-rooms.module';
import { SupportRequestsModule } from './support-requests/support-requests.module';
import { FilesModule } from './files/files.module';
import { MailModule } from './mail/mail.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { getMailConfig } from 'src/configs/mail.config';
import { ConfirmModule } from './confirm/confirm.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: getMongoConfig,
        }),
        MailerModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: getMailConfig,
        }),
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
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
