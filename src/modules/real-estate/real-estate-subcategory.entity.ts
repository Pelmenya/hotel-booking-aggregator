// entities/real-estate-subcategory.entity.ts
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { RealEstateCategory } from './real-estate-category.entity';
import { TLanguage } from 'src/types/t-language';

@Entity()
export class RealEstateSubcategory {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    icon: string;

    @Column({ type: String, nullable: true })
    language: TLanguage;

    @ManyToOne(() => RealEstateCategory, (category) => category.subcategories)
    @JoinColumn({ name: 'category_id' }) // Явное имя столбца
    category: RealEstateCategory;
}
