import { Module } from '@nestjs/common';
import { Policies } from './policies.entity';
import { PoliciesRepository } from './policies.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([Policies])],
    providers: [PoliciesRepository],
    exports: [PoliciesRepository],
})
export class PoliciesModule {}
