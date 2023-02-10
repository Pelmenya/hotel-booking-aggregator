import { Post, Body, Controller, UseGuards } from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { CreateUserDto } from '../users/types/create-user.dto';
import { AdminService } from './admin.service';
import { THotelDto } from './types/t-create-hotel-dto';

@UseGuards(RolesGuard)
@Controller('admin')
export class AdminController {
    constructor(private readonly adminService: AdminService) {}

    @Post('users')
    @Roles('admin')
    public creatUser(@Body() dto: CreateUserDto) {
        return this.adminService.createUser(dto);
    }

    @Post('hotels')
    @Roles('admin')
    public creatHotel(@Body() dto: THotelDto) {
        return this.adminService.createHotel(dto);
    }
}
