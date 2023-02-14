import { ID } from 'src/types/id';

export interface ISearchReservationsParam {
    startDate?: { $gte: Date };
    endDate?: { $lte: Date };
    user: ID;
}
