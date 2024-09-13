import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserSettings {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    language: 'ru' | 'en';

    @Column()
    currency: '₽' | '$' | '€' | '¥';

    @Column()
    phoneChanel: boolean;

    @Column()
    emailChanel: boolean;

    @Column()
    pushChanel: boolean;
}
