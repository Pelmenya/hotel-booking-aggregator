import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Abouts } from 'src/modules/abouts/abouts.entity';
import { Amenities } from 'src/modules/amenities/amenities.entity';
import { Districts } from 'src/modules/districts/districts.entity';
import { GeoData } from 'src/modules/geo/geo-data.entity';
import { Hotels } from 'src/modules/hotels/hotels.entity';
import { Images } from 'src/modules/images/images.entity';
import { Locations } from 'src/modules/locations/locations.entity';
import { Policies } from 'src/modules/policies/policies.entity';
import { UserSettings } from 'src/modules/user-settings/entities/user-settings.entity';

export const getPostgresConfig = async (
    configService: ConfigService,
): Promise<TypeOrmModuleOptions> => {
    return {
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: configService.get('POSTGRES_PORT'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DB'),
        entities: [
            UserSettings,
            Hotels,
            Districts,
            Images,
            Abouts,
            Amenities,
            GeoData,
            Policies,
            Locations,
        ],
        synchronize: true,
    };
};
