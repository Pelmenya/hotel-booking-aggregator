import { Module } from '@nestjs/common';
import { TranslationService } from './translation.service';
import { TranslationController } from './translation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TranslationDictionary } from './translation-dictionary.entity';
import { TransportModule } from '../transport/transport.module';
import { TranslationRepository } from './translation.repository';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        TypeOrmModule.forFeature([TranslationDictionary]),
        ConfigModule,
        TransportModule,
    ],
    providers: [TranslationService, TranslationRepository],
    controllers: [TranslationController],
    exports: [TranslationService, TranslationRepository],
})
export class TranslationModule {}
