import {
    BadRequestException,
    NotFoundException,
    Injectable,
} from '@nestjs/common';
import { IUserSettingsService } from './types/i-user-settings-service';
import { ID } from 'src/types/id';
import { TUserSettings } from './types/t-user-settings';
import { InjectRepository } from '@nestjs/typeorm';
import { UserSettings } from './entities/user-settings.entity';
import { Repository } from 'typeorm';
import { UpdateUserSettingsDTO } from './types/update-user-settings.dto';
import { ERRORS_USER_SETTINGS } from './user-settings.constants';

@Injectable()
export class UserSettingsService implements IUserSettingsService {
    constructor(
        @InjectRepository(UserSettings)
        private userSettingsRepository: Repository<UserSettings>,
    ) {}

    async createUserSettings(
        userId: ID,
        dto: Partial<UpdateUserSettingsDTO>,
    ): Promise<TUserSettings> {
        await this.userSettingsRepository
            .createQueryBuilder()
            .insert()
            .into(UserSettings)
            .values({ userId: String(userId), ...dto })
            .orIgnore()
            .execute();
        return await this.findByUserId(userId);
    }

    async findByUserId(userId: ID): Promise<TUserSettings> {
        const userSettings = await this.userSettingsRepository.findOne({
            where: {
                userId: String(userId),
            },
        });
        if (userSettings) {
            return userSettings;
        }

        throw new NotFoundException(
            ERRORS_USER_SETTINGS.NOT_EXIST_USER_SETTINGS,
        );
    }

    async updateUserSettings(
        userId: ID,
        dto: Partial<UpdateUserSettingsDTO>,
    ): Promise<TUserSettings> {
        const userSettings = await this.findByUserId(userId);
        if (userSettings) {
            await this.userSettingsRepository
                .createQueryBuilder()
                .update(UserSettings)
                .set({
                    ...dto,
                })
                .where('id = :id', { id: userSettings.id })
                .execute();

            return await this.findByUserId(userId);
        }

        throw new BadRequestException(
            ERRORS_USER_SETTINGS.NOT_EXIST_USER_SETTINGS,
        );
    }
}
