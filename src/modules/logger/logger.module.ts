import { Module, Global } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import * as fs from 'fs';

@Global()
@Module({
    imports: [
        WinstonModule.forRootAsync({
            useFactory: () => {
                const instanceId = process.env.INSTANCE_ID || 'default';
                const logsDir = 'logs';
                if (!fs.existsSync(logsDir)) {
                    fs.mkdirSync(logsDir);
                }

                return {
                    level: 'info',
                    format: winston.format.combine(
                        winston.format.colorize(),
                        winston.format.label({
                            label: `Instance: ${instanceId}`,
                        }),
                        winston.format.timestamp(),
                        winston.format.printf(
                            ({ timestamp, level, message, label }) => {
                                return `[${timestamp}] [${label}] ${level}: ${message}`;
                            },
                        ),
                    ),
                    transports: [
                        new winston.transports.File({
                            filename: `${logsDir}/error-${instanceId}.log`,
                            level: 'error',
                        }),
                        new winston.transports.Console(),
                    ],
                };
            },
        }),
    ],
    exports: [WinstonModule],
})
export class LoggerModule {}
