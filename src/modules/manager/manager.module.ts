import { Module } from '@nestjs/common';
import { AdminModule } from '../admin/admin.module';
import { ManagerController } from './manager.controller';

@Module({
    imports: [AdminModule],
    controllers: [ManagerController],
})
export class ManagerModule {}
