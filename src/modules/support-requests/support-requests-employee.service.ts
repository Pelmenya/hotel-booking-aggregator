import {
    ForbiddenException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isBefore } from 'date-fns';
import { Model } from 'mongoose';
import { ID } from 'src/types/id';
import { User } from '../users/schemas/users.schema';
import { Message } from './schemas/message';
import { SupportRequest } from './schemas/support-request';
import { ERRORS_SUPPORT_REQUESTS } from './support-requests.constants';
import { ISupportRequestsEmployeeService } from './types/i-support-requests-emloyee-service';
import { MarkMessagesAsReadDto } from './types/mark-messages-as-read.dto';
import { TMessageDocument } from './types/t-messages-document';
import { TSupportRequestDocument } from './types/t-support-request-document';
import { TUnreadCountRes } from './types/t-unread-count-res';

@Injectable()
export class SupportRequestsEmployeeService
    implements ISupportRequestsEmployeeService
{
    constructor(
        @InjectModel(Message.name)
        private readonly MessageModel: Model<TMessageDocument>,
        @InjectModel(SupportRequest.name)
        private readonly SupportRequestModel: Model<TSupportRequestDocument>,
    ) {}

    async closeRequest(supportRequest: ID): Promise<void> {
        return await this.SupportRequestModel.findById(supportRequest, {
            isActive: false,
        });
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
            console.log(messages);
            const userMessages = messages
                .filter(
                    (message: Message) =>
                        String(createRequestUserId) ===
                            String(message.author) &&
                        isBefore(
                            new Date(message.sentAt),
                            new Date(dto.createdBefore),
                        ) &&
                        !!message?.readAt === false,
                )
                .map(
                    (filterMessage: Message & { _id: ID }) => filterMessage._id,
                );
            console.log(userMessages);
            await this.MessageModel.updateMany(
                { _id: { $in: userMessages } },
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
                        String(request.user) === String(message.author),
                )
                .reduce((acc, message) => {
                    return !!message.readAt === false ? acc + 1 : acc;
                }, 0);
            return unreadMessages;
        }

        throw new ForbiddenException(ERRORS_SUPPORT_REQUESTS.FORBIDEN);
    }
}
