import { Controller, Get } from '@nestjs/common';
import { RealEstateService } from './real-estate.service';

@Controller('real-estate')
export class RealEstateController {
    constructor(private readonly realEstateService: RealEstateService) {}

    @Get('categories')
    async getAllCategories() {
        return await this.realEstateService.getAllCategories();
    }
}
