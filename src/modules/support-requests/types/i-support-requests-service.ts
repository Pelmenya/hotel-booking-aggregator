import { ID } from 'src/types/id';
import { Message } from '../schemas/message';
import { SupportRequest } from '../schemas/support-request';
import { SearchChatListParams } from './search-chat-list-params';
import { SendMessageDto } from './send-message.dto';

export interface ISupportRequestsService {
    findSupportRequests(
        params: SearchChatListParams,
    ): Promise<SupportRequest[]>;
    sendMessage(data: SendMessageDto): Promise<Message>;
    getMessages(supportRequest: ID): Promise<Message[]>;
    subscribe(
        handler: (supportRequest: SupportRequest, message: Message) => void,
    ): () => void;
}
