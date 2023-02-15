import { Injectable } from '@nestjs/common';
import { ID } from 'src/types/id';
import { Message } from './schemas/message';
import { SupportRequest } from './schemas/support-request';
import { CreateSupportRequestDto } from './types/create-support-request.dto';
import { ISupportRequestClientService } from './types/i-support-requests-client-service';
import { MarkMessagesAsReadDto } from './types/mark-messages-as-read.dto';

@Injectable()
export class SupportRequestClientService
    implements ISupportRequestClientService
{
    createSupportRequest(
        dto: CreateSupportRequestDto,
    ): Promise<SupportRequest> {
        let m: any;
        return Promise.resolve(m);
    }

    markMessagesAsRead(params: MarkMessagesAsReadDto): void {
        let m: any;
        Promise.resolve(m);
    }

    getUnreadCount(supportRequest: ID): Promise<Message[]> {
        let m: any;
        return Promise.resolve(m);
    }
}
