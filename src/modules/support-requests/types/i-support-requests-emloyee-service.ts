import { ID } from 'src/types/id';

export interface ISupportRequestsEmployeeService {
    closeRequest(supportRequest: ID): Promise<void>;
}
