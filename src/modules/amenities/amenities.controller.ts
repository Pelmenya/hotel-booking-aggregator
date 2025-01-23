import { Controller, Get } from '@nestjs/common';
import { AmenitiesService } from './amenities.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { TAmenityViewRes } from './amenities.types';

@ApiTags('amenities')
@Controller('amenities')
export class AmenitiesController {
    constructor(private readonly amenitiesService: AmenitiesService) {}

    @Get()
    @ApiOperation({
        summary: 'Get all amenities group by categories',
    })
    async getAmenities(): Promise<TAmenityViewRes[]> {
        return await this.amenitiesService.getAmenitiesFromMaterializedView();
    }
}
