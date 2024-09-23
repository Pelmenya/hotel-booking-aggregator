import { Injectable } from '@nestjs/common';
import { IUserSettingsService } from './types/i-user-settings-service';
import { ID } from 'src/types/id';
import { TUserSettings } from './types/t-user-settings';
import { InjectRepository } from '@nestjs/typeorm';
import { UserSettings } from './entities/user-settings.entity';
import { Repository } from 'typeorm';
import { UpdateUserSettingsDTO } from './types/update-user-settings.dto';

@Injectable()
export class UserSettingsService implements IUserSettingsService {
    constructor(
        @InjectRepository(UserSettings)
        private userSettingsRepository: Repository<UserSettings>,
    ) {}

    async createUserSettings(userId: ID): Promise<TUserSettings> {
        await this.userSettingsRepository
            .createQueryBuilder()
            .insert()
            .into(UserSettings)
            .values({ userId: String(userId) })
            .execute();
        return await this.findByUserId(userId);
    }

    async findByUserId(userId: ID): Promise<TUserSettings> {
        const userSettings = await this.userSettingsRepository.findOne({
            where: {
                userId: String(userId),
            },
        });
        return userSettings;
    }

    async updateUserSettings(
        userId: ID,
        dto: Partial<UpdateUserSettingsDTO>,
    ): Promise<TUserSettings> {
        console.log(dto);
        const userSettingsUpdateResult = await this.userSettingsRepository
            .createQueryBuilder()
            .update(UserSettings)
            .set({
                ...dto,
            })
            .where('userId = :userId', { userId })
            .execute();
        console.log(userSettingsUpdateResult);

        return await this.findByUserId(userId);
    }
}
