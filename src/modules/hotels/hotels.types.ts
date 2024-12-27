import { TImageSize } from '../images/images.entity';

type TImage = {
    id: string;
    alt: string;
    path: string;
    size?: TImageSize;
};

export type THotelResData = {
    id: string;
    name: string;
    name_en: string;
    hotel_link_ostrovok: string;
    rating?: number;
    stars?: number;
    locations: { ru: string; en: string };
    images: TImage[];
};
