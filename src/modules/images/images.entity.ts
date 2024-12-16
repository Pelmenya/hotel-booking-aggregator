import { Hotels } from 'src/modules/hotels/hotels.entity';
import { TCategory } from 'src/types/t-category';
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

export type TImageSize = 'large' | 'medium' | 'main' | 'small' | 'thumbnail';
export type TImageWidth = 1024 | 828 | 640 | 220 | 240;
export type TImageHeight = 768 | 560 | 400 | 220 | 240;

@Entity()
@Index(['hotel', 'size', 'original_url'], { unique: true }) // Уникальный индекс
export class Images {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: true })
    name: string;

    @Column({ nullable: true })
    original_name: string;

    @Column({ nullable: true })
    original_url: string;

    @Column({ nullable: true })
    alt: string;

    @Column({ nullable: true })
    size: TImageSize;

    @Column({ nullable: true })
    width: TImageWidth;

    @Column({ nullable: true })
    height: TImageHeight;

    @Column({ type: String, nullable: true })
    type: TCategory;

    @Index()
    @ManyToOne(() => Hotels, (hotel) => hotel.images, { nullable: true })
    @JoinColumn({ name: 'hotel_id' })
    hotel?: Hotels;

    @Column({ nullable: true, unique: true })
    path: string;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;
}
