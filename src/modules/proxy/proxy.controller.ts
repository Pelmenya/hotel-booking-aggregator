import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/guards/roles.guard';
import { ProxyService } from './proxy.service';
import { SearchUserParams } from '../users/types/search-user-params';

@UseGuards(RolesGuard)
@ApiTags('proxy')
@Controller('proxy')
export class ProxyController {
    constructor(private readonly proxyService: ProxyService) {}

    @Get('suggest/address')
    async getSuggestions(@Query() query: SearchUserParams) {
        return await this.proxyService.getSuggestions(query.q);
    }
}
