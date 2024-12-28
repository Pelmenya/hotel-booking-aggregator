import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    Index,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Hotels } from '../hotels/hotels.entity';
import { TLanguage } from 'src/types/t-language';
import { TAddress } from 'src/types/t-address-response';

@Entity()
export class Locations {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Index()
    @Column()
    address: string;

    @Index()
    @ManyToOne(() => Hotels, (hotel) => hotel.locations, { nullable: true })
    @JoinColumn({ name: 'hotel_id' }) // Явное имя столбца
    hotel?: Hotels;

    @Column({ type: String, nullable: true })
    language: TLanguage;

    @Column({ type: 'jsonb' })
    geocode_data: TAddress;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;

    @Column({ default: false })
    is_translated_to_en: boolean;
}
