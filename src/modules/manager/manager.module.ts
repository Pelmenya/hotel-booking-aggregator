import { Module } from '@nestjs/common';
import { AdminModule } from '../admin/admin.module';
import { ReservationsModule } from '../reservations/reservations.module';
import { SupportRequestsModule } from '../support-requests/support-requests.module';
import { ManagerController } from './manager.controller';

@Module({
    imports: [AdminModule, ReservationsModule, SupportRequestsModule],
    controllers: [ManagerController],
})
export class ManagerModule {}
