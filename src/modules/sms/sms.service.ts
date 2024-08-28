import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SmsService {
    constructor(private readonly configService: ConfigService) {}

    async validatePhone(contactPhone: string): Promise<boolean> {

        return true;
    }
}
