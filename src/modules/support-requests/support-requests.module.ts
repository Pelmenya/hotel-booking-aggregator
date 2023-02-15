import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessagesSchema } from './schemas/message';
import {
    SupportRequest,
    SupportRequestSchema,
} from './schemas/support-request';
import { SupportRequestsService } from './support-requests.service';
import { SupportRequestClientService } from './support-request-client.service';
import { SupportRequestEmployeeService } from './support-request-employee.service';

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
        SupportRequestClientService,
        SupportRequestEmployeeService,
    ],
    exports: [
        SupportRequestsService,
        SupportRequestClientService,
        SupportRequestEmployeeService,
    ],
})
export class SupportRequestsModule {}
