import { ID } from 'src/types/id';
import { Message } from '../schemas/message';
import { SupportRequest } from '../schemas/support-request';
import { ISupportRequest } from './i-request-support';
import { MarkMessagesAsReadDto } from './mark-messages-as-read.dto';
import { SearchChatListParams } from './search-chat-list-params';
import { SendMessageDto } from './send-message.dto';

export interface ISupportRequestsService {
    findSupportRequests(
        params: SearchChatListParams,
    ): Promise<ISupportRequest[]>;
    sendMessage(dto: SendMessageDto): Promise<Message>;
    getMessages(supportRequest: ID): Promise<Message[]>;
    markMessagesAsRead(dto: MarkMessagesAsReadDto): void;
    getUnreadCount(supportRequest: ID): Promise<Message[]>;
    subscribe(
        handler: (supportRequest: SupportRequest, message: Message) => void,
    ): () => void;
}
