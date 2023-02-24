import { type } from 'node:os';
import { ID } from 'src/types/id';
import { CreateSupportRequestDto } from './create-support-request.dto';
import { ISupportRequestRes } from './i-support-request-res';
import { MarkMessagesAsReadDto } from './mark-messages-as-read.dto';
import { TUnreadCountRes } from './t-unread-count-res';

export interface ISupportRequestsClientService {
    createSupportRequest(
        dto: CreateSupportRequestDto,
    ): Promise<Partial<ISupportRequestRes>>;
    markMessagesAsRead(dto: MarkMessagesAsReadDto): Promise<TUnreadCountRes>;
    getUnreadCount(supportRequest: ID): Promise<number>;
}
