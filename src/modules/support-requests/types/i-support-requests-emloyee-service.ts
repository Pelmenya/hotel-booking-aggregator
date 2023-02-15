import { ID } from 'src/types/id';
import { Message } from '../schemas/message';
import { MarkMessagesAsReadDto } from './mark-messages-as-read.dto';

export interface ISupportRequestsEmployeeService {
    markMessagesAsRead(params: MarkMessagesAsReadDto): void;
    getUnreadCount(supportRequest: ID): Promise<Message[]>;
    closeRequest(supportRequest: ID): Promise<void>;
}
