import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ID } from 'src/types/id';
import { Message } from './schemas/message';
import { SupportRequest } from './schemas/support-request';
import { ISupportRequest } from './types/i-request-support';
import { ISupportRequestsService } from './types/i-support-requests-service';
import { MarkMessagesAsReadDto } from './types/mark-messages-as-read.dto';
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

    async findSupportRequests(
        params: SearchChatListParams,
    ): Promise<ISupportRequest[]> {
        const { user, limit = 20, offset = 0, isActive, _id } = params;
        const searchParams: Partial<SearchChatListParams> = {};

        if (user) {
            searchParams.user = user;
        }

        if (String(isActive) === 'false') {
            searchParams.isActive = false;
        }

        if (_id) {
            searchParams._id = _id;
        }

        const requests = await this.SupportRequestModel.find(searchParams)
            .limit(limit)
            .skip(offset)
            .populate({
                path: 'messages',
            })
            .populate({
                path: 'user',
                select: {
                    _id: 0,
                    id: '$_id',
                    name: 1,
                    email: 1,
                    contactPhone: 1,
                },
            });

        return requests;
    }

    sendMessage(dto: SendMessageDto): Promise<Message> {
        let m: any;
        return Promise.resolve(m);
    }

    async getMessages(supportRequest: ID): Promise<any> {
        return await this.SupportRequestModel.findById(supportRequest)
            .select({ _id: 0, isActive: 0, user: 0, createAt: 0, __v: 0 })
            .populate({
                path: 'messages',
                populate: {
                    path: 'author',
                },
            })
            .exec();
    }

    markMessagesAsRead(dto: MarkMessagesAsReadDto): void {
        let m: any;
        Promise.resolve(m);
    }

    getUnreadCount(supportRequest: ID): Promise<Message[]> {
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
