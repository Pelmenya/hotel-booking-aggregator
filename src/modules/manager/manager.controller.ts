import { Controller, Param } from '@nestjs/common';
import { Get, Query, UseGuards } from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { ID } from 'src/types/id';
import { AdminService } from '../admin/admin.service';
import { ReservationsService } from '../reservations/reservations.service';
import { SearchReservationsParams } from '../reservations/types/search-reservations-params';
import { SearchUserParams } from '../users/types/search-user-params';

@UseGuards(RolesGuard)
@Controller('manager')
export class ManagerController {
    constructor(
        private readonly adminService: AdminService,
        private readonly reservationsService: ReservationsService,
    ) {}

    @Get('users')
    @Roles('manager')
    async getUsers(@Query() query: SearchUserParams) {
        return await this.adminService.getUsers(query);
    }

    @Get('reservations/:id')
    @Roles('manager')
    async getReservationsByUserId(
        @Param('id') user: ID,
        @Query() query: SearchReservationsParams,
    ) {
        const searchParams = { ...query, user };
        return await this.reservationsService.getReservations(searchParams);
    }
}
