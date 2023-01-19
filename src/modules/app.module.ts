import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { HotelsModule } from './hotels/hotels.module';
import { ReservationsModule } from './reservations/reservations.module';
import { SupportChatModule } from './support-chat/support-chat.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getMongoConfig } from '../configs/get-mongo-config';
import { AuthModule } from './auth/auth.module';
import { ClientModule } from './client/client.module';

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
        SupportChatModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
