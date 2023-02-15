import { ID } from 'src/types/id';
import { Message } from '../schemas/message';
import { SupportRequest } from '../schemas/support-request';
import { CreateSupportRequestDto } from './create-support-request.dto';
import { MarkMessagesAsReadDto } from './mark-messages-as-read.dto';

export interface ISupportRequestClientService {
    createSupportRequest(dto: CreateSupportRequestDto): Promise<SupportRequest>;
    markMessagesAsRead(params: MarkMessagesAsReadDto): void;
    getUnreadCount(supportRequest: ID): Promise<Message[]>;
}
