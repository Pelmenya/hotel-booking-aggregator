import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SocksProxyAgent } from 'socks-proxy-agent';
import axios, { AxiosInstance } from 'axios';
// S3Client и команды из AWS SDK v3
import { S3Client } from '@aws-sdk/client-s3';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

export type TTransportLoadContent = 'puppeteer' | 'axios';

@Injectable()
export class TransportService {
    private axiosInstance: AxiosInstance;
    private s3Client: S3Client; // Изменено на S3Client из AWS SDK v3
    private bucket: string;
    private proxyUrl: string;
    private proxyUsername: string;
    private proxyPassword: string;
    private proxyHost: string;
    private proxyPort: string;

    constructor(
        private readonly configService: ConfigService,
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    ) {
        this.proxyHost = this.configService.get('PROXY_HOST');
        this.proxyPort = this.configService.get('PROXY_PORT');
        this.proxyUsername = this.configService.get('PROXY_LOGIN');
        this.proxyPassword = this.configService.get('PROXY_PASSWORD');

        this.proxyUrl = `socks5://${this.proxyUsername}:${this.proxyPassword}@${this.proxyHost}:${this.proxyPort}`;

        const socksAgent = new SocksProxyAgent(this.proxyUrl);

        this.axiosInstance = axios.create({
            httpAgent: socksAgent,
            httpsAgent: socksAgent,
        });

        // Инициализация S3Client из AWS SDK v3
        this.s3Client = new S3Client({
            region: 'ru-1',
            credentials: {
                accessKeyId: this.configService.get('S3_ACCESS_KEY_ID'),
                secretAccessKey: this.configService.get('S3_SECRET_ACCESS_KEY'),
            },
            endpoint: this.configService.get('S3_ENDPOINT'),
            forcePathStyle: true,
        });

        this.bucket = this.configService.get('S3_BUCKET');

        //this.checkAxiosIP();
        // this.checkPuppeteerIP();
    }

    getAxiosInstance(
        responseType: 'json' | 'stream' = 'json',
        proxy = true,
    ): AxiosInstance {
        return proxy
            ? axios.create({
                  httpAgent: this.axiosInstance.defaults.httpAgent,
                  httpsAgent: this.axiosInstance.defaults.httpsAgent,
                  responseType: responseType,
              })
            : axios.create();
    }

    getS3Client(): S3Client {
        return this.s3Client;
    }

    getBucket(): string {
        return this.bucket;
    }

    async checkAxiosIP() {
        try {
            const response = await this.axiosInstance.get(
                'https://api.ipify.org',
            );
            this.logger.info(`Your IP through proxy is: ${response.data}`);
        } catch (error) {
            this.logger.error('Error checking IP:', error);
        }
    }
}
