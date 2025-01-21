import { Abouts } from '../abouts/abouts.entity';
import { Amenities } from '../amenities/amenities.entity';
import { GeoData } from '../geo/geo-data.entity';
import { Images } from '../images/images.entity';
import { Locations } from '../locations/locations.entity';
import { Policies } from '../policies/policies.entity';
import { Hotels } from './hotels.entity';

export type TSearchHotelsResData = {
    hotel: Partial<Hotels>;
    locations: { ru: Partial<Locations>; en: Partial<Locations> };
    geoData: { ru: Partial<GeoData>; en: Partial<GeoData> };
    amenities: { ru: Partial<Amenities>; en: Partial<Amenities> };
    images: Partial<Images>[];
    abouts?: { ru: Partial<Abouts>; en: Partial<Abouts> };
    policies?: { ru: Partial<Policies>; en: Partial<Policies> };
};
