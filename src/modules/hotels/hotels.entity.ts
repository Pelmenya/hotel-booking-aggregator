import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    Index,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
    OneToMany,
} from 'typeorm';
import { Districts } from '../districts/districts.entity';
import { Images } from 'src/modules/images/images.entity';
import { Abouts } from '../abouts/abouts.entity';
import { Amenities } from '../amenities/amenities.entity';
import { GeoData } from '../geo/geo-data.entity';
import { Policies } from '../policies/policies.entity';
import { Locations } from '../locations/locations.entity';

@Entity()
@Index(['hotel_link_ostrovok', 'address'], { unique: true })
export class Hotels {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Index()
    @Column()
    name: string;

    @Index()
    @Column({ nullable: true })
    name_en: string;

    @Index()
    @Column()
    address: string;

    @Column({ nullable: true })
    address_page: string;

    @Column({ nullable: true })
    address_data?: string;

    @Column({ type: 'float', nullable: true })
    rating?: number;

    @Column({ nullable: true, unique: true })
    hotel_link_ostrovok?: string;

    @Column({ type: 'int', nullable: true })
    stars?: number;

    @Index() // Индекс для district_id
    @ManyToOne(() => Districts, (district) => district.hotels, {
        nullable: true,
    })
    @JoinColumn({ name: 'district_id' })
    district?: Districts;

    @OneToMany(() => Locations, (location) => location.hotel, {
        nullable: true,
    })
    locations?: Locations;

    @OneToMany(() => Abouts, (about) => about.hotel, { nullable: true })
    abouts?: Abouts;

    @OneToMany(() => Amenities, (amenity) => amenity.hotel, { nullable: true })
    amenities?: Amenities;

    @OneToMany(() => GeoData, (geo_data) => geo_data.hotel, { nullable: true })
    geo_data?: GeoData;

    @OneToMany(() => Policies, (policy) => policy.hotel, { nullable: true })
    policies?: Policies;

    @OneToMany(() => Images, (image) => image.hotel, { nullable: true })
    images?: Images[];

    @Column({ default: false })
    page_loaded: boolean;

    @Column({ default: false })
    page_processed: boolean;

    @Column({ default: false })
    images_processed: boolean;

    @Column({ default: false })
    abouts_processed: boolean;

    @Column({ default: false })
    amenities_processed: boolean;

    @Column({ default: false })
    geo_processed: boolean;

    @Column({ default: false })
    policies_processed: boolean;

    @Column({ default: false })
    address_processed: boolean;

    @Column({ nullable: true })
    locked_by?: string;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;

    @Column({ default: true })
    is_visible: boolean;
}
