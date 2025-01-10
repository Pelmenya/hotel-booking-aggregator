import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Hotels } from './hotels.entity';
import { HotelsService } from './hotels.service';
import { SearchBaseParams } from 'src/types/search-base-params';
import { TSearchHotelsResData } from './hotels.types';

@ApiTags('hotels')
@Controller('hotels')
export class HotelsController {
    constructor(private readonly hotelsService: HotelsService) {}

    @Get('hotel/:id')
    @ApiOperation({ summary: 'Get hotel by ID' })
    @ApiParam({
        name: 'id',
        required: true,
        description: 'The ID of the hotel',
        type: String,
    })
    async getHotelById(@Param('id') id: string) {
        return await this.hotelsService.findHotelById(id);
    }

    @Get('search')
    @ApiOperation({ summary: 'Get hotels by params' })
    @ApiResponse({
        status: 200,
        description:
            'Return an array of hotels or an empty array if no hotels found',
        type: Hotels,
        isArray: true,
    })
    async searchHotels(
        @Query() query: SearchBaseParams,
    ): Promise<TSearchHotelsResData[]> {
        return await this.hotelsService.searchHotels(query);
    }
}
