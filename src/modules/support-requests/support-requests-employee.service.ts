import { Injectable } from '@nestjs/common';
import { ID } from 'src/types/id';
import { ISupportRequestsEmployeeService } from './types/i-support-requests-emloyee-service';

@Injectable()
export class SupportRequestsEmployeeService
    implements ISupportRequestsEmployeeService
{
    closeRequest(supportRequest: ID): Promise<void> {
        let m: any;
        return Promise.resolve(m);
    }
}
