import { ID } from 'src/types/id';
import { TUserSettings } from './t-user-settings';

export interface IUserSettingsService {
    create(userId: ID): Promise<TUserSettings>;
    findByUserId(userId: ID): Promise<TUserSettings>;
    update(userId: ID, dto: Partial<TUserSettings>): Promise<TUserSettings>;
}
