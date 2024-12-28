import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Hotels } from './hotels.entity';
import { HotelsService } from './hotels.service';
import { SearchBaseParams } from 'src/types/search-base-params';
import { THotelResData } from './hotels.types';

@ApiTags('hotels')
@Controller('hotels')
export class HotelsController {
    constructor(private readonly hotelsService: HotelsService) {}

    @Get('search')
    @ApiOperation({ summary: 'Get hotels by params' })
    @ApiResponse({
        status: 200,
        description:
            'Return an array of hotels or an empty array if no hotels found',
        type: Hotels,
        isArray: true,
    })
    async searchHotels(@Query() query: SearchBaseParams): Promise<string[]> {
        return await this.hotelsService.searchHotels(query);
    }
}
