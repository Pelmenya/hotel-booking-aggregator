import { Hotels } from 'src/modules/hotels/hotels.entity';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    Index,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { TDescription } from './abouts.types';
import { TLanguage } from 'src/types/t-language';

@Entity()
@Index(['hotel', 'language'], { unique: true })
export class Abouts {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: true })
    title: string;

    @Column('jsonb', { nullable: true }) // Используем jsonb и указываем, что это массив
    descriptions: TDescription[] = [];

    @Column({ type: String, nullable: true })
    language: TLanguage;

    @Index()
    @ManyToOne(() => Hotels, (hotel) => hotel.abouts, { nullable: true })
    @JoinColumn({ name: 'hotel_id' }) // Явное имя столбца
    hotel?: Hotels;

    @CreateDateColumn({ type: 'timestamp' }) // Автоматическое заполнение даты создания
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' }) // Автоматическое обновление даты изменения
    updated_at: Date;
}
