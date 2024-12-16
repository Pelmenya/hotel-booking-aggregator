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
import { TLanguage } from 'src/types/t-language';
import { TSettlementConditions } from './policies.types';

@Entity()
@Index(['hotel', 'language', 'title'], { unique: true })
export class Policies {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: true })
    title: string;

    @Column('jsonb')
    policy: TSettlementConditions[] = [];

    @Column({ type: String, nullable: true })
    language: TLanguage;

    @Index()
    @ManyToOne(() => Hotels, (hotel) => hotel.policies, { nullable: true })
    @JoinColumn({ name: 'hotel_id' }) // Явное имя столбца
    hotel?: Hotels;

    @CreateDateColumn({ type: 'timestamp' }) // Автоматическое заполнение даты создания
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' }) // Автоматическое обновление даты изменения
    updated_at: Date;
}
