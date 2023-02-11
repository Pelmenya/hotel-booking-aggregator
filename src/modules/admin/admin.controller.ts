import {
    Get,
    Query,
    Post,
    Body,
    Controller,
    UseGuards,
    HttpCode,
} from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { CreateHotelDto } from '../hotels/types/create-hotel.dto';
import { SearchHotelsParams } from '../hotels/types/search-hotels-params';
import { CreateUserDto } from '../users/types/create-user.dto';
import { SearchUserParams } from '../users/types/search-user-params';
import { AdminService } from './admin.service';

@UseGuards(RolesGuard)
@Controller('admin')
export class AdminController {
    constructor(private readonly adminService: AdminService) {}

    @Post('users')
    @Roles('admin')
    async creatUser(@Body() dto: CreateUserDto) {
        return await this.adminService.createUser(dto);
    }

    @Get('users')
    @Roles('admin')
    async getUsers(@Query() query: SearchUserParams) {
        return await this.adminService.getUsers(query);
    }

    @Post('hotels')
    @Roles('admin')
    async creatHotel(@Body() dto: CreateHotelDto) {
        return await this.adminService.createHotel(dto);
    }

    @Get('hotels')
    @Roles('admin')
    async getHotels(@Query() query: SearchHotelsParams) {
        return await this.adminService.getHotels(query);
    }
}
