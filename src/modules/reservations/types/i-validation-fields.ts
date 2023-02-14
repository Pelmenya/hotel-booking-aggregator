import { ID } from 'src/types/id';

export interface IValidationFields {
    room: ID;
    startDate?: { $gte: Date };
    endDate?: { $lte: Date };
}
