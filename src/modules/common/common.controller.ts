import { Controller, Get, Param, Query } from '@nestjs/common';
import { IdValidationPipe } from 'src/pipes/id-validation/id-validation.pipe';
import { ID } from 'src/types/id';
import { SearchRoomsParams } from '../hotel-rooms/types/search-rooms-params';
import { CommonService } from './common.service';

@Controller('common')
export class CommonController {
    constructor(private readonly commonService: CommonService) {}

    @Get('hotel-rooms')
    async getHotelRooms(@Query() query: SearchRoomsParams) {
        return await this.commonService.getHotelRooms(query);
    }

    @Get('hotel-rooms/:id')
    async getHotelRoom(@Param('id', IdValidationPipe) id: ID) {
        return await this.commonService.getHotelRoom(id);
    }
}
