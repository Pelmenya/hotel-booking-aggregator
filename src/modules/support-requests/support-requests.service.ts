import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ID } from 'src/types/id';
import { Message } from './schemas/message';
import { SupportRequest } from './schemas/support-request';
import { ISupportRequestsService } from './types/i-support-requests-service';
import { SearchChatListParams } from './types/search-chat-list-params';
import { SendMessageDto } from './types/send-message.dto';
import { TMessageDocument } from './types/t-messages-document';
import { TSupportRequestDocument } from './types/t-support-request-document';

@Injectable()
export class SupportRequestsService implements ISupportRequestsService {
    constructor(
        @InjectModel(Message.name)
        private readonly MessageModel: Model<TMessageDocument>,
        @InjectModel(SupportRequest.name)
        private readonly SupportRequestModel: Model<TSupportRequestDocument>,
    ) {}

    findSupportRequests(
        params: SearchChatListParams,
    ): Promise<SupportRequest[]> {
        let m: any;
        return Promise.resolve(m);
    }

    sendMessage(data: SendMessageDto): Promise<Message> {
        let m: any;
        return Promise.resolve(m);
    }

    getMessages(supportRequest: ID): Promise<Message[]> {
        let m: any;
        return Promise.resolve(m);
    }

    subscribe(
        handler: (supportRequest: SupportRequest, message: Message) => void,
    ): () => void {
        const m = 6;
        return () => m;
    }
}
