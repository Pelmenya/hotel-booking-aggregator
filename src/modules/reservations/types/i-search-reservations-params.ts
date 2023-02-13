import { ID } from 'src/types/id';

export interface ISearchReservationsParams {
    userId: ID;
    startDate: Date;
    endDate: Date;
}
