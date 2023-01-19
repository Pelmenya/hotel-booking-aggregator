import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { AuthService } from '../auth/auth.service';
import { UsersModule } from '../users/users.module';
import { ClientController } from './client.controller';

@Module({
    imports: [AuthModule, UsersModule],
    controllers: [ClientController],
    providers: [AuthService],
})
export class ClientModule {}
