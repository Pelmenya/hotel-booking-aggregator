import { Document } from 'mongoose';
import { Hotel } from 'src/modules/hotels/schemas/hotel.schema';

export type THotelDocument = Hotel & Document;
