import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessagesSchema } from './schemas/message';
import {
    SupportRequest,
    SupportRequestSchema,
} from './schemas/support-request';
import { SupportRequestsService } from './support-requests.service';
import { SupportRequestsClientService } from './support-requests-client.service';
import { SupportRequestsEmployeeService } from './support-requests-employee.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Message.name,
                schema: MessagesSchema,
            },
            {
                name: SupportRequest.name,
                schema: SupportRequestSchema,
            },
        ]),
    ],
    providers: [
        SupportRequestsService,
        SupportRequestsClientService,
        SupportRequestsEmployeeService,
    ],
    exports: [
        SupportRequestsService,
        SupportRequestsClientService,
        SupportRequestsEmployeeService,
    ],
})
export class SupportRequestsModule {}
