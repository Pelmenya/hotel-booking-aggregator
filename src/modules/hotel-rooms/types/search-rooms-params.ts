import { ID } from 'src/types/id';
import { SearchHotelsParams } from '../../hotels/types/search-hotels-params';

export class SearchRoomsParams extends SearchHotelsParams {
    hotel?: ID;
    isEnabled?: boolean;
}
