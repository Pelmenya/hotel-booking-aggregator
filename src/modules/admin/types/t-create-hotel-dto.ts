import { IHotel } from 'src/modules/hotels/types/i-hotel';

export type THotelDto = Omit<IHotel, '_id'>;
