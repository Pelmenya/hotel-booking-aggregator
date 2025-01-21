import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/guards/roles.guard';
import { ProxyService } from './proxy.service';
import { TSuggestionAddressResData } from './proxy.types';
import { Roles } from 'src/decorators/roles.decorator';
import { SearchBaseParams } from 'src/types/search-base-params';

@UseGuards(RolesGuard)
@ApiTags('proxy')
@Controller('proxy')
export class ProxyController {
    constructor(private readonly proxyService: ProxyService) {}

    @Roles('admin', 'client', 'manager')
    @Get('suggest/address')
    async getSuggestions(
        @Query() query: SearchBaseParams,
    ): Promise<TSuggestionAddressResData> {
        return await this.proxyService.getSuggestions(query.q, query.limit);
    }
}
