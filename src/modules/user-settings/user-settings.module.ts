import { Module } from '@nestjs/common';
import { UserSettingsService } from './user-settings.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSettings } from './entities/user-settings.entity';

@Module({
    imports: [TypeOrmModule.forFeature([UserSettings])],
    providers: [UserSettingsService],
    exports: [UserSettingsService],
})
export class UserSettingsModule {}
