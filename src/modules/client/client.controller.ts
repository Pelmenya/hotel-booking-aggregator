import {
    Post,
    Body,
    Controller,
    UseGuards,
    Req,
    BadRequestException,
    Get,
    Query,
    Delete,
    Param,
    UseInterceptors,
} from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { NotAuthenticatedGuard } from 'src/guards/not-authenticated.guard';
import { RolesGuard } from 'src/guards/roles.guard';
// eslint-disable-next-line prettier/prettier
import {
    SupportRequestsResponseInterceptor,
} from 'src/modules/support-requests/interceptors/support-requests-response-interceptor';
import { IdValidationPipe } from 'src/pipes/id-validation/id-validation.pipe';
import { ID } from 'src/types/id';
import { AuthService } from '../auth/auth.service';
import { RegisterDto } from '../auth/types/register.dto';
import { ERRORS_HOTEL_ROOMS } from '../hotel-rooms/hotel-rooms.constants';
import { HotelRoomsService } from '../hotel-rooms/hotel-rooms.service';
import { ReservationsService } from '../reservations/reservations.service';
import { CreateReservationDto } from '../reservations/types/create-reservation.dto';
import { SearchReservationsParams } from '../reservations/types/search-reservations-params';
import { SupportRequestsClientService } from '../support-requests/support-requests-client.service';
import { SupportRequestsService } from '../support-requests/support-requests.service';
import { SearchChatListParams } from '../support-requests/types/search-chat-list-params';
import { IUser } from '../users/types/i-user';

@UseGuards(RolesGuard)
@Controller('client')
export class ClientController {
    constructor(
        private readonly authService: AuthService,
        private readonly reservationsService: ReservationsService,
        private readonly hotelRoomsService: HotelRoomsService,
        private readonly supportRequestsService: SupportRequestsService,
        private readonly supportRequestsClientService: SupportRequestsClientService,
    ) {}

    @UseGuards(NotAuthenticatedGuard)
    @Post('register')
    async register(@Body() dto: RegisterDto) {
        return await this.authService.register(dto);
    }

    @Post('reservations')
    @Roles('client')
    async addReservation(
        @Req() req: Express.Request & { user: IUser },
        @Body() dto: CreateReservationDto,
    ) {
        const room = await this.hotelRoomsService.findOne(dto.room);

        if (!room || !room.isEnabled) {
            throw new BadRequestException(ERRORS_HOTEL_ROOMS.NOT_EXIST);
        }

        return await this.reservationsService.addReservation({
            ...dto,
            user: String(req?.user._id),
            hotel: String(room.hotel),
        });
    }

    @Get('reservations')
    @Roles('client')
    async getReservations(
        @Req() req: Express.Request & { user: IUser },
        @Query() query: SearchReservationsParams,
    ) {
        const searchParams = { ...query, user: req.user?._id };
        return await this.reservationsService.getReservations(searchParams);
    }

    @Delete('reservations/:id')
    @Roles('client')
    async removeReservation(
        @Param('id', IdValidationPipe) room: ID,
        @Req() req: Express.Request & { user: IUser },
    ) {
        return await this.reservationsService.removeReservation(
            room,
            req?.user?._id,
        );
    }

    @Post('support-requests')
    @Roles('client')
    async getSupportRequest(
        @Req() req: Express.Request & { user: IUser },
        @Body('text') text: string,
    ) {
        return await this.supportRequestsClientService.createSupportRequest({
            user: req?.user?._id,
            text,
        });
    }

    @Get('support-requests')
    @Roles('client')
    @UseInterceptors(SupportRequestsResponseInterceptor)
    async createSupportRequest(
        @Req() req: Express.Request & { user: IUser },
        @Query() query: SearchChatListParams,
    ) {
        return await this.supportRequestsService.findSupportRequests({
            ...query,
            user: req?.user?._id,
        });
    }
}
