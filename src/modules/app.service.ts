import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
    getHello(): string {
        return 'API Hotel Booking Aggregator V1.0';
    }
}
