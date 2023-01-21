import { Post, Body, Controller } from '@nestjs/common';
import { TUserDto } from '../users/types/t-user-dto';
import { AdminService } from './admin.service';
import { THotelDto } from './types/t-create-hotel-dto';

@Controller('admin')
export class AdminController {
    constructor(private readonly adminService: AdminService) {}

    @Post('users')
    public creatUser(@Body() dto: TUserDto) {
        return this.adminService.createUser(dto);
    }

    @Post('hotels')
    public creatHotel(@Body() dto: THotelDto) {
        return this.adminService.createHotel(dto);
    }
}
