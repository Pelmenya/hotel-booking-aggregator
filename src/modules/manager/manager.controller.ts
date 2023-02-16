import { Controller, Delete, Param, UseInterceptors } from '@nestjs/common';
import { Get, Query, UseGuards } from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { IdValidationPipe } from 'src/pipes/id-validation/id-validation.pipe';
import { ID } from 'src/types/id';
import { AdminService } from '../admin/admin.service';
import { ReservationsService } from '../reservations/reservations.service';
import { SearchReservationsParams } from '../reservations/types/search-reservations-params';
// eslint-disable-next-line prettier/prettier
import {
    SupportRequestsResponseInterceptor,
} from '../support-requests/interceptors/support-requests-response-interceptor';
import { SupportRequestsService } from '../support-requests/support-requests.service';
import { SearchChatListParams } from '../support-requests/types/search-chat-list-params';
import { SearchUserParams } from '../users/types/search-user-params';

@UseGuards(RolesGuard)
@Controller('manager')
export class ManagerController {
    constructor(
        private readonly adminService: AdminService,
        private readonly reservationsService: ReservationsService,
        private readonly supportRequestsService: SupportRequestsService,
    ) {}

    @Get('users')
    @Roles('manager')
    async getUsers(@Query() query: SearchUserParams) {
        return await this.adminService.getUsers(query);
    }

    @Get('reservations/:id')
    @Roles('manager')
    async getReservationsByUserId(
        @Param('id', IdValidationPipe) user: ID,
        @Query() query: SearchReservationsParams,
    ) {
        const searchParams = { ...query, user };
        return await this.reservationsService.getReservations(searchParams);
    }

    @Delete('reservations/:id')
    @Roles('manager')
    async removeReservation(@Param('id', IdValidationPipe) room: ID) {
        return await this.reservationsService.removeReservation(room);
    }

    @Get('support-requests')
    @Roles('manager')
    @UseInterceptors(SupportRequestsResponseInterceptor)
    async getSupportRequests(@Query() query: SearchChatListParams) {
        return this.supportRequestsService.findSupportRequests(query);
    }
}
