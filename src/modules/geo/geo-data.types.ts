import { TDistanceMeasurement } from 'src/types/t-distance-measurement';

export type TGeoData = {
    idx: number;
    name: string;
    category: string;
    distance_from_hotel: number;
    measurement: TDistanceMeasurement;
    geo?: string;
};
