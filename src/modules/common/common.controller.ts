import {
    Controller,
    ForbiddenException,
    Get,
    Param,
    Query,
    Req,
    UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { IdValidationPipe } from 'src/pipes/id-validation/id-validation.pipe';
import { ID } from 'src/types/id';
import { SearchRoomsParams } from '../hotel-rooms/types/search-rooms-params';
import { SupportRequestsService } from '../support-requests/support-requests.service';
import { IUser } from '../users/types/i-user';
import { CommonService } from './common.service';

@UseGuards(RolesGuard)
@Controller('common')
export class CommonController {
    constructor(
        private readonly commonService: CommonService,
        private readonly supportRequestsService: SupportRequestsService,
    ) {}

    @Get('hotel-rooms')
    async getHotelRooms(
        @Req() req: Express.Request & { user: IUser },
        @Query() query: SearchRoomsParams,
    ) {
        let queryParams = { ...query };
        if (!req.isAuthenticated() || req?.user?.role === 'client') {
            queryParams = { ...queryParams, isEnabled: true };
        }

        return await this.commonService.getHotelRooms(queryParams);
    }

    @Get('hotel-rooms/:id')
    async getHotelRoom(@Param('id', IdValidationPipe) id: ID) {
        return await this.commonService.getHotelRoom(id);
    }

    @Roles('client', 'manager')
    @Get('support-requests/:id/messages')
    async getMessages(
        @Req() req: Express.Request & { user: IUser },
        @Param('id') id: ID,
    ) {
        const { user } = req;
        if (user.role === 'client') {
            const hasSupportRequests =
                await this.supportRequestsService.findSupportRequests({
                    user: user._id,
                    _id: id,
                });
            if (!hasSupportRequests.length) {
                throw new ForbiddenException('Forbidden');
            }
        }
        return this.supportRequestsService.getMessages(id);
    }
}
