import { ConfigService } from '@nestjs/config';
import { MongooseModuleOptions } from '@nestjs/mongoose';

export const getMongoConfig = async (
    configService: ConfigService,
): Promise<MongooseModuleOptions> => {
    return {
        uri: configService.get('MONGODB_AGGREGATOR_URL'),
        user: configService.get('MONGODB_ADMINUSERNAME'),
        pass: configService.get('MONGODB_ADMINPASSWORD'),
        dbName: configService.get('DB_NAME'),
    };
};
