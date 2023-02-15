import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ID } from 'src/types/id';
import { Message } from './schemas/message';
import { SupportRequest } from './schemas/support-request';
import { CreateSupportRequestDto } from './types/create-support-request.dto';
import { ISupportRequestsClientService } from './types/i-support-requests-client-service';
import { MarkMessagesAsReadDto } from './types/mark-messages-as-read.dto';
import { TMessageDocument } from './types/t-messages-document';
import { TSupportRequestDocument } from './types/t-support-request-document';
import { ISupportRequestRes } from './types/i-support-request-res';

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
            messages,
            createAt,
            isActive,
        } = await this.SupportRequestModel.create({
            user,
            messages: [message],
        });

        const hasNewMessages = messages.some(
            (message: Message) => !!message?.readAt === false,
        );

        return {
            id,
            createAt,
            isActive,
            hasNewMessages,
        };
    }

    markMessagesAsRead(params: MarkMessagesAsReadDto): void {
        let m: any;
        Promise.resolve(m);
    }

    getUnreadCount(supportRequest: ID): Promise<Message[]> {
        let m: any;
        return Promise.resolve(m);
    }
}
