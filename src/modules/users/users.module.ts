import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UsersSchema } from './schemas/users.schema';
import { UsersService } from './users.service';
import { FilesModule } from '../files/files.module';
import { UserSettingsModule } from '../user-settings/user-settings.module';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UsersSchema }]),
        FilesModule,
        UserSettingsModule,
    ],
    providers: [UsersService],
    exports: [UsersService],
})
export class UsersModule {}
