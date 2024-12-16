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
import { TCategory } from 'src/types/t-category';
import { TAmenity } from './amenities.types';

@Entity()
@Index(['hotel', 'language', 'title'], { unique: true })
export class Amenities {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: true })
    title: string;

    @Column('jsonb')
    amenities_list: TAmenity[] = [];

    @Column({ type: String, nullable: true })
    type: TCategory;

    @Column({ type: String, nullable: true })
    language: TLanguage;

    @Index()
    @ManyToOne(() => Hotels, (hotel) => hotel.amenities, { nullable: true })
    @JoinColumn({ name: 'hotel_id' }) // Явное имя столбца
    hotel?: Hotels;

    @CreateDateColumn({ type: 'timestamp' }) // Автоматическое заполнение даты создания
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' }) // Автоматическое обновление даты изменения
    updated_at: Date;
}
