import { Post, Body, Controller } from '@nestjs/common';
import { IHotel } from '../hotels/types/i-hotel';
import { TUserDto } from '../users/types/t-user-dto';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
    constructor(private readonly adminService: AdminService) {}

    @Post('users')
    public creatUser(@Body() dto: TUserDto) {
        return this.adminService.createUser(dto);
    }

    @Post('hotels')
    public creatHotel(@Body() dto: Partial<IHotel>) {
        return this.adminService.createHotel(dto);
    }
}
