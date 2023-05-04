import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UsersSchema } from './schemas/users.schema';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { FilesModule } from '../files/files.module';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UsersSchema }]),
        FilesModule,
    ],
    providers: [UsersService],
    exports: [UsersService],
    controllers: [UsersController],
})
export class UsersModule {}
