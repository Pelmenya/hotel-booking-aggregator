import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { User, UsersSchema } from './schemas/users.schema';
import { UsersService } from './users.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UsersSchema }]),
    ],
    providers: [UsersService],
    exports: [UsersService],
})
export class UsersModule {}
