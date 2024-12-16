import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    OneToMany,
    Index,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Hotels } from '../hotels/hotels.entity';

@Entity()
@Index(['name', 'district_link_ostrovok'], { unique: true })
export class Districts {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    @Index() // Индекс для ускорения поиска по имени
    name: string;

    @Column({ nullable: true })
    @Index() // Индекс для ускорения поиска по региону
    region: string;

    @Column({ nullable: true })
    description?: string;

    @Column({
        type: 'geography',
        spatialFeatureType: 'Polygon',
        srid: 4326,
        nullable: true,
    })
    location?: any; // Используем 'any', так как TypeORM напрямую не поддерживает GeoJSON

    @Column({ nullable: true })
    district_link_ostrovok: string;

    @ManyToOne(() => Districts, (district) => district.children, {
        nullable: true,
    })
    parent?: Districts | null; // Поле может быть null, если у района нет родителя

    @OneToMany(() => Districts, (district) => district.parent, {
        nullable: true,
    })
    children?: Districts[]; // Поле может быть пустым, если у района нет детей

    @OneToMany(() => Hotels, (hotel) => hotel.district, { nullable: true })
    hotels?: Hotels[]; // Новое поле для связи с отелями

    @Column({ nullable: true })
    count_pages: number;

    @Column({ nullable: true })
    count_hotels: number;

    @Column('simple-array', { nullable: true })
    image_urls?: string[];

    // Поле для отслеживания обработанных страниц при загрузке
    @Column('simple-array', { default: '' })
    processed_pages: number[] = [];

    // Поле для отслеживания страниц, из которых успешно извлечены данные об отелях
    @Column('simple-array', { default: '' })
    processed_hotels_from_pages: number[] = [];

    // Поле для указания, что все страницы обработаны
    @Column({ default: false })
    all_pages_loaded: boolean;

    @CreateDateColumn({ type: 'timestamp' }) // Автоматическое заполнение даты создания
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' }) // Автоматическое обновление даты изменения
    updated_at: Date;
}
