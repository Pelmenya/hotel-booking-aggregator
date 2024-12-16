import { Document } from 'mongoose';
import { Hotel } from 'src/modules/hotels-mongo/schemas/hotel.schema';

export type THotelDocument = Hotel & Document;
