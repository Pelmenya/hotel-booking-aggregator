import { TLanguage } from 'src/types/t-language';

export type TRealEstateCategory = {
    id: number;
    name: string;
    icon: string;
    language: TLanguage;
};

export type TRealEstateCategories = {
    id: number;
    name: string;
    icon: string;
    language: TLanguage;
    subcategories: TRealEstateCategory[];
}[];

export type TRealEstateCategoriesRes = {
    ru: TRealEstateCategories;
    en: TRealEstateCategories;
};
