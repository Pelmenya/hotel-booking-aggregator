import { Module } from '@nestjs/common';
import { SupportRequestsService } from './support-requests.service';

@Module({
    providers: [SupportRequestsService],
})
export class SupportRequestsModule {}
