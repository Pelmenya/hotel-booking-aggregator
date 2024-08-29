import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { TValidatePhone } from './types/t-validate-phone';
import { ERRORS_SMS } from './sms.constants';
import { TResponseSendSms } from './types/t-response-send-sms';
@Injectable()
export class SmsService {
    host: string;
    apiKey: string;
    sender: string;
    config: object;

    constructor(
        private readonly configService: ConfigService,
        private readonly httpService: HttpService,
    ) {
        this.host = this.configService.get('SMS_HOST');
        this.apiKey = this.configService.get('SMS_API_KEY');
        this.sender = this.configService.get('SMS_SENDER');
        this.config = {
            headers: {
                'X-Service-Key': this.apiKey,
                'Content-Type': 'application/json;charset=UTF-8',
            },
        };
    }

    async validatePhone(contactPhone: string): Promise<boolean> {
        const { data } = await firstValueFrom<TValidatePhone>(
            this.httpService
                .get(
                    `${this.host}/sms/messages/probe?phone=${contactPhone}`,
                    this.config,
                )
                .pipe(
                    catchError((e: AxiosError) => {
                        const { message } = e.response.data as {
                            message: string;
                        };
                        throw new NotFoundException(message || e.message);
                    }),
                ),
        );
        if (data.phone_is_valid) {
            if (data.phone_country === 'RU') {
                return true;
            } else throw new BadRequestException(ERRORS_SMS.IVALID_COUNTRY);
        } else {
            throw new BadRequestException(ERRORS_SMS.INVALID_PHONE);
        }
    }

    async sendUserConfirmationSms(
        phone: string,
        code: number,
    ): Promise<boolean> {
        const body = {
            sender: this.sender,
            receiver: phone,
            text: String(code),
        };

        const { data } = await firstValueFrom<TResponseSendSms>(
            this.httpService
                .post(`${this.host}/sms/messages`, body, this.config)
                .pipe(
                    catchError((e: AxiosError) => {
                        const { message } = e.response.data as {
                            message: string;
                        };
                        throw new NotFoundException(message || e.message);
                    }),
                ),
        );
        if (data.result.toUpperCase() === 'CREATED') {
            return true;
        } else {
            throw new BadRequestException(ERRORS_SMS.NOT_CREATED_SMS);
        }
    }
}
