import { TCurrency } from './t-currency';
import { TLanguage } from './t-language';

export type TUserSettings = {
    id: number;
    userId: string;
    language: TLanguage;
    currency: TCurrency;
    phoneChanel: boolean;
    emailChanel: boolean;
    pushChanel: boolean;
};
