import { ID } from 'src/types/id';
import { TUserSettings } from './t-user-settings';

export interface IUserSettingsService {
    createUserSettings(userId: ID): Promise<TUserSettings>;
    findByUserId(userId: ID): Promise<TUserSettings>;
    updateUserSettings(
        userId: ID,
        dto: Partial<TUserSettings>,
    ): Promise<TUserSettings>;
}
