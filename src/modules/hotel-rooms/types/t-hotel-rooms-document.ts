import { Document } from 'mongoose';
import { HotelRoom } from '../schemas/hotel-room.schema';

export type THotelRoomDocument = HotelRoom & Document;
