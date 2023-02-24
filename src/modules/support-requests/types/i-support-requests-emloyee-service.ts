import { ID } from 'src/types/id';
import { MarkMessagesAsReadDto } from './mark-messages-as-read.dto';

export interface ISupportRequestsEmployeeService {
    markMessagesAsRead(
        dto: MarkMessagesAsReadDto,
    ): Promise<{ succes: boolean; unreadCount: number }>;
    getUnreadCount(supportRequest: ID): Promise<number>;
    closeRequest(supportRequest: ID): Promise<void>;
}
