import { ID } from 'src/types/id';
import { Message } from '../schemas/message';
import { CreateSupportRequestDto } from './create-support-request.dto';
import { MarkMessagesAsReadDto } from './mark-messages-as-read.dto';
import { ISupportRequestRes } from './i-support-request-res';

export interface ISupportRequestsClientService {
    createSupportRequest(
        dto: CreateSupportRequestDto,
    ): Promise<Partial<ISupportRequestRes>>;
    markMessagesAsRead(params: MarkMessagesAsReadDto): void;
    getUnreadCount(supportRequest: ID): Promise<Message[]>;
}
