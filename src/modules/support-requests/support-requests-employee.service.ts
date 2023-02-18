import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ID } from 'src/types/id';
import { SupportRequest } from './schemas/support-request';
import { ISupportRequestsEmployeeService } from './types/i-support-requests-emloyee-service';
import { TSupportRequestDocument } from './types/t-support-request-document';

@Injectable()
export class SupportRequestsEmployeeService
    implements ISupportRequestsEmployeeService
{
    constructor(
        @InjectModel(SupportRequest.name)
        private readonly SupportRequestModel: Model<TSupportRequestDocument>,
    ) {}
    async closeRequest(supportRequest: ID): Promise<void> {
        return await this.SupportRequestModel.findById(supportRequest, {
            isActive: false,
        });
    }
}
