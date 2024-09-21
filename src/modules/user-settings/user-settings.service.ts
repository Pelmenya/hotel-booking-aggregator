import { Injectable } from '@nestjs/common';
import { IUserSettingsService } from './types/i-user-settings-service';
import { ID } from 'src/types/id';
import { TUserSettings } from './types/t-user-settings';
import { InjectRepository } from '@nestjs/typeorm';
import { UserSettings } from './entities/user-settings.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserSettingsService implements IUserSettingsService {
    constructor(
        @InjectRepository(UserSettings)
        private userSettingsRepository: Repository<UserSettings>,
    ) {}

    async create(userId: ID): Promise<TUserSettings> {
        const userSettings = this.userSettingsRepository.create({
            userId: String(userId),
        });
        return userSettings;
    }

    async findByUserId(userId: ID): Promise<TUserSettings> {
        const userSettings = await this.userSettingsRepository.findOne({
            where: {
                userId: String(userId),
            },
        });
        return userSettings;
    }

    async update(
        userId: ID,
        dto: Partial<TUserSettings>,
    ): Promise<TUserSettings> {
        console.log(dto);
        const userSettings = await this.findByUserId(userId);
        return userSettings;
    }
}
