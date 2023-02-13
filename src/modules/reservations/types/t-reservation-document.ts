import { Document } from 'mongoose';
import { Reservation } from '../schemas/reservation.schema';

export type TReservationDocument = Reservation & Document;
