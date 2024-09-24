import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { TCurrency } from '../types/t-currency';
import { TLanguage } from '../types/t-language';
import { TTheme } from '../types/t-theme';

@Entity()
export class UserSettings {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @Column({
        unique: true,
    })
    userId: string;

    @Column({
        type: 'varchar',
        length: 2,
        default: 'ru',
    })
    language: TLanguage;

    @Column({
        type: 'varchar',
        length: 10,
        default: 'light',
    })
    theme: TTheme;

    @Column({
        type: 'varchar',
        length: 1,
        default: '₽',
    })
    currency: TCurrency;

    @Column({
        default: true,
    })
    phoneChanel: boolean;

    @Column({
        default: true,
    })
    emailChanel: boolean;

    @Column({
        default: true,
    })
    pushChanel: boolean;
}
