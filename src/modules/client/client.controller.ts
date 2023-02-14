import {
    Post,
    Body,
    Controller,
    UseGuards,
    Req,
    BadRequestException,
    Get,
    Query,
} from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { NotAuthenticatedGuard } from 'src/guards/not-authenticated.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { AuthService } from '../auth/auth.service';
import { RegisterDto } from '../auth/types/register.dto';
import { ERRORS_HOTEL_ROOMS } from '../hotel-rooms/hotel-rooms.constants';
import { HotelRoomsService } from '../hotel-rooms/hotel-rooms.service';
import { ReservationsService } from '../reservations/reservations.service';
import { CreateReservationDto } from '../reservations/types/create-reservation.dto';
import { SearchReservationsParams } from '../reservations/types/search-reservations-params';
import { IUser } from '../users/types/i-user';

@UseGuards(RolesGuard)
@Controller('client')
export class ClientController {
    constructor(
        private readonly authService: AuthService,
        private readonly reservationsService: ReservationsService,
        private readonly hotelRoomsService: HotelRoomsService,
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
}
