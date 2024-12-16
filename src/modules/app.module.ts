import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { HotelsMongoModule } from './hotels-mongo/hotels.mongo.module';
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
import { HotelsModule } from './hotels/hotels.module';
import { AboutsModule } from './abouts/abouts.module';
import { AmenitiesModule } from './amenities/amenities.module';
import { GeoModule } from './geo/geo.module';
import { LocationsModule } from './locations/locations.module';
import { ImagesModule } from './images/images.module';
import { DistrictsModule } from './districts/districts.module';
import { PoliciesModule } from './policies/policies.module';
import { TranslationModule } from './translation/translation.module';
import { TransportModule } from './transport/transport.module';
import { LoggerModule } from './logger/logger.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        MongoModule,
        PostgresModule,
        UsersModule,
        ClientModule,
        HotelsMongoModule,
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
        HotelsModule,
        AboutsModule,
        AmenitiesModule,
        GeoModule,
        LocationsModule,
        ImagesModule,
        DistrictsModule,
        PoliciesModule,
        TranslationModule,
        TransportModule,
        LoggerModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
