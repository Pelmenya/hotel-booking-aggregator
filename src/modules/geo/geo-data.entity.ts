import { TCategory } from 'src/types/t-category';
import { TLanguage } from 'src/types/t-language';
import { 
    Entity, 
    Column, 
    PrimaryGeneratedColumn, 
    CreateDateColumn, 
    UpdateDateColumn,
    Index,
    ManyToOne,
    JoinColumn, 
  } from 'typeorm';
import { Hotels } from '../hotels/hotels.entity';
import { TGeoData } from './geo-data.types';
  
  @Entity()
  @Index(['hotel', 'language', 'title'], { unique: true })
  export class GeoData {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ nullable: true })
    title: string;

    @Column('jsonb')
    geo_list: TGeoData[] = []

    @Column({type: String, nullable: true })
    type: TCategory;

    @Column({type: String, nullable: true })
    language: TLanguage;

    @Index()
    @ManyToOne(() => Hotels, (hotel) => hotel.geo_data, { nullable: true })
    @JoinColumn({ name: 'hotel_id' }) // Явное имя столбца
    hotel?: Hotels;

    @CreateDateColumn({ type: 'timestamp' }) // Автоматическое заполнение даты создания
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' }) // Автоматическое обновление даты изменения
    updated_at: Date;

}
  