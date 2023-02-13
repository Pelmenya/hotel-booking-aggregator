import { ID } from 'src/types/id';
import { Reservation } from '../schemas/reservation.schema';
import { CreateReservationDto } from './create-reservation.dto';
import { ISearchReservationsParams } from './i-search-reservations-params';

export interface IReservationsService {
    addReservation(dto: CreateReservationDto): Promise<Reservation>;
    removeReservation(id: ID): Promise<Reservation>;
    getReservations(query: ISearchReservationsParams): Promise<Reservation[]>;
}
