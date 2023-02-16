import { ID } from 'src/types/id';
import { SearchBaseParams } from '../../../types/search-base-params';

export class SearchRoomsParams extends SearchBaseParams {
    hotel?: ID;
    isEnabled?: boolean;
}
