// entities/real-estate-category.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { TLanguage } from 'src/types/t-language';
import { RealEstateSubcategory } from './real-estate-subcategory.entity';

@Entity()
export class RealEstateCategory {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    icon: string;

    @Column({ type: String, nullable: true })
    language: TLanguage;

    @OneToMany(
        () => RealEstateSubcategory,
        (subcategory) => subcategory.category,
    )
    subcategories: RealEstateSubcategory[];
}
