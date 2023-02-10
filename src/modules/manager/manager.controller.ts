import { Controller } from '@nestjs/common';
import { Get, Query, UseGuards } from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { AdminService } from '../admin/admin.service';
import { SearchUserParams } from '../users/types/search-user-params';

@UseGuards(RolesGuard)
@Controller('manager')
export class ManagerController {
    constructor(private readonly adminService: AdminService) {}

    @Get('users')
    @Roles('manager')
    async getUsers(@Query() query: SearchUserParams) {
        return await this.adminService.getUsers(query);
    }
}
