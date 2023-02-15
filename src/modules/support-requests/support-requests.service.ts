import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from './schemas/message';
import { SupportRequest } from './schemas/support-request';
import { TMessageDocument } from './types/t-messages-document';
import { TSupportRequestDocument } from './types/t-support-request-document';

@Injectable()
export class SupportRequestsService {
    constructor(
        @InjectModel(Message.name)
        private readonly MessageModel: Model<TMessageDocument>,
        @InjectModel(SupportRequest.name)
        private readonly SupportRequestModel: Model<TSupportRequestDocument>,
    ) {}
}
