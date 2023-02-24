import {
    ForbiddenException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isBefore } from 'date-fns';
import { Model } from 'mongoose';
import { Message } from './schemas/message';
import { SupportRequest } from './schemas/support-request';
import { CreateSupportRequestDto } from './types/create-support-request.dto';
import { ISupportRequestsClientService } from './types/i-support-requests-client-service';
import { TMessageDocument } from './types/t-messages-document';
import { TSupportRequestDocument } from './types/t-support-request-document';
import { ISupportRequestRes } from './types/i-support-request-res';
import { MarkMessagesAsReadDto } from './types/mark-messages-as-read.dto';
import { ID } from 'src/types/id';
import { ERRORS_SUPPORT_REQUESTS } from './support-requests.constants';
import { TUnreadCountRes } from './types/t-unread-count-res';
import { User } from '../users/schemas/users.schema';

@Injectable()
export class SupportRequestsClientService
    implements ISupportRequestsClientService
{
    constructor(
        @InjectModel(Message.name)
        private readonly MessageModel: Model<TMessageDocument>,
        @InjectModel(SupportRequest.name)
        private readonly SupportRequestModel: Model<TSupportRequestDocument>,
    ) {}

    async createSupportRequest(
        dto: CreateSupportRequestDto,
    ): Promise<Partial<ISupportRequestRes>> {
        const { user, text } = dto;

        const message = await this.MessageModel.create({
            author: user,
            text,
        });

        const {
            _id: id,
            createAt,
            isActive,
        } = await this.SupportRequestModel.create({
            user,
            messages: [message],
        });

        const hasNewMessages = false;

        return {
            id,
            createAt,
            isActive,
            hasNewMessages,
        };
    }

    async markMessagesAsRead(
        dto: MarkMessagesAsReadDto,
    ): Promise<TUnreadCountRes> {
        const request = await this.SupportRequestModel.findById(
            dto.supportRequest,
        ).populate({
            path: 'messages',
            select: {
                _id: 1,
                author: 1,
                sentAt: 1,
                readAt: 1,
            },
        });

        if (request) {
            const { messages, user } = request;
            const { _id: createRequestUserId } = user as User & { _id: ID };
            const notUserMessages = messages
                .filter(
                    (message: Message) =>
                        String(createRequestUserId) !==
                            String(message.author) &&
                        isBefore(
                            new Date(message.sentAt),
                            new Date(dto.createdBefore),
                        ) &&
                        !!message.readAt === false,
                )
                .map(
                    (filterMessage: Message & { _id: ID }) => filterMessage._id,
                );
            await this.MessageModel.updateMany(
                { _id: { $in: notUserMessages } },
                {
                    readAt: new Date(),
                },
            );
            const unreadCount = await this.getUnreadCount(dto.supportRequest);
            return { succes: true, unreadCount };
        }

        throw new NotFoundException(ERRORS_SUPPORT_REQUESTS.NOT_FOUND);
    }

    async getUnreadCount(supportRequest: ID): Promise<number> {
        const request = await this.SupportRequestModel.findById(supportRequest)
            .populate({ path: 'messages' })
            .exec();
        if (request) {
            const unreadMessages = request?.messages
                .filter(
                    (message: Message) =>
                        String(request.user) !== String(message.author),
                )
                .reduce((acc, message) => {
                    return !!message.readAt === false ? acc + 1 : acc;
                }, 0);
            return unreadMessages;
        }

        throw new ForbiddenException(ERRORS_SUPPORT_REQUESTS.FORBIDEN);
    }
}
