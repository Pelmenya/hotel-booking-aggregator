import { HttpService } from '@nestjs/axios';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';

@Injectable()
export class ProxyService {
    private host: string;
    constructor(
        private readonly configService: ConfigService,
        private readonly httpService: HttpService,
    ) {
        this.host = this.configService.get('AHUNTER_HOST');
    }

    async getSuggestions(q: string) {
        const { data } = await firstValueFrom(
            this.httpService
                .get(
                    `${
                        this.host
                    }/suggest/address?addresslim=5;output=json|pretty;query=${encodeURIComponent(
                        q,
                    )}`,
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

        return data;
    }
}
