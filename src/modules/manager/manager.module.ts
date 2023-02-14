import { Module } from '@nestjs/common';
import { AdminModule } from '../admin/admin.module';
import { ReservationsModule } from '../reservations/reservations.module';
import { ManagerController } from './manager.controller';

@Module({
    imports: [AdminModule, ReservationsModule],
    controllers: [ManagerController],
})
export class ManagerModule {}
