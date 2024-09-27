import { NotFoundException, Injectable } from '@nestjs/common';
import { IUserSettingsService } from './types/i-user-settings-service';
import { ID } from 'src/types/id';
import { TUserSettings } from './types/t-user-settings';
import { InjectRepository } from '@nestjs/typeorm';
import { UserSettings } from './entities/user-settings.entity';
import { Repository } from 'typeorm';
import { CreateUserSettingsDTO } from './types/create-user-settings.dto';
import { ERRORS_USER_SETTINGS } from './user-settings.constants';

@Injectable()
export class UserSettingsService implements IUserSettingsService {
    constructor(
        @InjectRepository(UserSettings)
        private userSettingsRepository: Repository<UserSettings>,
    ) {}

    async createUserSettings(
        userId: ID,
        dto: CreateUserSettingsDTO,
    ): Promise<TUserSettings> {
        console.log(dto);
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
            select: {
                id: true,
                language: true,
                theme: true,
                currency: true,
                phoneChanel: true,
                emailChanel: true,
                pushChanel: true,
            },
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
        dto: Partial<CreateUserSettingsDTO>,
    ): Promise<TUserSettings> {
        const userSettings = await this.findByUserId(userId);
        if (userSettings) {
            const result = await this.userSettingsRepository
                .createQueryBuilder()
                .update(UserSettings)
                .set({
                    ...dto,
                })
                .where('id = :id', { id: userSettings.id })
                .execute();
            console.log(result);
            return await this.findByUserId(userId);
        } else {
            await this.createUserSettings(userId, dto);
            return await this.findByUserId(userId);
        }
    }
}
