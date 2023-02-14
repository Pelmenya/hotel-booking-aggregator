import { User } from 'src/modules/users/schemas/users.schema';
import { ID } from 'src/types/id';
import { Reservation } from '../schemas/reservation.schema';
import { CreateReservationDto } from './create-reservation.dto';
import { SearchReservationsParams } from './search-reservations-params';

export interface IReservationsService {
    addReservation(dto: CreateReservationDto): Promise<Reservation>;
    removeReservation(room: ID, user: ID): Promise<Reservation>;
    getReservations(query: SearchReservationsParams): Promise<Reservation[]>;
}
