import { HttpService } from '@nestjs/axios';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosError, AxiosResponse } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { TSuggestionAddressResData, TCoordinatesResData } from './proxy.types';

@Injectable()
export class ProxyService {
    private AHUNTER_HOST: string;
    private YA_HTTP_GEOCODER_API_HOST: string;
    private YA_HTTP_GEOCODER_API_KEY: string;

    constructor(
        private readonly configService: ConfigService,
        private readonly httpService: HttpService,
    ) {
        this.AHUNTER_HOST = this.configService.get('AHUNTER_HOST');
        this.YA_HTTP_GEOCODER_API_HOST = this.configService.get(
            'YA_HTTP_GEOCODER_API_HOST',
        );
        this.YA_HTTP_GEOCODER_API_KEY = this.configService.get(
            'YA_HTTP_GEOCODER_API_KEY',
        );
    }

    async getSuggestions(
        q: string,
        limit: number,
    ): Promise<TSuggestionAddressResData> {
        const response: AxiosResponse<TSuggestionAddressResData> =
            await firstValueFrom(
                this.httpService
                    .get(
                        `${
                            this.AHUNTER_HOST
                        }/suggest/address?addresslim=${limit};output=json|pretty;query=${encodeURIComponent(
                            q,
                        )}`,
                    )
                    .pipe(
                        catchError((e: AxiosError) => {
                            const message =
                                e.message || e || 'An error occurred';
                            throw new NotFoundException(message);
                        }),
                    ),
            );

        return response.data;
    }

    async getCoordinates(address: string): Promise<TCoordinatesResData> {
        const response = await firstValueFrom(
            this.httpService
                .get(this.YA_HTTP_GEOCODER_API_HOST, {
                    params: {
                        apikey: this.YA_HTTP_GEOCODER_API_KEY,
                        geocode: address,
                        format: 'json',
                    },
                })
                .pipe(
                    catchError((e: AxiosError) => {
                        const message = e.message || e || 'An error occurred';
                        throw new NotFoundException(message);
                    }),
                ),
        );

        const geoObjects =
            response.data.response.GeoObjectCollection?.featureMember;
        if (!geoObjects || geoObjects.length === 0) {
            throw new NotFoundException('No geocode data found');
        }

        const exactMatch = geoObjects[0];
        const coordinatesString = exactMatch.GeoObject.Point.pos;
        const [longitude, latitude] = coordinatesString.split(' ').map(Number);

        return { coordinates: { latitude, longitude } };
    }
}
