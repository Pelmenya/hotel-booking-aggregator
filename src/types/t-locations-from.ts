import { TDistanceMeasurement } from "./t-distance-measurement";
import { TTranslateText } from "./t-translate-text";

export type TLocationsFrom = {
    idx: number;
    distance_value: number;
    measurement: TDistanceMeasurement;
} & TTranslateText;