import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ID } from 'src/types/id';
import { IUser } from '../users/types/i-user';
import { Message } from './schemas/message';
import { SupportRequest } from './schemas/support-request';
import { ERRORS_SUPPORT_REQUESTS } from './support-requests.constants';
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

    async sendMessage({
        supportRequest,
        ...dto
    }: SendMessageDto): Promise<Message> {
        const { messages } = await this.SupportRequestModel.findById(
            supportRequest,
        ).exec();
        const message = await this.MessageModel.create(dto);
        await this.SupportRequestModel.findByIdAndUpdate(supportRequest, {
            messages: [...messages, message],
        });
        return await this.MessageModel.findById(message._id)
            .select({
                _id: 0,
                id: '$_id',
                sentAt: 1,
                text: 1,
                readAt: 1,
            })
            .populate({
                path: 'author',
                select: {
                    _id: 0,
                    id: '$_id',
                    name: 1,
                },
            });
    }

    async getMessages(supportRequest: ID): Promise<any> {
        const requests = await this.SupportRequestModel.findById(supportRequest)
            .populate({
                path: 'messages',
                select: {
                    _id: 0,
                    id: '$_id',
                    sentAt: 1,
                    text: 1,
                    readAt: 1,
                },
                populate: {
                    path: 'author',
                    select: {
                        _id: 0,
                        id: '$_id',
                        name: 1,
                    },
                },
            })
            .exec();

        if (!requests) {
            throw new ForbiddenException(ERRORS_SUPPORT_REQUESTS.FORBIDEN);
        }

        return [...requests.messages];
    }

    markMessagesAsRead(dto: MarkMessagesAsReadDto): void {
        let m: any;
        Promise.resolve(m);
    }

    async getUnreadCount(supportRequest: ID): Promise<Message[]> {
        let m: any;
        return Promise.resolve(m);
    }

    async hasSupportRequest(user: IUser, supportRequest: ID) {
        if (user.role === 'client') {
            const hasSupportRequests = await this.findSupportRequests({
                user: user._id,
                _id: supportRequest,
            });
            if (!hasSupportRequests.length) {
                throw new ForbiddenException(ERRORS_SUPPORT_REQUESTS.FORBIDEN);
            }
        }
    }

    subscribe(
        handler: (supportRequest: SupportRequest, message: Message) => void,
    ): () => void {
        const m = 6;
        return () => m;
    }
}
