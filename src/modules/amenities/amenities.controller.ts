import { Controller, Get } from '@nestjs/common';
import { AmenitiesService } from './amenities.service';
import { ApiOperation, ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { TAmenityViewResDto } from './amenities.dto';

@ApiTags('amenities')
@Controller('amenities')
export class AmenitiesController {
    constructor(private readonly amenitiesService: AmenitiesService) {}

    @Get()
    @ApiOperation({
        summary: 'Get all amenities group by categories',
    })
    @ApiOkResponse({
        description: 'List of amenities grouped by categories',
        type: [TAmenityViewResDto],
    })
    async getAmenities(): Promise<TAmenityViewResDto[]> {
        return await this.amenitiesService.getAmenitiesFromMaterializedView();
    }
}
