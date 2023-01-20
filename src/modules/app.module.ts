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

@Module({
    imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: getMongoConfig,
        }),
        UsersModule,
        ClientModule,
        AuthModule,
        HotelsModule,
        ReservationsModule,
        CommonModule,
        AdminModule,
        ManagerModule,
        HotelRoomsModule,
        SupportRequestsModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
