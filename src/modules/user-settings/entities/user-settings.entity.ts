import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserSettings {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    phoneChanel: boolean;

    @Column()
    emailChanel: boolean;
}
