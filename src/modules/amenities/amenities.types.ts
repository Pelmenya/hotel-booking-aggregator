export type TAmenity = {
    idx: number;
    name: string;
    paid?: boolean;
};

export type TAmenityView = {
    title: string;
    title_en: string;
    unique_names_ru: string[];
    unique_names_en: string[];
};

export type TAmenityViewRes = {
    ru: {
        title: string;
        amenities: string[];
    };
    en: {
        title: string;
        amenities: string[];
    };
};

export class AmenityViewResDto {
    ru: {
        title: string;
        amenities: string[];
    };
    en: {
        title: string;
        amenities: string[];
    };
}
