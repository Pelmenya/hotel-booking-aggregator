import { Module } from '@nestjs/common';
import { TransportService } from './transport.service';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [ConfigModule],
    providers: [TransportService],
    exports: [TransportService],
})
export class TransportModule {}
