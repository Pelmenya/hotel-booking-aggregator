import { Injectable } from '@nestjs/common';
import { ID } from 'src/types/id';
import { Message } from './schemas/message';
import { ISupportRequestsEmployeeService } from './types/i-support-requests-emloyee-service';
import { MarkMessagesAsReadDto } from './types/mark-messages-as-read.dto';

@Injectable()
export class SupportRequestsEmployeeService
    implements ISupportRequestsEmployeeService
{
    markMessagesAsRead(params: MarkMessagesAsReadDto): void {
        const m = 6;
    }

    getUnreadCount(supportRequest: ID): Promise<Message[]> {
        let m: any;
        return Promise.resolve(m);
    }

    closeRequest(supportRequest: ID): Promise<void> {
        let m: any;
        return Promise.resolve(m);
    }
}
