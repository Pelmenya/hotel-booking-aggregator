import { ID } from 'src/types/id';

export interface ISearchRoomsParams {
    limit: number;
    offset: number;
    hotel: ID;
    isEnabled?: boolean;
}
