import { HttpService } from '@nestjs/axios';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosError, AxiosResponse } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { TSuggestionAddressResData } from './proxy.types';

@Injectable()
export class ProxyService {
    private host: string;
    constructor(
        private readonly configService: ConfigService,
        private readonly httpService: HttpService,
    ) {
        this.host = this.configService.get('AHUNTER_HOST');
    }

    async getSuggestions(
        q: string,
        limit: number,
    ): Promise<TSuggestionAddressResData> {
        const response = await firstValueFrom<
            AxiosResponse<TSuggestionAddressResData>
        >(
            this.httpService
                .get(
                    `${
                        this.host
                    }/suggest/address?addresslim=${limit};output=json|pretty;query=${encodeURIComponent(
                        q,
                    )}`,
                )
                .pipe(
                    catchError((e: AxiosError) => {
                        const message = e.message || e || 'An error occurred';
                        throw new NotFoundException(message);
                    }),
                ),
        );

        return response.data;
    }
}
